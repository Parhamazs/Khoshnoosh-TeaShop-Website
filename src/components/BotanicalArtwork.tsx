import React from 'react';

interface Props {
  type: string;
  className?: string;
}

export const BotanicalArtwork: React.FC<Props> = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'gol-gavzaban-sonboltieb':
      // Borage Flower & Valerian (Violet / Ruby-Purple botanical motif)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#2E1F38] via-[#482E54] to-[#1F1524] ${className}`}>
          {/* Subtle concentric circles */}
          <div className="absolute w-48 h-48 rounded-full border border-purple-400/20 animate-pulse" />
          <div className="absolute w-32 h-32 rounded-full border border-pink-400/25" />
          {/* Glass teacup & herbal infusion silhouette */}
          <svg className="w-24 h-24 text-purple-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Cup */}
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#9D4EDD" fillOpacity="0.45" stroke="#E0AAFF" strokeWidth="2.5" />
            {/* Handle */}
            <path d="M75 42 C85 42 88 56 75 62" stroke="#E0AAFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Saucer */}
            <path d="M18 80 C35 86 65 86 82 80" stroke="#E0AAFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Steam spirals */}
            <path d="M42 28 C40 22 45 18 43 12" stroke="#E0AAFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M52 26 C54 20 50 16 53 10" stroke="#E0AAFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            {/* Dried Borage flower star */}
            <polygon points="50,44 53,52 61,52 55,57 57,65 50,60 43,65 45,57 39,52 47,52" fill="#C77DFF" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-purple-200/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            گل گاوزبان وحشی الموت
          </div>
        </div>
      );

    case 'chamomile-lavender-lemon-verbena':
      // Chamomile & Lavender (Warm herbal gold and gentle sage)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3D3A27] via-[#5C5332] to-[#242113] ${className}`}>
          <div className="absolute w-44 h-44 rounded-full border border-amber-300/20" />
          <svg className="w-24 h-24 text-amber-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#E9C46A" fillOpacity="0.4" stroke="#FFE3A8" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#FFE3A8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#FFE3A8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Chamomile blossom with center disc */}
            <circle cx="50" cy="54" r="7" fill="#F4A261" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Chamomile white petals */}
            <ellipse cx="50" cy="42" rx="3.5" ry="6" fill="#FFFFFF" fillOpacity="0.9" />
            <ellipse cx="50" cy="66" rx="3.5" ry="6" fill="#FFFFFF" fillOpacity="0.9" />
            <ellipse cx="38" cy="54" rx="6" ry="3.5" fill="#FFFFFF" fillOpacity="0.9" />
            <ellipse cx="62" cy="54" rx="6" ry="3.5" fill="#FFFFFF" fillOpacity="0.9" />
            {/* Lavender sprig */}
            <path d="M30 68 Q40 50 48 38" stroke="#B8A3D9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="34" cy="62" r="2" fill="#B8A3D9" />
            <circle cx="39" cy="54" r="2" fill="#B8A3D9" />
            <circle cx="44" cy="45" r="2" fill="#B8A3D9" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-amber-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            بابونه طلایی و اسطوخودوس
          </div>
        </div>
      );

    case 'saffron-ginger-cardamom':
      // Saffron & Ginger (Royal saffron crimson & warm ginger glow)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#4A1E14] via-[#6E2B16] to-[#2B110B] ${className}`}>
          <div className="absolute w-44 h-44 rounded-full border border-orange-400/20" />
          <svg className="w-24 h-24 text-amber-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#E76F51" fillOpacity="0.5" stroke="#F4A261" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#F4A261" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#F4A261" strokeWidth="2.5" strokeLinecap="round" />
            {/* Saffron threads stigmas */}
            <path d="M46 62 Q44 48 40 40" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 62 Q51 46 52 38" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />
            <path d="M54 62 Q58 49 61 41" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />
            {/* Cardamom pod outline */}
            <ellipse cx="60" cy="65" rx="5" ry="8" transform="rotate(30 60 65)" fill="#588157" stroke="#A3B18A" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-orange-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            زعفران نگین قائنات
          </div>
        </div>
      );

    case 'peppermint-fennel-digestive':
      // Peppermint & Fennel (Fresh herbal green)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1C3626] via-[#2D5A3C] to-[#13241A] ${className}`}>
          <div className="absolute w-44 h-44 rounded-full border border-emerald-400/20" />
          <svg className="w-24 h-24 text-emerald-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#52B788" fillOpacity="0.4" stroke="#74C69D" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" />
            {/* Mint leaves */}
            <path d="M50 50 C40 40 40 60 50 64 C60 60 60 40 50 50 Z" fill="#2D6A4F" stroke="#95D5B2" strokeWidth="1.5" />
            <path d="M50 50 L50 64" stroke="#95D5B2" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-emerald-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            نعناع فلفلی و رازیانه
          </div>
        </div>
      );

    case 'sour-hibiscus-barberry':
      // Sour Hibiscus & Barberry (Deep ruby crimson)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#4A1020] via-[#66162C] to-[#2D0A13] ${className}`}>
          <div className="absolute w-44 h-44 rounded-full border border-rose-400/20" />
          <svg className="w-24 h-24 text-rose-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#A4133C" fillOpacity="0.55" stroke="#FF4D6D" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#FF4D6D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#FF4D6D" strokeWidth="2.5" strokeLinecap="round" />
            {/* Hibiscus calyx petals */}
            <path d="M50 42 C44 48 42 56 50 62 C58 56 56 48 50 42 Z" fill="#800F2F" stroke="#FF758F" strokeWidth="1.5" />
            <circle cx="42" cy="62" r="3" fill="#C9184A" />
            <circle cx="58" cy="62" r="3" fill="#C9184A" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-rose-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            چای ترش سودانی و زرشک
          </div>
        </div>
      );

    case 'roasted-quince-cinnamon':
      // Roasted Quince & Cinnamon (Warm roasted amber/terracotta)
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#402315] via-[#5C3420] to-[#26150C] ${className}`}>
          <div className="absolute w-44 h-44 rounded-full border border-amber-500/20" />
          <svg className="w-24 h-24 text-amber-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#B05B3B" fillOpacity="0.5" stroke="#E07A5F" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cinnamon stick */}
            <line x1="38" y1="36" x2="62" y2="60" stroke="#6F3924" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="42" y1="36" x2="66" y2="60" stroke="#8A482D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-amber-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            میوه به روست شده با دارچین
          </div>
        </div>
      );

    case 'royal-herbal-gift-box':
      // Luxury Wooden Box
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#2E2018] via-[#483326] to-[#1E140F] ${className}`}>
          <svg className="w-24 h-24 text-amber-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <rect x="20" y="35" width="60" height="42" rx="3" fill="#6A4E38" stroke="#DDA15E" strokeWidth="2" />
            <line x1="20" y1="52" x2="80" y2="52" stroke="#DDA15E" strokeWidth="1.5" />
            <rect x="46" y="48" width="8" height="8" rx="1" fill="#DDA15E" stroke="#FEFAE0" strokeWidth="1" />
            {/* Decorative ribbon */}
            <path d="M50 35 L50 24 Q50 18 42 20 Q36 22 42 28 Q48 32 50 35" stroke="#DDA15E" strokeWidth="1.5" fill="none" />
            <path d="M50 35 L50 24 Q50 18 58 20 Q64 22 58 28 Q52 32 50 35" stroke="#DDA15E" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-amber-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            جعبه چوب گردوی دست‌ساز
          </div>
        </div>
      );

    default:
      // General botanical tea cup
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#2D3F33] via-[#455D4C] to-[#1F2C24] ${className}`}>
          <svg className="w-24 h-24 text-emerald-200" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M25 35 H75 C75 65 65 78 50 78 C35 78 25 65 25 35 Z" fill="#A9B388" fillOpacity="0.4" stroke="#C8D4A8" strokeWidth="2.5" />
            <path d="M75 42 C85 42 88 56 75 62" stroke="#C8D4A8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 80 C35 86 65 86 82 80" stroke="#C8D4A8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 46 C44 54 44 64 50 68 C56 64 56 54 50 46 Z" fill="#52796F" stroke="#C8D4A8" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-emerald-100/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            دمنوش دست‌چین خوشنوش
          </div>
        </div>
      );
  }
};
