import { ShieldAlert, Settings, Cpu } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  hasKeys: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, hasKeys }) => {
  return (
    <header className="glass-panel border-b border-zinc-800/60 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 shadow-[0_0_15px_rgba(225,29,72,0.4)] animate-pulse">
            <ShieldAlert className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent m-0 select-none">
                ScamShield <span className="text-rose-500 font-black">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                v1.0.0
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium hidden sm:block">
              AI-Powered Phishing, URL & Fraud Threat Scanner
            </p>
          </div>
        </div>

        {/* Protection Badges & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Protection State */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300">Live Active Protection</span>
          </div>

          {/* Core Analyzer Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
            hasKeys 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
              : 'bg-zinc-800/50 border-zinc-700/30 text-zinc-400'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${hasKeys ? 'animate-spin-slow' : ''}`} />
            <span>{hasKeys ? 'Claude-AI Armed' : 'Heuristics Mode'}</span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 hover:border-zinc-700 active:scale-95 transition-all duration-200 cursor-pointer relative group"
            title="Configure AI & APIs"
          >
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            {!hasKeys && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-zinc-950 animate-bounce" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
