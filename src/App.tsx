import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ResultsPanel } from './components/ResultsPanel';
import { SettingsModal } from './components/SettingsModal';
import { 
  analyzeInput, 
  detectInputType, 
  type AnalysisResult 
} from './utils/analyzer';
import { 
  ShieldAlert, 
  Cpu, 
  Activity, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';

function App() {
  // Stored state settings
  const [settings, setSettings] = useState({
    claudeKey: '',
    vtKey: '',
    proxyUrl: '',
    modelName: 'claude-3-5-sonnet-20241022'
  });

  // App running states
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  // Load API keys from LocalStorage on mount
  useEffect(() => {
    const storedClaude = localStorage.getItem('scamshield_claude_key') || '';
    const storedVt = localStorage.getItem('scamshield_vt_key') || '';
    const storedProxy = localStorage.getItem('scamshield_proxy_url') || '';
    const storedModel = localStorage.getItem('scamshield_model_name') || 'claude-3-5-sonnet-20241022';
    
    setSettings({
      claudeKey: storedClaude,
      vtKey: storedVt,
      proxyUrl: storedProxy,
      modelName: storedModel
    });
  }, []);

  // Save configurations
  const handleSaveSettings = (newSettings: typeof settings) => {
    localStorage.setItem('scamshield_claude_key', newSettings.claudeKey);
    localStorage.setItem('scamshield_vt_key', newSettings.vtKey);
    localStorage.setItem('scamshield_proxy_url', newSettings.proxyUrl);
    localStorage.setItem('scamshield_model_name', newSettings.modelName);
    
    setSettings(newSettings);
  };

  // Run cyber diagnostic scan
  const handleScan = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setScanError(null);
    setResult(null);

    try {
      const data = await analyzeInput(
        inputText,
        settings.claudeKey,
        settings.vtKey,
        settings.proxyUrl,
        settings.modelName
      );
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setScanError(err.message || 'Threat scan encountered an unexpected diagnostic error.');
    } finally {
      setLoading(false);
    }
  };

  const detectedType = detectInputType(inputText);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/20 selection:text-rose-200">
      
      {/* Decorative Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/10 to-transparent pointer-events-none" />

      {/* Brand Header */}
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        hasKeys={!!settings.claudeKey} 
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8 z-10 relative">
        
        {/* Top welcome intro block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100 flex items-center gap-2 m-0 font-display">
              <Activity className="w-5 h-5 text-rose-500 animate-pulse" /> Cyber Diagnostics Lab
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
              Verify suspicious SMS messages, phishing links, or unverified phone numbers using deep heuristic rule matrixes and Anthropic Claude AI.
            </p>
          </div>
          
          {/* Quick Stats Panel */}
          <div className="flex gap-3 text-xs font-semibold">
            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2 select-none">
              <Cpu className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-zinc-500">Analyzer Engine:</span>
              <span className="text-zinc-200">{settings.claudeKey ? 'Claude 3.5 Sonnet' : 'Local Heuristics Engine'}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2 select-none">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-500">VirusTotal Database:</span>
              <span className={settings.vtKey ? 'text-emerald-400' : 'text-zinc-500'}>
                {settings.vtKey ? 'CONNECTED' : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Input Panel (top/left) and Diagnostics display (bottom/right) */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Input Panel */}
          <InputArea
            inputText={inputText}
            onChangeInput={setInputText}
            onScan={handleScan}
            loading={loading}
            detectedType={detectedType}
          />

          {/* Results Area */}
          <div className="border-t border-zinc-900 pt-6">
            
            {/* Loader animation when scanning */}
            {loading && (
              <div className="glass-panel border border-zinc-800 p-8 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-xl text-center glow-rose min-h-[300px]">
                {/* Micro spinner */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-rose-500/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-rose-500 rounded-full animate-spin" />
                  <Cpu className="w-6 h-6 text-rose-500 animate-pulse" />
                </div>
                
                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-base font-bold tracking-tight text-zinc-200">
                    Running Digital Forensics...
                  </h3>
                  <p className="text-xs text-zinc-500 leading-normal animate-pulse">
                    Scanning structure heuristics, evaluating psychological manipulation tactics, and querying threat databases...
                  </p>
                </div>
              </div>
            )}

            {/* Error bound card */}
            {scanError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex gap-2.5 items-start max-w-2xl mx-auto shadow-lg shadow-rose-950/10">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-200 mb-0.5">Threat Diagnostic Failed</h4>
                  <p className="leading-relaxed">{scanError}</p>
                </div>
              </div>
            )}

            {/* Comprehensive Results Panel */}
            {result && !loading && (
              <ResultsPanel result={result} />
            )}

            {/* Empty State Banner (No Scans run yet) */}
            {!result && !loading && !scanError && (
              <div className="glass-panel border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] text-center">
                
                {/* Decorative absolute logo background */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 text-zinc-900 pointer-events-none opacity-30 select-none">
                  <ShieldAlert className="w-full h-full" />
                </div>

                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-4 shadow-inner">
                  <Cpu className="w-6 h-6 text-rose-400" />
                </div>

                <h3 className="text-base font-bold tracking-tight text-zinc-200 mb-1.5 uppercase font-display">
                  Threat Diagnostics Dashboard Standby
                </h3>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-6">
                  Paste content, links, or phone numbers in the input area above and click "Scan" to run modern heuristic threat audits.
                </p>

                {/* Features Highlights Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full text-left">
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 flex gap-2.5 items-start">
                    <TrendingUp className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-0.5">
                        Heuristic Matrix
                      </h4>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Instantly audits brand keywords, TLD extensions, lookalike subdomains, and cell prefix compliance.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 flex gap-2.5 items-start">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-0.5">
                        AI Intent Parser
                      </h4>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Scans linguistic text formats to map urgency spikes, fear markers, and high-reward lotteries.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 flex gap-2.5 items-start">
                    <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-0.5">
                        Threat Feed Lookup
                      </h4>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Compares links in real-time against global malicious indices via VirusTotal public registry lookup.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-5 text-center mt-12">
        <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">
          ScamShield AI — Designed with Next-Gen Heuristic Fraud Analysis. Safeguarding your digital workspace.
        </p>
      </footer>

      {/* Stored configurations modal popup */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        initialSettings={settings}
      />

    </div>
  );
}

export default App;
