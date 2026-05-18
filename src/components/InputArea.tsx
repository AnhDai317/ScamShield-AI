import React from 'react';
import { Scan, Clipboard, Trash2, Globe, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import type { InputType } from '../utils/analyzer';

interface InputAreaProps {
  inputText: string;
  onChangeInput: (text: string) => void;
  onScan: () => void;
  loading: boolean;
  detectedType: InputType;
}

export const InputArea: React.FC<InputAreaProps> = ({
  inputText,
  onChangeInput,
  onScan,
  loading,
  detectedType
}) => {
  const presets = [
    {
      label: "SMS Bank Scam (Vietcombank)",
      text: "Tài khoản của bạn bị khóa, nhấn link để xác minh: vietcombank-secure.xyz",
      type: "SMS Phishing"
    },
    {
      label: "Fake Reward Scam",
      text: "Bạn đã trúng thưởng 50 triệu, liên hệ 0987654321 để nhận",
      type: "Prize Scam"
    },
    {
      label: "Safe Official Bank Portal",
      text: "https://www.vietcombank.com.vn",
      type: "Official Link"
    }
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChangeInput(text);
      }
    } catch (err) {
      console.warn("Clipboard access denied by user.");
    }
  };

  const handleClear = () => {
    onChangeInput('');
  };

  // Helper to render the reactive input type badge
  const renderBadge = () => {
    if (!inputText.trim()) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Awaiting Input...</span>
        </span>
      );
    }

    switch (detectedType) {
      case 'url':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse glow-amber">
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            <span>URL / LINK DETECTED</span>
          </span>
        );
      case 'phone':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 animate-pulse">
            <Phone className="w-3.5 h-3.5" />
            <span>PHONE NUMBER DETECTED</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SMS / MESSAGE TEXT DETECTED</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* TextArea Panel */}
      <div className="glass-panel rounded-2xl border border-zinc-800/80 p-5 relative overflow-hidden shadow-xl">
        
        {/* Background Accent Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.05),transparent_50%)] pointer-events-none" />
        
        {/* Top bar of Input Area */}
        <div className="flex items-center justify-between mb-3.5 z-10 relative">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Scan Threat Input
          </span>
          {renderBadge()}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => onChangeInput(e.target.value)}
            disabled={loading}
            placeholder="Paste suspicious text message, phishing URL/link, or phone number here to run deep cyber diagnostics..."
            className="w-full h-44 sm:h-52 px-4 py-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/30 transition-all duration-300 resize-none leading-relaxed font-sans"
          />
          
          {/* Scanning Animation Laser Line */}
          {loading && (
            <div className="absolute inset-x-0 top-0 h-0.5 bg-rose-500/80 blur-xs scanner-line z-10" />
          )}

          {/* Floating Actions on empty text vs content */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
                title="Clear input"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handlePaste}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
            >
              <Clipboard className="w-3.5 h-3.5" /> Paste
            </button>
          </div>
        </div>

        {/* Scan Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[10px] text-zinc-500 max-w-[50%] leading-normal hidden sm:block">
            Input analyzed locally for instant risk calculation. AI verification checks semantic fraud intents in parallel.
          </p>
          <button
            onClick={onScan}
            disabled={loading || !inputText.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer ${
              !inputText.trim() 
                ? 'bg-zinc-800/50 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                : loading
                ? 'bg-zinc-800 border border-zinc-700 text-zinc-400 cursor-wait'
                : 'bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-lg shadow-rose-950/20 active:scale-95 hover:shadow-rose-500/10'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4.5 h-4.5 border-2 border-t-transparent border-zinc-400 rounded-full animate-spin" />
                <span>Running Threat Analysis...</span>
              </>
            ) : (
              <>
                <Scan className="w-4.5 h-4.5" />
                <span>Scan for Scam Risks</span>
                <ArrowRight className="w-4 h-4 text-white/70" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Preset scam cases cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
            Try Sample Scam Patterns
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onChangeInput(preset.text)}
              disabled={loading}
              className="glass-panel glass-panel-hover text-left p-3.5 rounded-xl border border-zinc-800/80 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-28"
            >
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase mb-1.5 border ${
                  idx === 0 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : idx === 1
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}>
                  {preset.type}
                </span>
                <p className="text-xs font-semibold text-zinc-200 line-clamp-2 leading-relaxed group-hover:text-zinc-50 transition-colors duration-200">
                  "{preset.text}"
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 flex items-center gap-0.5 mt-2 font-bold font-display self-end">
                Analyze Sample →
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
