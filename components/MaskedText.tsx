import React from 'react';
import { Lock } from 'lucide-react';

interface MaskedTextProps {
  text: string;
  isUnlocked: boolean;
  onUnlock: () => void;
  previewLength?: number; // プレビューで表示する文字数（パーセンテージ）
}

const MaskedText: React.FC<MaskedTextProps> = ({ 
  text, 
  isUnlocked, 
  onUnlock,
  previewLength = 70 
}) => {
  const previewChars = Math.floor((text.length * previewLength) / 100);
  const previewText = text.substring(0, previewChars);
  const hiddenText = text.substring(previewChars);

  if (isUnlocked) {
    return <span>{text}</span>;
  }

  return (
    <span className="inline">
      <span className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base">
        {previewText}
      </span>
      <button
        onClick={onUnlock}
        className="relative inline-block ml-1 group cursor-pointer align-middle my-1"
        type="button"
        title="公式LINEに登録して続きを見る"
      >
        <span 
          className="relative z-0 inline-block px-4 py-2 rounded-md text-transparent select-none font-sans"
          style={{
            background: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 4px, #94a3b8 4px, #94a3b8 8px)',
            filter: 'blur(3px)',
            minWidth: '80px',
            minHeight: '1.5em',
            fontSize: 'inherit',
            lineHeight: 'inherit',
          }}
        >
          {hiddenText.substring(0, Math.min(20, hiddenText.length))}
          {hiddenText.length > 20 && '...'}
        </span>
        <div 
          className="absolute inset-0 rounded-md opacity-90 group-hover:opacity-100 transition-all flex items-center justify-center border-2 border-dashed border-gray-400 group-hover:border-tiffany-500"
          style={{
            background: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 4px, #94a3b8 4px, #94a3b8 8px)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 2s linear infinite',
          }}
        >
          <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-1.5 rounded-md shadow-md border border-gray-200 group-hover:border-tiffany-300 group-hover:bg-white transition-all">
            <Lock className="w-4 h-4 text-tiffany-600 group-hover:text-tiffany-700 transition-colors relative z-10" />
            <span className="text-xs text-gray-600 group-hover:text-tiffany-700 font-semibold relative z-10 whitespace-nowrap">続きを見る</span>
          </div>
        </div>
      </button>
    </span>
  );
};

export default MaskedText;

