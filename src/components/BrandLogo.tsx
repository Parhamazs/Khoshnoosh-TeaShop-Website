import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'green' | 'light' | 'gold';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "w-9 h-9",
  variant = 'green',
}) => {
  // Color presets
  const isLight = variant === 'light';
  const cupFill = isLight ? '#FFFFFF' : '#4F6F52';
  const cupStroke = isLight ? '#FEFAE0' : '#2A3E2D';
  const leafColor = isLight ? '#DDA15E' : '#A9B388';
  const leafSproutColor = isLight ? '#FEFAE0' : '#E8ECE0';
  const steamColor = isLight ? '#FEFAE0' : '#8FA374';

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Steam waves rising from the rim (بخار ملایم با انحنای طبیعی) */}
        <g stroke={steamColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          {/* Left steam stream */}
          <path d="M38 24 C34 18 42 14 38 8" className="animate-pulse" />
          {/* Center steam stream (higher) */}
          <path d="M50 20 C46 14 54 10 50 4" />
          {/* Right steam stream */}
          <path d="M62 24 C66 18 58 14 62 8" className="animate-pulse" />
        </g>

        {/* Teacup Saucer (نعلبکی زیر فنجان) */}
        <path
          d="M16 80 C36 86 64 86 84 80"
          stroke={cupStroke}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M24 82 C40 87 60 87 76 82"
          stroke={leafColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Teacup Body (بدنه فنجان با لبه ملایم و فرم سرامیکی ارگونومیک) */}
        <path
          d="M23 32 H77 C77 64 68 76 50 76 C32 76 23 64 23 32 Z"
          fill={cupFill}
          stroke={cupStroke}
          strokeWidth="3"
        />

        {/* Teacup Handle (دسته فنجان) */}
        <path
          d="M77 40 C89 40 92 56 77 62"
          stroke={cupStroke}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Sprouting seedling leaf drawn on the front of the cup (برگ نهال با جوانه لطیف روی فنجان) */}
        <g transform="translate(0, 2)">
          {/* Sprout stem */}
          <path
            d="M50 64 C50 56 49 50 48 44"
            stroke={leafSproutColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Main seedling leaf (right leaf) */}
          <path
            d="M48 48 C56 46 62 40 60 36 C55 36 49 41 48 48 Z"
            fill={leafColor}
            stroke={leafSproutColor}
            strokeWidth="1.2"
          />
          {/* Second small budding leaf (left sprout) */}
          <path
            d="M49 53 C43 51 38 46 39 42 C44 43 48 48 49 53 Z"
            fill={leafSproutColor}
            opacity="0.95"
          />
        </g>
      </svg>
    </div>
  );
};
