import React, { useState, useEffect } from 'react';
import { X, Key, Info, HelpCircle, Server, Database, Save, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: {
    claudeKey: string;
    vtKey: string;
    proxyUrl: string;
    modelName: string;
  }) => void;
  initialSettings: {
    claudeKey: string;
    vtKey: string;
    proxyUrl: string;
    modelName: string;
  };
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSettings
}) => {
  const [claudeKey, setClaudeKey] = useState(initialSettings.claudeKey);
  const [vtKey, setVtKey] = useState(initialSettings.vtKey);
  const [proxyUrl, setProxyUrl] = useState(initialSettings.proxyUrl);
  const [modelName, setModelName] = useState(initialSettings.modelName);
  const [showClaudeHelp, setShowClaudeHelp] = useState(false);
  const [showCorsHelp, setShowCorsHelp] = useState(false);

  useEffect(() => {
    setClaudeKey(initialSettings.claudeKey);
    setVtKey(initialSettings.vtKey);
    setProxyUrl(initialSettings.proxyUrl);
    setModelName(initialSettings.modelName);
  }, [initialSettings, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      claudeKey: claudeKey.trim(),
      vtKey: vtKey.trim(),
      proxyUrl: proxyUrl.trim(),
      modelName: modelName.trim()
    });
    onClose();
  };

  const handleClearKeys = () => {
    if (confirm("Are you sure you want to delete all stored API keys?")) {
      setClaudeKey('');
      setVtKey('');
      setProxyUrl('');
      setModelName('claude-3-5-sonnet-20241022');
      onSave({
        claudeKey: '',
        vtKey: '',
        proxyUrl: '',
        modelName: 'claude-3-5-sonnet-20241022'
      });
      alert("Stored keys removed. Running in local heuristics mode.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="glass-panel w-full max-w-lg rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800/80 bg-zinc-900/40">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-zinc-100 m-0">
              ScamShield AI Configuration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Informative Alert */}
          <div className="flex gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">No API keys? No problem!</span> By default, ScamShield AI operates a smart local heuristic rule-engine. It analyzes Vietnamese & English message structures offline, scanning for financial bait, brand impersonations, and urgency spikes immediately. Enter your keys below to expand threat database lookups and unlock full generative AI capabilities.
            </div>
          </div>

          {/* Claude API Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Server className="w-4 h-4 text-rose-400" />
                Anthropic Claude API Key
              </label>
              <button
                type="button"
                onClick={() => setShowClaudeHelp(!showClaudeHelp)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" /> How to get?
              </button>
            </div>

            {showClaudeHelp && (
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 space-y-1.5">
                <p>1. Go to the <a href="https://console.anthropic.com/" target="_blank" rel="noreferrer" className="text-rose-400 hover:underline">Anthropic Console</a>.</p>
                <p>2. Create a free account or buy API credits.</p>
                <p>3. Generate an API Key in the "API Keys" section.</p>
                <p className="text-[10px] text-amber-400">Note: API Keys are only sent to the Claude API endpoint directly from your browser and never touch external servers.</p>
              </div>
            )}

            <input
              type="password"
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/30 text-sm transition-all duration-200"
            />
          </div>

          {/* CORS Proxy URL */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Server className="w-4 h-4 text-amber-400" />
                Claude CORS Proxy URL <span className="text-[10px] text-zinc-500 font-normal">(Optional)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowCorsHelp(!showCorsHelp)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" /> Why proxy?
              </button>
            </div>

            {showCorsHelp && (
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 space-y-1.5">
                <p>Browsers block direct client-side fetch requests to Anthropic due to CORS policy designed to protect server credentials.</p>
                <p>To use real Claude analysis in the browser, you can:</p>
                <p>• Input a proxy server URL like <code className="text-zinc-300 bg-zinc-800/80 px-1 py-0.5 rounded text-[10px]">https://cors-anywhere.herokuapp.com/https://api.anthropic.com/v1/messages</code></p>
                <p>• Or, host your own simple proxy node.</p>
                <p>• Leave this empty to call Anthropic directly (requires browser CORS disablement or direct access config).</p>
              </div>
            )}

            <input
              type="text"
              value={proxyUrl}
              onChange={(e) => setProxyUrl(e.target.value)}
              placeholder="e.g. https://cors-anywhere.herokuapp.com/https://api.anthropic.com/v1/messages"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 text-sm transition-all duration-200"
            />
          </div>

          {/* Model Name & VirusTotal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Model Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-200 block">
                Claude Model
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="claude-3-5-sonnet-20241022"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500/80 text-sm transition-all duration-200"
              />
            </div>

            {/* VirusTotal API Key */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
                <Database className="w-4 h-4 text-emerald-400" />
                VirusTotal API Key
              </label>
              <input
                type="password"
                value={vtKey}
                onChange={(e) => setVtKey(e.target.value)}
                placeholder="VT API Key"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* VirusTotal Helper info */}
          <p className="text-[10px] text-zinc-500 leading-normal">
            To perform real-time URL global security audits, get a free VirusTotal public API key by registering at <a href="https://www.virustotal.com/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">virustotal.com</a>.
          </p>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
            <button
              type="button"
              onClick={handleClearKeys}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Clear Keys
            </button>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-bold shadow-lg shadow-rose-950/20 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
};
