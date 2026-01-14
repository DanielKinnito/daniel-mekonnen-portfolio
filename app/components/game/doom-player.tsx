"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

declare global {
    interface Window {
        Dos: any;
        emulators: any;
    }
}

interface DoomPlayerProps {
    onClose?: () => void;
}

export default function DoomPlayer({ onClose }: DoomPlayerProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<'confirm' | 'loading' | 'ready' | 'error'>('confirm');
    const [dosInstance, setDosInstance] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for responsive game sizing
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load js-dos from CDN
    const loadScript = useCallback((src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (src.includes('js-dos') && window.Dos) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.body.appendChild(script);
        });
    }, []);

    const startDoom = useCallback(async () => {
        setStatus('loading');
        setErrorMessage('');

        try {
            // Configure emulators path to use local files
            if (window.emulators) {
                window.emulators.pathPrefix = '/js-dos/';
            }

            // Load js-dos from local file
            await loadScript('/js-dos/js-dos.js');
            
            if (!window.Dos) {
                throw new Error('Failed to initialize js-dos library');
            }

            if (!rootRef.current) {
                console.error("RootRef missing", { Ref: !!rootRef.current });
                setStatus('error');
                setErrorMessage('Unable to mount game container');
                return;
            }
            
            const instance = window.Dos(rootRef.current, {
                style: "hidden", // Hide default UI
            });
            
            instance.ready((fs: any, main: any) => {
                const gameUrl = '/games/doom_dos.ZIP';
                
                // Check if game file exists
                fetch(gameUrl, { method: 'HEAD' }).then(res => {
                    if (!res.ok) throw new Error("DOOM.ZIP file not found in /games/");
                    
                    fs.extract(gameUrl).then(() => {
                        main(["-c", "DOOM.EXE"]).then((ci: any) => {
                            setDosInstance(ci);
                            setStatus('ready');
                        }).catch((e: Error) => {
                            console.error("Doom launch failed", e);
                            setStatus('error');
                            setErrorMessage('Failed to launch DOOM executable');
                        });
                    }).catch((e: Error) => {
                        console.error("Doom zip extraction failed", e);
                        setStatus('error');
                        setErrorMessage('Failed to extract game files');
                    });
                }).catch(e => {
                    console.error("Game file check failed", e);
                    setStatus('error');
                    setErrorMessage('Game file not found or inaccessible');
                });
            });
        } catch (e: any) {
            console.error("DOOM Initialization Failed:", e.message);
            setStatus('error');
            setErrorMessage(e.message || 'Unknown error during initialization');
        }
    }, [loadScript]);

    // Keyboard controls for Doom on desktop
    useEffect(() => {
        if (status !== 'ready') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default for game keys
            const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Control', 'Enter', 'Escape'];
            if (gameKeys.includes(e.key) || e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status]);

    useEffect(() => {
        return () => {
            if (dosInstance) {
                dosInstance.exit();
            }
        };
    }, [dosInstance]);

    // Confirmation Screen
    if (status === 'confirm') {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full bg-black p-4 md:p-8 text-center font-mono">
                <div className="border border-neon-green/30 p-4 md:p-6 max-w-md bg-black/50">
                    <h2 className="text-neon-green text-lg mb-4 uppercase tracking-wider">{"// DOOM PROTOCOL //"}</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Load the original DOOM (1993) shareware version in your browser using a DOS emulator.
                    </p>
                    <div className="border border-yellow-600/30 bg-yellow-900/10 p-3 mb-4 text-xs text-yellow-500">
                        <strong>Note:</strong> Ready to initialize DOS emulator. Game files are served locally.
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button 
                            onClick={startDoom}
                            className="border border-neon-green text-neon-green px-6 py-2 hover:bg-neon-green/10 text-sm uppercase"
                        >
                            INITIALIZE
                        </button>
                        <button 
                            onClick={onClose}
                            className="border border-gray-600 text-gray-500 px-6 py-2 hover:bg-gray-800 text-sm uppercase"
                        >
                            ABORT
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading Screen
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full bg-black font-mono">
                <div className="text-neon-green animate-pulse text-center px-4">
                    <p className="text-lg mb-2">LOADING DOOM...</p>
                    <p className="text-xs text-gray-500">Initializing DOSBox emulator</p>
                    <p className="text-[10px] text-gray-600 mt-1">Loading from local resources...</p>
                    <div className="mt-4 w-48 h-1 bg-gray-800 overflow-hidden">
                        <div className="h-full bg-neon-green animate-[loading_1.5s_ease-in-out_infinite] w-1/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error Screen
    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full bg-black font-mono text-center p-4 md:p-8">
                <div className="text-red-400 mb-4 max-w-md">
                    <p className="text-lg">ERROR: DOOM INITIALIZATION FAILED</p>
                    <p className="text-xs text-gray-500 mt-2">{errorMessage}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500/10 text-sm"
                >
                    EXIT
                </button>
            </div>
        );
    }

    // Game Screen - Responsive sizing for mobile
    const gameWidth = isMobile ? '100%' : '640px';
    const gameHeight = isMobile ? 'auto' : '400px';
    const aspectRatio = isMobile ? '16/10' : undefined;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-black p-2 md:p-4">
            <div className="relative border-2 border-neon-green/30 rounded overflow-hidden" 
                 style={{ maxWidth: '100%', aspectRatio: aspectRatio }}>
                <div ref={rootRef} className="w-full h-full bg-black" style={{ aspectRatio: '16/10' }}>
                    {/* DOS Box mounts here */}
                </div>
                {/* CRT Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_3px] z-20"></div>
            </div>
            
            {/* Mobile-friendly control hints */}
            <div className="mt-3 md:mt-4 text-center font-mono w-full max-w-lg">
                <p className="text-gray-500 text-xs">DOOM (Shareware) // id Software 1993</p>
                <p className="text-gray-600 text-[10px] md:text-xs mt-1">
                    Desktop: Arrow Keys: Move | Ctrl: Fire | Space: Open | ESC: Menu
                </p>
                <p className="text-gray-600 text-[10px] md:text-xs mt-0.5">
                    Mobile: Use on-screen controls below
                </p>
                
                {/* Mobile game controls */}
                {isMobile && (
                    <div className="mt-3 flex justify-center gap-2 flex-wrap">
                        <div className="flex gap-1">
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-sm"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => {
                                        // These would need to be connected to the DOS instance
                                        console.log('Up pressed');
                                    }}>
                                ↑
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-sm"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => console.log('Left pressed')}>
                                ←
                            </button>
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-sm"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => console.log('Down pressed')}>
                                ↓
                            </button>
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-sm"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => console.log('Right pressed')}>
                                →
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-xs"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => console.log('Fire pressed')}>
                                Fire
                            </button>
                            <button className="w-10 h-10 border border-neon-green/50 rounded bg-black/50 text-neon-green text-xs"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onClick={() => console.log('Open pressed')}>
                                Use
                            </button>
                        </div>
                    </div>
                )}
                
                <button 
                    onClick={onClose} 
                    className="mt-3 md:mt-4 border border-red-800 text-red-500 px-4 py-1 hover:bg-red-900/20 text-xs uppercase"
                >
                    FORCE QUIT
                </button>
            </div>
        </div>
    );
}
