import React, { useEffect, useState } from 'react';

interface RiskMeterProps {
  score: number;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Reset and trigger smooth animation
    setAnimatedScore(0);
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  // Circle path parameters for SVGs
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // Approx 376.99
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine threat level color themes
  const getTheme = () => {
    if (score >= 70) {
      return {
        strokeColor: 'url(#rose-gradient)',
        bgColor: 'text-rose-500/10',
        textColor: 'text-rose-500',
        label: 'CRITICAL THREAT',
        glowClass: 'glow-rose border-rose-500/20'
      };
    } else if (score >= 30) {
      return {
        strokeColor: 'url(#amber-gradient)',
        bgColor: 'text-amber-500/10',
        textColor: 'text-amber-400',
        label: 'SUSPICIOUS / CAUTION',
        glowClass: 'glow-amber border-amber-500/20'
      };
    } else {
      return {
        strokeColor: 'url(#emerald-gradient)',
        bgColor: 'text-emerald-500/10',
        textColor: 'text-emerald-400',
        label: 'VERIFIED SAFE',
        glowClass: 'glow-emerald border-emerald-500/20'
      };
    }
  };

  const theme = getTheme();

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl glass-panel border transition-all duration-500 h-full ${theme.glowClass}`}>
      
      {/* Label Title */}
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
        Threat Diagnostics Indicator
      </span>

      {/* Circle Gauge Container */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        
        {/* SVG Circle Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          
          {/* Defs for colorful glowing linear gradients */}
          <defs>
            <linearGradient id="rose-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="amber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Underlay Track Ring */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#1f1f23"
            strokeWidth={strokeWidth}
          />

          {/* Active Glowing Score Arc */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke={theme.strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>

        {/* Text values inside the circular meter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-start">
            <span className={`text-4xl font-extrabold tracking-tight font-display transition-all duration-300 ${theme.textColor}`}>
              {animatedScore}
            </span>
            <span className={`text-sm font-semibold mt-1.5 ml-0.5 ${theme.textColor}`}>%</span>
          </div>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
            DANGER INDEX
          </span>
        </div>

      </div>

      {/* Level text indicator */}
      <div className="text-center mt-4">
        <h3 className={`text-sm font-black tracking-wider uppercase font-display ${theme.textColor}`}>
          {theme.label}
        </h3>
        <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">
          AI Risk Score Matrix
        </p>
      </div>

    </div>
  );
};
