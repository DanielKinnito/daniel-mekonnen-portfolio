"use client";

import React, { useEffect, useRef, useState } from 'react';

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

    const startDoom = async () => {
        setStatus('loading');
        
        try {
            // Check for required assets first
            const assets = ['/js-dos/js-dos.js', '/js-dos/wdosbox.js', '/js-dos/wdosbox.wasm'];
            for (const asset of assets) {
                const response = await fetch(asset, { method: 'HEAD' });
                if (!response.ok) throw new Error(`Missing dependency: ${asset}`);
            }

            // Load js-dos script from local public folder
            if (!window.Dos) {
                await loadScript('/js-dos/js-dos.js');
            }
            
            // Configure js-dos to use local wdosbox
            if (window.emulators) {
                window.emulators.pathPrefix = '/js-dos/';
            }

            if (!rootRef.current || !window.Dos) {
                console.error("Window.Dos or RootRef missing", { Dos: !!window.Dos, Ref: !!rootRef.current });
                setStatus('error');
                return;
            }
            
            const instance = window.Dos(rootRef.current, {
                style: "hidden", // Hide default UI
            });
            
            instance.ready((fs: any, main: any) => {
                const gameUrl = '/games/doom_dos.ZIP';
                fetch(gameUrl, { method: 'HEAD' }).then(res => {
                    if (!res.ok) throw new Error("DOOM.ZIP missing");
                    
                    fs.extract(gameUrl).then(() => {
                        main(["-c", "DOOM.EXE"]).then((ci: any) => {
                            setDosInstance(ci);
                            setStatus('ready');
                        });
                    }).catch((e: Error) => {
                        console.error("Doom zip extraction failed", e);
                        setStatus('error');
                    });
                }).catch(e => {
                    console.error("Game file check failed", e);
                    setStatus('error');
                });
            });
        } catch (e: any) {
            console.error("DOOM Initialization Failed:", e.message);
            // You could store the error message in state to show to user
            setStatus('error');
        }
    };

    const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.body.appendChild(script);
        });
    };

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
            <div className="flex flex-col items-center justify-center w-full h-full bg-black p-8 text-center font-mono">
                <div className="border border-neon-green/30 p-6 max-w-md bg-black/50">
                    <h2 className="text-neon-green text-lg mb-4 uppercase tracking-wider">{"// DOOM PROTOCOL //"}</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        This will load the original DOOM (1993) shareware version in your browser using a DOS emulator.
                    </p>
                    <div className="border border-yellow-600/50 bg-yellow-900/10 p-3 mb-4 text-xs text-yellow-500">
                        <strong>⚠ WARNING:</strong> This requires downloading ~10MB of emulator files. Proceed on stable connection.
                    </div>
                    <div className="flex gap-4 justify-center">
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
                <div className="text-neon-green animate-pulse text-center">
                    <p className="text-lg mb-2">LOADING DOOM...</p>
                    <p className="text-xs text-gray-500">Initializing DOSBox emulator</p>
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
            <div className="flex flex-col items-center justify-center w-full h-full bg-black font-mono text-center p-8">
                <div className="text-red-500 mb-4">
                    <p className="text-lg">ERROR: DOOM INITIALIZATION FAILED</p>
                    <p className="text-xs text-gray-500 mt-2">Check console for details. Ensure js-dos files are in /public/js-dos/</p>
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

    // Game Screen
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-black">
            <div className="relative border-2 border-neon-green/30 rounded overflow-hidden">
                <div ref={rootRef} className="w-[640px] h-[400px] bg-black">
                    {/* DOS Box mounts here */}
                </div>
                {/* CRT Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_3px] z-20"></div>
            </div>
            <div className="mt-4 text-center font-mono">
                <p className="text-gray-500 text-xs">DOOM (Shareware) // id Software 1993</p>
                <p className="text-gray-600 text-[10px] mt-1">Arrow Keys: Move | Ctrl: Fire | Space: Open | ESC: Menu</p>
                <button 
                    onClick={onClose} 
                    className="mt-3 border border-red-800 text-red-500 px-4 py-1 hover:bg-red-900/20 text-xs uppercase"
                >
                    FORCE QUIT
                </button>
            </div>
        </div>
    );
}
