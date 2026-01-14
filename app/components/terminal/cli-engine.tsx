export type CommandType = 'help' | 'about' | 'projects' | 'clear' | 'credits' | 'unknown' | 'skills' | 'contact' | 'whoami' | 'date' | 'weather' | 'quote' | 'hack' | 'sudo' | 'ls' | 'cat';

export interface CommandResponse {
  type: CommandType;
  output: React.ReactNode;
}

const HELP_TEXT = [
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'about', desc: 'Display user information' },
  { cmd: 'skills', desc: 'Show technical skills' },
  { cmd: 'projects', desc: 'List portfolio projects' },
  { cmd: 'contact', desc: 'Display contact information' },
  { cmd: 'whoami', desc: 'Current user information' },
  { cmd: 'date', desc: 'Display current date and time' },
  { cmd: 'weather', desc: 'Show current weather (simulated)' },
  { cmd: 'quote', desc: 'Display a random inspirational quote' },
  { cmd: 'hack', desc: 'Simulate hacking sequence' },
  { cmd: 'sudo', desc: 'Execute with elevated privileges (restricted)' },
  { cmd: 'ls', desc: 'List directory contents' },
  { cmd: 'clear', desc: 'Clear terminal history' },
  { cmd: 'credits', desc: 'Show credits and acknowledgments' },
];

const SKILLS_DATA = {
  languages: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'C++', 'Java', 'SQL', 'Rust'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Flutter', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  tools: ['Git', 'Docker', 'AWS', 'Linux', 'REST APIs', 'GraphQL'],
};

const QUOTES = [
  { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Programming is not about what you know; it\'s about what you can figure out.', author: 'Chris Pine' },
  { text: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
];

const DIRECTORY_LISTING = [
  { name: 'about.txt', type: 'file', size: '2.3KB' },
  { name: 'skills/', type: 'directory', size: '-' },
  { name: 'projects/', type: 'directory', size: '-' },
  { name: 'contact.info', type: 'file', size: '1.1KB' },
  { name: 'resume.pdf', type: 'file', size: '156KB' },
  { name: 'secrets/', type: 'directory', size: '?' },
];

export const processCommand = (input: string): CommandResponse => {
  const trimmed = input.trim().toLowerCase();
  const args = trimmed.split(' ').filter(arg => arg.length > 0);
  const command = args[0];
  const arg1 = args[1];

  switch (command) {
    case 'help':
      return {
        type: 'help',
        output: (
          <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-main/50 scrollbar-track-transparent">
            <span className="text-main mb-2 font-bold sticky top-0 bg-black/90 pb-2">AVAILABLE COMMANDS:</span>
            {HELP_TEXT.map((item) => (
              <div key={item.cmd} className="grid grid-cols-[120px_1fr] gap-4 py-0.5">
                <span className="text-main font-bold">{item.cmd}</span>
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
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="border-l-2 border-main pl-4">
              <span className="text-main font-bold text-lg">Daniel Mekonnen</span>
              <span className="ml-2 text-sm opacity-60">[FULL-STACK DEVELOPER]</span>
            </div>
            <p className="opacity-90 leading-relaxed">
              Software Engineering graduate from Addis Ababa Science and Technology University. 
              Former Remote Head of Education at A2SV. Passionate about algorithms, data structures, 
              and competitive programming.
            </p>
            <p className="opacity-80">
              Specializing in building robust backend systems and interactive frontends. 
              Always looking for the next challenge to optimize and innovate.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm opacity-70 border-t border-white/10 pt-4">
               <div>📍 Location: Addis Ababa, Ethiopia</div>
               <div>💼 Status: Open to opportunities</div>
               <div>🎯 Focus: Backend & System Architecture</div>
               <div>⚡ Available for freelance</div>
            </div>
          </div>
        ),
      };

    case 'skills':
      return {
        type: 'skills',
        output: (
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-main font-bold border-b border-white/10 pb-2">TECHNICAL SKILLSET:</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="text-main font-bold text-sm">💻 LANGUAGES</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS_DATA.languages.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-main/10 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="text-main font-bold text-sm">🎨 FRONTEND</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS_DATA.frontend.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-main/10 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="text-main font-bold text-sm">⚙️ BACKEND</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS_DATA.backend.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-main/10 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="text-main font-bold text-sm">🛠️ TOOLS & PLATFORMS</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS_DATA.tools.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-main/10 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      };

    case 'contact':
      return {
        type: 'contact',
        output: (
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-main font-bold border-b border-white/10 pb-2">CONTACT INFORMATION:</span>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/10">
                <span className="text-xl">📧</span>
                <div>
                  <span className="opacity-70 text-sm">Email</span>
                  <div className="text-main">mokonnendaniel@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/10">
                <span className="text-xl">🌐</span>
                <div>
                  <span className="opacity-70 text-sm">Website</span>
                  <div className="text-main">danielmekonnen.vercel.app</div>
                </div>
              </div>
            </div>
          </div>
        ),
      };

    case 'whoami':
      return {
        type: 'whoami',
        output: (
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="font-mono text-sm">
              <div>user: daniel</div>
              <div>uid: 1000</div>
              <div>gid: 1000</div>
              <div>groups: sudo, admin, developers, competitive-programmers</div>
              <div>home: /home/daniel</div>
              <div>shell: /usr/bin/zsh</div>
              <div className="mt-2 opacity-70">
                Current session: Interactive Terminal v2.0
              </div>
            </div>
          </div>
        ),
      };

    case 'date':
      return {
        type: 'date',
        output: (
          <div className="font-mono">
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
        ),
      };

    case 'weather':
      const weatherConditions = [
        { condition: 'Clear', temp: 72, humidity: 45 },
        { condition: 'Cloudy', temp: 68, humidity: 60 },
        { condition: 'Sunny', temp: 75, humidity: 40 },
        { condition: 'Code Weather', temp: 98, humidity: 100 },
      ];
      const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      return {
        type: 'weather',
        output: (
          <div className="flex flex-col gap-2">
            <div className="text-main font-bold">WEATHER REPORT [SIMULATED]</div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center p-3 bg-white/5 rounded border border-white/10">
                <div className="text-2xl">☀️</div>
                <div className="text-xl font-bold">{weather.temp}°F</div>
                <div className="text-sm opacity-70">{weather.condition}</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded border border-white/10">
                <div className="text-2xl">💧</div>
                <div className="text-xl font-bold">{weather.humidity}%</div>
                <div className="text-sm opacity-70">Humidity</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded border border-white/10">
                <div className="text-2xl">🌍</div>
                <div className="text-xl font-bold">ADDIS ABABA</div>
                <div className="text-sm opacity-70">Location</div>
              </div>
            </div>
          </div>
        ),
      };

    case 'quote':
      const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      return {
        type: 'quote',
        output: (
          <div className="flex flex-col gap-2 max-w-2xl italic">
            <div className="text-2xl opacity-50">&quot;</div>
            <div className="text-lg leading-relaxed pl-4">{quote.text}</div>
            <div className="text-right text-sm opacity-70">— {quote.author}</div>
          </div>
        ),
      };

    case 'hack':
      return {
        type: 'hack',
        output: (
          <div className="font-mono text-sm">
            <div className="text-red-400">INITIATING HACKING SEQUENCE...</div>
            <div className="mt-2 text-green-400">
              <div>[{'>'.repeat(Math.floor(Math.random() * 3) + 1)}] Connecting to remote host...</div>
              <div>[{'>'.repeat(Math.floor(Math.random() * 3) + 1)}] Bypassing firewall...</div>
              <div className="animate-pulse">[{'>'.repeat(Math.floor(Math.random() * 3) + 1)}] Accessing restricted files...</div>
            </div>
            <div className="mt-2 text-xs opacity-70">[Access Denied - This is just a simulation!]</div>
          </div>
        ),
      };

    case 'sudo':
      return {
        type: 'sudo',
        output: (
          <div className="text-red-400">
            <div>⚠️  sudo: you shall not pass!</div>
            <div className="mt-2 text-sm opacity-70">
              [Access to elevated privileges has been restricted for your safety.]
            </div>
            <div className="mt-2 text-xs opacity-50">
              [Just kidding... but maybe ask Daniel directly! 😄]
            </div>
          </div>
        ),
      };

    case 'ls':
      return {
        type: 'ls',
        output: (
          <div className="font-mono text-sm">
            <div className="grid grid-cols-[1fr_80px_100px] gap-2 opacity-70 mb-2">
              <span>NAME</span>
              <span>TYPE</span>
              <span>SIZE</span>
            </div>
            {DIRECTORY_LISTING.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_100px] gap-2 hover:bg-white/5 py-1">
                <span className={item.type === 'directory' ? 'text-blue-400' : 'text-main'}>
                  {item.type === 'directory' ? '📁 ' : '📄 '}{item.name}
                </span>
                <span className="opacity-50">{item.type}</span>
                <span className="opacity-50">{item.size}</span>
              </div>
            ))}
          </div>
        ),
      };

    case 'cat':
      if (!arg1) {
        return {
          type: 'unknown',
          output: <span className="text-red-400">cat: missing file operand</span>,
        };
      }
      if (arg1 === 'about.txt') {
        return {
          type: 'unknown',
          output: (
            <div className="text-sm">
              Daniel Mekonnen - Full-Stack Developer<br/>
              Passionate about creating elegant solutions to complex problems.
            </div>
          ),
        };
      }
      if (arg1 === 'contact.info') {
        return {
          type: 'unknown',
          output: (
            <div className="text-sm">
              Email: mokonnendaniel@gmail.com<br/>
              GitHub: github.com/DanielKinnito
            </div>
          ),
        };
      }
      return {
        type: 'unknown',
        output: <span className="text-red-400">cat: {arg1}: No such file or directory</span>,
      };

    case 'projects':
      return {
        type: 'projects',
        output: (
            <div className="flex flex-col gap-1">
                <span className="text-main font-bold">INITIALIZING PROJECT DATABASE INTERFACE...</span>
                <span className="opacity-70">Use UP/DOWN arrows to navigate. ENTER to select. Q to quit.</span>
            </div>
        )
      };

    case 'clear':
      return { type: 'clear', output: null };
    
    case 'credits':
      return {
        type: 'credits',
        output: (
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-main font-bold">CREDITS & ACKNOWLEDGMENTS:</span>
            <div className="grid gap-2 mt-2">
              <div className="p-2 bg-white/5 rounded border border-white/10">
                <span className="text-main">Designed & Developed</span>
                <span className="ml-2 opacity-70">Daniel Mekonnen</span>
              </div>
              <div className="p-2 bg-white/5 rounded border border-white/10">
                <span className="text-main">Built with</span>
                <span className="ml-2 opacity-70">Next.js, React, Tailwind CSS</span>
              </div>
              <div className="p-2 bg-white/5 rounded border border-white/10">
                <span className="text-main">Terminal Emulation</span>
                <span className="ml-2 opacity-70">Custom implementation</span>
              </div>
              <div className="p-2 bg-white/5 rounded border border-white/10">
                <span className="text-main">DOS Emulation</span>
                <span className="ml-2 opacity-70">js-dos</span>
              </div>
              <div className="mt-4 text-sm opacity-50 text-center">
                © 2025 Daniel Mekonnen. All rights reserved.
              </div>
            </div>
          </div>
        ),
      };

    case '':
      return { type: 'unknown', output: null };

    default:
      return {
        type: 'unknown',
        output: (
          <div className="flex flex-col gap-1">
            <span className="text-red-400">
              command not found: {command}. Type &quot;help&quot; for assistance.
            </span>
            <span className="text-xs opacity-50 mt-1">
              [Tip: Available commands include whoami, weather, quote, and more!]
            </span>
          </div>
        ),
      };
  }
};
