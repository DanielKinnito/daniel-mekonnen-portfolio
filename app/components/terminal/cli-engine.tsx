export type CommandType = 'help' | 'about' | 'projects' | 'clear' | 'doom' | 'credits' | 'unknown';

export interface CommandResponse {
  type: CommandType;
  output: React.ReactNode;
}

const HELP_TEXT = [
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'about', desc: 'Display user information' },
  { cmd: 'projects', desc: 'List portfolio projects' },
  { cmd: 'doom', desc: 'Launch DOOM (1993)' },
  { cmd: 'clear', desc: 'Clear terminal history' },
  { cmd: 'credits', desc: 'Show credits' },
];

export const processCommand = (input: string): CommandResponse => {
  const trimmed = input.trim().toLowerCase();

  switch (trimmed) {
    case 'help':
      return {
        type: 'help',
        output: (
          <div className="flex flex-col gap-1">
            <span className="text-neon-purple mb-2">AVAILABLE COMMANDS:</span>
            {HELP_TEXT.map((item) => (
              <div key={item.cmd} className="grid grid-cols-[100px_1fr] gap-4">
                <span className="text-neon-green font-bold">{item.cmd}</span>
                <span className="opacity-80">{item.desc}</span>
              </div>
            ))}
          </div>
        ),
      };
    
    case 'about':
      return {
        type: 'about',
        output: (
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-neon-purple font-bold">USER: Daniel Mekonnen</span>
            <p className="opacity-90 leading-relaxed">
              Full-Stack Developer. Problem Solver. Digital Architect.
            </p>
            <p className="opacity-80">
              I build robust backend systems and interactive frontends. 
              Always looking for the next challenge to optimize.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-4 text-xs opacity-70">
               <div>Location: Addis Ababa, ET</div>
               <div>Status: Online & Available</div>
            </div>
          </div>
        ),
      };

    case 'projects':
      return {
        type: 'projects',
        output: (
            <div className="flex flex-col gap-1">
                <span className="text-neon-purple font-bold">INITIALIZING PROJECT DATABASE INTERFACE...</span>
                <span className="opacity-70">Use UP/DOWN arrows to navigate. ENTER to select. Q to quit.</span>
            </div>
        )
      };

    case 'clear':
      return { type: 'clear', output: null };
    
    case 'doom':
        return { 
            type: 'doom', 
            output: <span className="text-red-500 font-bold animate-pulse">INITIATING DOOM PROTOCOL...</span> 
        };

    case 'credits':
        return {
            type: 'credits',
            output: <span>Designed &amp; Developed by Daniel Mekonnen. Powered by Next.js &amp; Dedsec.</span>
        };

    case '':
        return { type: 'unknown', output: null };

    default:
      return {
        type: 'unknown',
        output: (
          <span className="text-red-500">
            command not found: {trimmed}. Type &quot;help&quot; for assistance.
          </span>
        ),
      };
  }
};
