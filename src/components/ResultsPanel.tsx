import { 
  ShieldX, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  Phone, 
  Database, 
  Lock, 
  Unlock, 
  ExternalLink,
  Fingerprint
} from 'lucide-react';
import type { AnalysisResult } from '../utils/analyzer';
import { RiskMeter } from './RiskMeter';

interface ResultsPanelProps {
  result: AnalysisResult | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  if (!result) return null;

  const { riskScore, category, reasons, action, explanation, metadata } = result;

  // Determine Action Banner Styling
  const getActionBannerProps = () => {
    switch (action) {
      case 'Block & Report':
        return {
          icon: <ShieldX className="w-8 h-8 text-rose-500" />,
          title: "BLOCK & REPORT IMMEDIATELY",
          desc: "Critical threat detected. Do not click links, send money, reply, or verify credentials.",
          themeClass: "bg-rose-500/10 border-rose-500/30 text-rose-200 glow-rose"
        };
      case 'Proceed with caution':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
          title: "PROCEED WITH CAUTION",
          desc: "Suspicious markers found. Verify sender identity via independent official channels.",
          themeClass: "bg-amber-500/10 border-amber-500/30 text-amber-200 glow-amber"
        };
      default:
        return {
          icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
          title: "VERIFIED SECURE / SAFE",
          desc: "No fraudulent intent detected. Standard official structure verified.",
          themeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200 glow-emerald"
        };
    }
  };

  const actionBanner = getActionBannerProps();

  return (
    <div className="space-y-6 animate-scale-up">
      
      {/* 2-Column Main Dashboard Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Risk Gauge & Action Banner (width 2/5 on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Risk Gauge */}
          <RiskMeter score={riskScore} />

          {/* Action Recommendation Card */}
          <div className={`glass-panel border p-5 rounded-2xl flex gap-4 transition-all duration-300 ${actionBanner.themeClass}`}>
            <div className="shrink-0 flex items-center justify-center p-3 rounded-xl bg-zinc-950/50 border border-zinc-800">
              {actionBanner.icon}
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest uppercase mb-1 font-display">
                Recommended Safety Action
              </h4>
              <h3 className="text-base font-extrabold tracking-tight mb-1.5 leading-snug">
                {actionBanner.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-normal">
                {actionBanner.desc}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: AI breakdown (width 3/5 on large screen) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* AI Core Diagnostics Panel */}
          <div className="glass-panel border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase m-0">
                  AI Threat Intelligence Report
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-rose-400">
                {category}
              </span>
            </div>

            {/* Structured Findings List */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                  Identified Fraud Threat Indicators:
                </h4>
                <ul className="space-y-2 m-0 p-0 list-none">
                  {reasons.map((reason, idx) => {
                    const isWarning = riskScore >= 30;
                    return (
                      <li key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-zinc-300">
                        {isWarning ? (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        <span>{reason}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Explanatory Breakdown */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                  Detailed Diagnostic Assessment:
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {explanation}
                </p>
              </div>
            </div>

          </div>

          {/* Conditional URL Intelligence Card */}
          {metadata?.urlAnalysis && (
            <div className="glass-panel border border-zinc-800/80 rounded-2xl p-5 space-y-4">
              
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4.5 h-4.5 text-amber-400" />
                  <h4 className="text-sm font-bold text-zinc-300 m-0 uppercase tracking-wide">
                    URL Structure Analysis Heuristics
                  </h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  metadata.urlAnalysis.overallUrlRisk === 'high'
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                    : metadata.urlAnalysis.overallUrlRisk === 'medium'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                }`}>
                  {metadata.urlAnalysis.overallUrlRisk} risk url
                </span>
              </div>

              {/* URL Heuristics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Domain Target */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Domain target:</span>
                  <span className="font-bold text-zinc-200 break-all">{metadata.urlAnalysis.domain}</span>
                </div>

                {/* HTTPS Status */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Connection protocol:</span>
                  {metadata.urlAnalysis.isHttps ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Lock className="w-3.5 h-3.5" /> HTTPS Secure
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-500 font-bold">
                      <Unlock className="w-3.5 h-3.5" /> HTTP Insecure
                    </span>
                  )}
                </div>

                {/* Top-Level Domain extension check */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">TLD Extension risk:</span>
                  {metadata.urlAnalysis.isHighRiskTld ? (
                    <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 uppercase text-[10px]">
                      HIGH RISK ({metadata.urlAnalysis.tld})
                    </span>
                  ) : (
                    <span className="text-zinc-400 font-bold">
                      Standard ({metadata.urlAnalysis.tld || 'Unknown'})
                    </span>
                  )}
                </div>

                {/* Homograph spoofing */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Character Spoof Heuristic:</span>
                  {metadata.urlAnalysis.hasHomographTactic ? (
                    <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 text-[10px]">
                      SPOOF SIGNAL DETECTED
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold">Passed (No spoofing)</span>
                  )}
                </div>

                {/* Brand keywords in domain */}
                <div className="sm:col-span-2 flex flex-col p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Brand Impersonation keywords:</span>
                    <span className={`font-bold ${metadata.urlAnalysis.hasSuspiciousKeywords ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {metadata.urlAnalysis.hasSuspiciousKeywords ? 'FLAGGED' : 'CLEAN'}
                    </span>
                  </div>
                  {metadata.urlAnalysis.hasSuspiciousKeywords && (
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      Domain contains brand words often targeted in spoof templates: <code className="text-rose-300 bg-rose-950/20 px-1 py-0.5 rounded border border-rose-900/30">{metadata.urlAnalysis.suspiciousKeywordsFound.join(', ')}</code>
                    </p>
                  )}
                </div>

              </div>

              {/* VirusTotal Database Integration */}
              <div className="mt-4 pt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    VirusTotal Threat Database Status
                  </span>
                </div>

                {metadata.virusTotal?.scanned ? (
                  <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-3">
                    
                    {/* Scan header */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400 font-medium">Real-Time Threat Scan:</span>
                      {metadata.virusTotal.positives > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold uppercase text-[9px] animate-pulse">
                          MALICIOUS ({metadata.virusTotal.positives}/{metadata.virusTotal.total} Engines)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase text-[9px]">
                          CLEAN / UNDETECTED
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed leading-normal">
                      {metadata.virusTotal.positives > 0
                        ? `CRITICAL WARNING: This URL has been flagged directly by ${metadata.virusTotal.positives} threat detection engines in the VirusTotal global database. Avoid this page.`
                        : "No security engines currently flag this URL inside the VirusTotal repository."}
                    </p>

                    {/* Scan Dates & Actions */}
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-zinc-800/60">
                      <span>Database Scan Date: {metadata.virusTotal.scanDate || 'Real-time Lookup'}</span>
                      {metadata.virusTotal.permalink && (
                        <a 
                          href={metadata.virusTotal.permalink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-0.5 text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
                        >
                          View VT Analysis <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-[11px] text-zinc-500 leading-normal flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-400">Global Scan Disabled:</span> Input a VirusTotal API Key in the settings panel to pull real-time malicious scan scores from 70+ cybersecurity providers like Kaspersky, Sophos, and Symantec.
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Conditional Phone Intelligence Card */}
          {metadata?.phoneAnalysis && (
            <div className="glass-panel border border-zinc-800/80 rounded-2xl p-5 space-y-4">
              
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4.5 h-4.5 text-sky-400" />
                  <h4 className="text-sm font-bold text-zinc-300 m-0 uppercase tracking-wide">
                    Phone Prefix & Subscriber Heuristics
                  </h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  metadata.phoneAnalysis.overallPhoneRisk === 'high'
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                    : metadata.phoneAnalysis.overallPhoneRisk === 'medium'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                }`}>
                  {metadata.phoneAnalysis.overallPhoneRisk} risk number
                </span>
              </div>

              {/* Phone Heuristics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Number Format */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Subscriber target:</span>
                  <span className="font-bold text-zinc-200">{metadata.phoneAnalysis.phoneNumber}</span>
                </div>

                {/* Carrier Network */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Carrier network:</span>
                  <span className={`font-bold ${
                    metadata.phoneAnalysis.carrier === 'Unknown' 
                      ? 'text-amber-400' 
                      : 'text-sky-400'
                  }`}>
                    {metadata.phoneAnalysis.carrier}
                  </span>
                </div>

                {/* Prefix format */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Standard length:</span>
                  {metadata.phoneAnalysis.isValidLength ? (
                    <span className="text-emerald-400 font-bold">Passed (Valid subscriber length)</span>
                  ) : (
                    <span className="text-rose-500 font-bold">Failed (Suspicious digit count)</span>
                  )}
                </div>

                {/* Dial format */}
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-500">Dial Code structure:</span>
                  <span className="text-zinc-300 font-medium">
                    {metadata.phoneAnalysis.isInternational ? 'International (+84 Format)' : 'Domestic / Local Format'}
                  </span>
                </div>

              </div>

              {/* Phone Warning note */}
              {metadata.phoneAnalysis.overallPhoneRisk === 'medium' || metadata.phoneAnalysis.overallPhoneRisk === 'high' ? (
                <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[11px] text-rose-300/90 leading-relaxed leading-normal">
                  Caution: The phone number lacks standard carrier signatures or is improperly formatted. This is standard in online burn SIM cards or VOIP spam scripts utilized by off-shore telemarketing scammers to hide geographic addresses. Avoid replying.
                </div>
              ) : null}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
