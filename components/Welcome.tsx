import React from 'react';
import { Star, Sparkles, ChevronRight, Moon } from 'lucide-react';
import { calculateMoonPhase } from '../services/moonPhase';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const moonPhase = calculateMoonPhase();
  
  // リアルな月の満ち欠けをSVGで描画
  const renderMoonIcon = () => {
    const { phase, illumination, age } = moonPhase;
    const size = 80;
    const center = size / 2;
    const radius = size / 2 - 4;
    
    // 満ち欠けの方向を判定
    const isWaxing = age < 14.77; // 新月から満月へ
    
    // 影のオフセットを計算（より正確な計算）
    // 照度に基づいて影の位置を計算
    // 照度が0.5（半月）のとき、影のオフセットは0になる
    const shadowRatio = 1 - illumination;
    // より正確な影の位置計算
    const shadowOffset = radius * (shadowRatio - 0.5) * 2;
    
    // 月の表面のテクスチャ用のグラデーション
    const moonGradientId = `moon-gradient-${phase}`;
    const shadowGradientId = `shadow-gradient-${phase}`;
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        <defs>
          {/* 月の表面のグラデーション */}
          <radialGradient id={moonGradientId} cx="50%" cy="40%">
            <stop offset="0%" stopColor="#E8E8E8" stopOpacity="1" />
            <stop offset="50%" stopColor="#C0C0C0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.8" />
          </radialGradient>
          
          {/* 影のグラデーション */}
          <linearGradient id={shadowGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(240, 252, 252, 1)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgba(240, 252, 252, 0.8)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgba(200, 200, 200, 0.3)" stopOpacity="0.3" />
          </linearGradient>
          
          {/* 月のクリッピングパス */}
          <clipPath id={`moon-clip-${phase}`}>
            <circle cx={center} cy={center} r={radius} />
          </clipPath>
        </defs>
        
        {/* 月の本体（グラデーションでリアルな質感） */}
        {phase !== 'new' && (
          <g clipPath={`url(#moon-clip-${phase})`}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill={`url(#${moonGradientId})`}
              className="transition-all duration-500"
            />
            
            {/* 月のクレーターのようなテクスチャ（小さな円で表現） */}
            {[0.3, 0.5, 0.7].map((x, i) => (
              [0.3, 0.5, 0.7].map((y, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={center + (x - 0.5) * radius * 1.2}
                  cy={center + (y - 0.5) * radius * 1.2}
                  r={radius * 0.08}
                  fill="rgba(160, 160, 160, 0.3)"
                  opacity={0.4}
                />
              ))
            ))}
          </g>
        )}
        
        {/* 満ち欠けの影（より正確な描画） */}
        {phase !== 'new' && phase !== 'full' && (
          <g clipPath={`url(#moon-clip-${phase})`}>
            {isWaxing ? (
              // 新月から満月へ（右側が明るい、左側に影）
              <ellipse
                cx={center - shadowOffset / 2}
                cy={center}
                rx={Math.abs(shadowOffset) / 2}
                ry={radius}
                fill={`url(#${shadowGradientId})`}
                opacity={0.95}
              />
            ) : (
              // 満月から新月へ（左側が明るい、右側に影）
              <ellipse
                cx={center + shadowOffset / 2}
                cy={center}
                rx={Math.abs(shadowOffset) / 2}
                ry={radius}
                fill={`url(#${shadowGradientId})`}
                opacity={0.95}
              />
            )}
          </g>
        )}
        
        {/* 新月の場合は非常に薄く表示 */}
        {phase === 'new' && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="rgba(200, 200, 200, 0.1)"
            stroke="rgba(200, 200, 200, 0.3)"
            strokeWidth="1"
            className="transition-opacity duration-500"
          />
        )}
        
        {/* 満月の場合は明るく表示（ハイライト追加） */}
        {phase === 'full' && (
          <>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill={`url(#${moonGradientId})`}
              className="transition-opacity duration-500"
            />
            {/* 満月のハイライト */}
            <ellipse
              cx={center - radius * 0.2}
              cy={center - radius * 0.2}
              rx={radius * 0.3}
              ry={radius * 0.2}
              fill="rgba(255, 255, 255, 0.4)"
              opacity={0.6}
            />
          </>
        )}
      </svg>
    );
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 relative">
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating stars with different animations */}
        {[
          { size: 'w-3 h-3', top: '10%', left: '15%', animName: 'starFloat1', duration: '8s', delay: '0s' },
          { size: 'w-2 h-2', top: '20%', left: '80%', animName: 'starFloat2', duration: '10s', delay: '1s' },
          { size: 'w-4 h-4', top: '35%', left: '25%', animName: 'starFloat3', duration: '12s', delay: '2s' },
          { size: 'w-2.5 h-2.5', top: '50%', left: '70%', animName: 'starFloat4', duration: '9s', delay: '0.5s' },
          { size: 'w-3.5 h-3.5', top: '65%', left: '10%', animName: 'starFloat5', duration: '11s', delay: '1.5s' },
          { size: 'w-2 h-2', top: '75%', left: '85%', animName: 'starFloat1', duration: '8s', delay: '2.5s' },
          { size: 'w-3 h-3', top: '85%', left: '40%', animName: 'starFloat2', duration: '10s', delay: '1s' },
          { size: 'w-2.5 h-2.5', top: '5%', left: '50%', animName: 'starFloat3', duration: '12s', delay: '0s' },
          { size: 'w-3 h-3', top: '30%', left: '90%', animName: 'starFloat4', duration: '9s', delay: '1.5s' },
          { size: 'w-2 h-2', top: '60%', left: '5%', animName: 'starFloat5', duration: '11s', delay: '2s' },
          { size: 'w-4 h-4', top: '40%', left: '60%', animName: 'starFloat1', duration: '8s', delay: '0.5s' },
          { size: 'w-2.5 h-2.5', top: '15%', left: '35%', animName: 'starFloat2', duration: '10s', delay: '1.5s' },
          { size: 'w-3 h-3', top: '55%', left: '95%', animName: 'starFloat3', duration: '12s', delay: '0s' },
          { size: 'w-2 h-2', top: '70%', left: '30%', animName: 'starFloat4', duration: '9s', delay: '2s' },
          { size: 'w-3.5 h-3.5', top: '25%', left: '55%', animName: 'starFloat5', duration: '11s', delay: '1s' },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animation: `${star.animName} ${star.duration} ease-in-out infinite, starTwinkle 3s ease-in-out infinite`,
              animationDelay: star.delay,
              opacity: 0.25,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#0ABAB5]"
              style={{ filter: 'drop-shadow(0 0 2px rgba(10, 186, 181, 0.3))' }}
            >
              <path
                d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                fill="currentColor"
                style={{ 
                  animation: `starRotate ${15 + i * 2}s linear infinite`,
                  transformOrigin: 'center'
                }}
              />
            </svg>
          </div>
        ))}
        
        {/* Smaller twinkling stars */}
        {[
          { top: '8%', left: '22%', delay: '0s' },
          { top: '18%', left: '65%', delay: '0.3s' },
          { top: '28%', left: '45%', delay: '0.6s' },
          { top: '42%', left: '12%', delay: '0.9s' },
          { top: '48%', left: '78%', delay: '1.2s' },
          { top: '58%', left: '35%', delay: '1.5s' },
          { top: '68%', left: '88%', delay: '1.8s' },
          { top: '78%', left: '18%', delay: '2.1s' },
          { top: '88%', left: '72%', delay: '2.4s' },
          { top: '12%', left: '88%', delay: '0.2s' },
          { top: '38%', left: '32%', delay: '0.5s' },
          { top: '52%', left: '55%', delay: '0.8s' },
          { top: '62%', left: '15%', delay: '1.1s' },
          { top: '72%', left: '65%', delay: '1.4s' },
          { top: '82%', left: '42%', delay: '1.7s' },
        ].map((star, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-1.5 h-1.5"
            style={{
              top: star.top,
              left: star.left,
              animation: 'starTwinkle 3s ease-in-out infinite',
              animationDelay: star.delay,
              opacity: 0.2,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#0ABAB5]"
            >
              <path
                d="M12 2L13.5 6.5L18 8L13.5 9.5L12 14L10.5 9.5L6 8L10.5 6.5L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 text-center animate-fade-in">
        
        {/* Top Badges (Like Photo 2) */}
        <div className="flex justify-center items-center gap-2 mb-6 animate-float">
          <div className="relative">
            <div className="bg-[#0ABAB5] text-white text-xs md:text-sm font-serif py-1 px-4 rounded-sm shadow-md relative z-10 tracking-widest">
              信頼と実績
            </div>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 bg-[#008B8B] transform rotate-45 z-0"></div>
          </div>
          <div className="relative">
             <div className="bg-rose-500 text-white text-xs md:text-sm font-serif py-1 px-4 rounded-sm shadow-md tracking-widest">
               人生が変わる
             </div>
          </div>
        </div>

        {/* Title Section with Ribbon feeling */}
        <div className="mb-10 relative">
          <h2 className="text-tiffany-500 tracking-[0.2em] text-sm md:text-base font-bold mb-4 font-sans uppercase">
            Mayan Calendar Astrology
          </h2>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 leading-tight drop-shadow-sm">
            <span className="block text-2xl md:text-3xl mb-2 text-gray-600 font-medium">運命を紐解く</span>
            マヤ暦鑑定
          </h1>
          
          {/* Moon Phase Display */}
          <div className="flex flex-col items-center justify-center mt-8 gap-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                {renderMoonIcon()}
              </div>
              <div className="text-left">
                <div className="text-base md:text-lg font-serif text-gray-700 font-medium mb-1">
                  {moonPhase.name}
                </div>
                <div className="text-xs md:text-sm font-sans text-gray-500">
                  月齢 {moonPhase.age}日
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catch Copy Area */}
        <div className="glass-card p-6 md:p-8 rounded-lg mb-10 max-w-2xl mx-auto border-t-4 border-t-tiffany-500 shadow-lg">
          <p className="text-gray-800 font-serif leading-relaxed text-base md:text-lg font-medium">
            古代マヤの叡智が、<br className="md:hidden" />あなたの<span className="text-rose-600 font-bold border-b-2 border-rose-400">魂の刻印</span>を呼び覚ます。<br/>
            本当の自分に出会う旅へ、ようこそ。
          </p>
        </div>

        {/* Luxurious Button */}
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-12 md:px-16 py-4 md:py-5 overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#0ABAB5] to-[#008B8B] rounded-full shadow-[0_15px_35px_rgba(10,186,181,0.6),0_5px_15px_rgba(10,186,181,0.4)] border-2 border-white/40 active:scale-95 md:hover:shadow-[0_20px_45px_rgba(10,186,181,0.8),0_8px_20px_rgba(10,186,181,0.5)] md:hover:-translate-y-1 w-full max-w-sm scale-105"
        >
          <span className="absolute inset-0 bg-white/25 group-active:bg-white/35 md:group-hover:bg-white/35 transition-all duration-300"></span>
          <span className="relative flex items-center font-serif text-white text-lg md:text-xl font-bold tracking-widest drop-shadow-lg">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 animate-pulse" />
            鑑定を始める
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-active:translate-x-1 md:group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        
        <p className="mt-8 text-gray-500 text-xs md:text-sm font-sans tracking-wider">
          ※ 結果は全てポジティブなメッセージで構成されています
        </p>

      </div>
    </div>
  );
};

export default Welcome;