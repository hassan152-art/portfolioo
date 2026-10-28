import { useState } from 'react';
import { Terminal as TerminalIcon, Sparkles, Check, Copy } from 'lucide-react';
import { profile } from '../data/profile';

const COMMANDS = {
  help: 'Available commands: about, skills, services, stats, contact, clear',
  about: profile.about[0] + '\n' + profile.about[1],
  skills: 'React.js, Node.js, Express, JavaScript (ES6+), PHP, C# .NET MVC, MongoDB, MySQL, HTML5, CSS3, Tailwind, Git',
  services: '1. Frontend & UI/UX | 2. Backend & APIs | 3. Database Design | 4. Full-Stack E-Commerce',
  stats: `• Experience: 1+ Year\n• Projects: 15+ built\n• Client Satisfaction: 99%\n• Location: Karachi, Pakistan (On-Site & Remote)`,
  contact: `Email: ${profile.email}\nPhone: ${profile.phone}\nGitHub: ${profile.github}`,
};

export default function TerminalBio() {
  const [history, setHistory] = useState([
    { cmd: 'whoami', out: `Hassan Ahmed Siddiqui - Full-Stack Web Developer & UI/UX Specialist` },
    { cmd: 'cat status.txt', out: '? Available immediately for full-time & freelance projects' },
  ]);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRun = (cmdName) => {
    const raw = cmdName.trim().toLowerCase();
    if (!raw) return;
    if (raw === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    const output = COMMANDS[raw] || `command not found: "${raw}". Type "help" for a list of commands.`;
    setHistory((prev) => [...prev, { cmd: raw, out: output }]);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRun(input);
  };

  const handleCopyBio = () => {
    navigator.clipboard.writeText(`Hassan Ahmed Siddiqui - Full-Stack Developer | Email: ${profile.email} | Phone: ${profile.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-wrap glass">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="t-dot t-red" />
          <span className="t-dot t-yellow" />
          <span className="t-dot t-green" />
        </div>
        <div className="terminal-title">
          <TerminalIcon size={14} />
          <span>hassan@developer: ~</span>
        </div>
        <button
          onClick={handleCopyBio}
          className="terminal-copy-btn"
          title="Copy developer details"
          type="button"
        >
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="terminal-body">
        {history.map((h, i) => (
          <div key={i} className="terminal-line">
            <div className="terminal-cmd">
              <span className="t-prompt">?</span>
              <span className="t-dir">~</span>
              <span className="t-in">{h.cmd}</span>
            </div>
            <div className="terminal-out">{h.out}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-row">
          <span className="t-prompt">?</span>
          <span className="t-dir">~</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'skills', 'about'..."
            className="terminal-input"
          />
        </form>
      </div>

      <div className="terminal-shortcuts">
        <span className="muted small">Quick run:</span>
        {['about', 'skills', 'services', 'stats', 'contact'].map((c) => (
          <button
            key={c}
            type="button"
            className="terminal-chip"
            onClick={() => handleRun(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
