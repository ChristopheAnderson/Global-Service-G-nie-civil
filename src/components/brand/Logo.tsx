import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  className = '',
}) => {
  const isLight = theme === 'light';

  // Dimensions mapping
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  // Monogram GS SVG Icon
  const GSIcon = (
    <div
      className={`relative rounded-xl flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 shadow-md ${
        iconSizes[size]
      } ${
        isLight
          ? 'bg-slate-900 border border-amber-500/40 text-white'
          : 'bg-slate-900/90 border border-white/10 text-white shadow-glow-amber/20'
      }`}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="logoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Blueprint background grid */}
        <line x1="10" y1="35" x2="90" y2="35" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="10" y1="65" x2="90" y2="65" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="35" y1="10" x2="35" y2="90" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
        <line x1="65" y1="10" x2="65" y2="90" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>

        {/* Architectural G */}
        <path
          d="M 54 26 L 32 26 A 22 22 0 0 0 32 74 L 56 74 L 56 53 L 44 53"
          stroke="url(#logoOrange)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Architectural S */}
        <path
          d="M 74 36 C 74 27 60 25 54 32 C 46 42 75 49 75 64 C 75 78 57 80 46 75"
          stroke="#F8FAFC"
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Architectural Apex */}
        <polygon points="50,13 55,22 45,22" fill="#D97706" />
        <circle cx="56" cy="53" r="2.5" fill="#D97706" />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{GSIcon}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 group ${className}`}>
        {GSIcon}
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold tracking-wider ${titleSizes[size]} ${
              isLight ? 'text-btp-midnight' : 'text-white'
            }`}
          >
            GLOBAL <span className="text-btp-orange">SERVICE</span>
          </span>
          <span
            className={`font-sans font-semibold tracking-widest uppercase ${subtitleSizes[size]} ${
              isLight ? 'text-btp-anthracite' : 'text-btp-concrete'
            }`}
          >
            GÉNIE CIVIL &amp; BTP · BÉNIN
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {GSIcon}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-heading font-black tracking-tight ${titleSizes[size]} ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            GLOBAL
          </span>
          <span className={`font-heading font-black tracking-tight ml-1.5 text-amber-600 ${titleSizes[size]}`}>
            SERVICE
          </span>
        </div>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <span
            className={`font-sans font-bold tracking-[0.2em] uppercase ${subtitleSizes[size]} ${
              isLight ? 'text-slate-800' : 'text-btp-concrete'
            }`}
          >
            GÉNIE CIVIL &amp; BTP
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-500" />
          <span
            className={`font-sans font-bold tracking-wider text-[10px] uppercase ${
              isLight ? 'text-amber-700' : 'text-btp-concrete/80'
            }`}
          >
            BÉNIN
          </span>
        </div>
      </div>
    </div>
  );
};

