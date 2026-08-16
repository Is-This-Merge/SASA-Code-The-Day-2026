import React from 'react';

interface MomentsLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  textColor?: string;
  iconColor?: string;
}

export const MomentsLogo: React.FC<MomentsLogoProps> = ({
  showText = true,
  size = 'md',
  className = '',
  textColor = 'text-[#2C2825]',
  iconColor = '#C85A32',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Moments Custom Vector Emblem */}
      <svg
        viewBox="0 0 100 100"
        className={`${iconSizes[size]} flex-shrink-0 transition-transform duration-300 hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Rounded Camera Frame Corners */}
        <path
          d="M 32 18 C 22 18 16 24 16 34 L 16 66 C 16 76 22 82 32 82 L 40 82"
          stroke={iconColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path
          d="M 68 18 C 78 18 84 24 84 34 L 84 66 C 84 76 78 82 68 82 L 60 82"
          stroke={iconColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* Camera Aperture / Viewfinder Dot */}
        <circle cx="74" cy="28" r="4.5" fill={iconColor} />

        {/* Central Burst / Sparkle 8-point Radiance */}
        {/* Center 8-pointed star */}
        <path
          d="M 50 28 C 50 38 40 46 30 50 C 40 54 50 62 50 72 C 50 62 60 54 70 50 C 60 46 50 38 50 28 Z"
          stroke={iconColor}
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/* Spark Rays */}
        <circle cx="50" cy="14" r="3" fill={iconColor} />
        <circle cx="50" cy="86" r="3" fill={iconColor} />
        
        {/* Diagonal Ray Marks */}
        <line x1="32" y1="32" x2="27" y2="27" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="68" y1="32" x2="73" y2="27" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="32" y1="68" x2="27" y2="73" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="68" y1="68" x2="73" y2="73" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />

        {/* Horizontal Ray Marks */}
        <line x1="22" y1="50" x2="16" y2="50" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="78" y1="50" x2="84" y2="50" stroke={iconColor} strokeWidth="4.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <span
          className={`font-serif-title font-semibold tracking-tight ${textColor} ${textSizes[size]}`}
          style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
        >
          Moments
        </span>
      )}
    </div>
  );
};
