import React, { useRef } from 'react';
import { MayanSign, FortuneResult } from '../types';
import { Star, Zap, Heart, RefreshCw, Quote, Feather, Gift, Clock, MessageCircle, ExternalLink } from 'lucide-react';

interface ResultViewProps {
  sign: MayanSign;
  fortune: FortuneResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ sign, fortune, onReset }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-5xl mx-auto pb-8 md:pb-12 animate-fade-in px-3 md:px-4">
      
      {/* Certificate-like Container */}
      <div ref={certificateRef} className="bg-white relative shadow-2xl overflow-hidden md:p-12 p-4 md:p-6 border-4 md:border-8 border-double border-gray-100">
        
        {/* Decorative Borders */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-luxury-gold"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-luxury-gold"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-luxury-gold"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-luxury-gold"></div>

        {/* Header */}
        <div className="text-center mb-12 relative z-10">
           <div className="inline-block border-b-2 border-luxury-gold pb-1 mb-6">
              <span className="text-luxury-gold font-serif text-sm tracking-[0.3em] uppercase">Mayan Astrology Certificate</span>
           </div>
           
           <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight md:leading-normal px-2">
             {fortune.catchyTitle}
           </h1>
           
           <div className="flex justify-center mt-6">
             <div className="bg-tiffany-50 px-8 py-3 rounded-full border border-tiffany-200 flex items-center shadow-sm">
                <Feather className="w-5 h-5 text-tiffany-500 mr-3" />
                <span className="text-gray-600 font-sans text-sm mr-2">あなたの称号</span>
                <span className="text-xl md:text-2xl font-serif font-bold text-gray-800 tracking-widest border-b border-gray-300 pb-1">
                  {fortune.powerWord}
                </span>
             </div>
           </div>
        </div>

        {/* KIN Info Row */}
        <div className="bg-gray-50 border border-gray-100 p-5 md:p-8 mb-8 md:mb-10 flex flex-col md:flex-row justify-around items-center gap-5 md:gap-0">
           <div className="text-center">
              <p className="text-xs md:text-xs text-gray-500 font-sans tracking-widest uppercase mb-2">KIN Number</p>
              <p className="text-3xl md:text-4xl font-serif text-luxury-golddark font-bold">{sign.kin}</p>
           </div>
           <div className="h-px w-full md:w-px md:h-12 bg-gray-300"></div>
           <div className="text-center">
              <p className="text-xs md:text-xs text-gray-500 font-sans tracking-widest uppercase mb-2">Solar Seal</p>
              <p className="text-xl md:text-2xl font-serif text-gray-900 font-bold">{sign.solarSealNameJa}</p>
              <p className="text-xs md:text-xs text-tiffany-600 font-sans mt-1">{sign.solarSealNameEn}</p>
           </div>
           <div className="h-px w-full md:w-px md:h-12 bg-gray-300"></div>
           <div className="text-center">
              <p className="text-xs md:text-xs text-gray-500 font-sans tracking-widest uppercase mb-2">Galactic Tone</p>
              <p className="text-xl md:text-2xl font-serif text-gray-900 font-bold">{sign.toneNameJa}</p>
              <p className="text-xs md:text-xs text-tiffany-600 font-sans mt-1">Tone {sign.toneNumber}</p>
           </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-10 mb-8 md:mb-10">
           
           {/* 生まれ持った本質 */}
           <div className="relative">
              <div className="flex items-center mb-4">
                 <div className="p-2 bg-tiffany-100 rounded-full mr-3">
                   <Star className="w-5 h-5 text-tiffany-500" />
                 </div>
                 <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 flex-grow">
                   生まれ持った本質（変わらない軸）
                 </h3>
              </div>
              <p className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base text-justify">
                {fortune.essence}
              </p>
           </div>

           {/* 今のズレ */}
           <div className="relative">
              <div className="flex items-center mb-4">
                 <div className="p-2 bg-rose-100 rounded-full mr-3">
                   <Zap className="w-5 h-5 text-rose-500" />
                 </div>
                 <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 flex-grow">
                   今のズレ（なぜ苦しいか）
                 </h3>
              </div>
              <p className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base text-justify">
                {fortune.misalignment}
              </p>
           </div>

           {/* 今のテーマ */}
           <div className="relative">
              <div className="flex items-center mb-4">
                 <div className="p-2 bg-blue-100 rounded-full mr-3">
                   <Heart className="w-5 h-5 text-blue-500" />
                 </div>
                 <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 flex-grow">
                   今のテーマ（人生フェーズ）
                 </h3>
              </div>
              <p className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base text-justify">
                {fortune.phase}
              </p>
           </div>

        </div>

        {/* Action Section */}
        <div className="bg-tiffany-50 p-6 md:p-10 border border-tiffany-100 relative overflow-hidden">
           <Quote className="absolute top-4 left-4 w-8 h-8 md:w-10 md:h-10 text-tiffany-200 transform rotate-180" />
           
           <div className="relative z-10">
              <div className="bg-white p-5 md:p-6 shadow-sm border border-white rounded-lg mb-6">
                 <h4 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4 text-center">今日の一言アクション</h4>
                 <p className="text-lg md:text-xl font-serif text-center text-gray-900 font-medium">
                    {fortune.action}
                 </p>
              </div>
              
              {/* 個別診断への導線 */}
              {fortune.guidance && (
                <div className="bg-gradient-to-r from-tiffany-100 to-tiffany-50 p-5 md:p-6 rounded-lg border border-tiffany-200">
                  <p className="text-gray-800 font-sans leading-relaxed text-base md:text-lg text-center font-medium">
                    {fortune.guidance}
                  </p>
                </div>
              )}
           </div>
        </div>

      </div>

      {/* LINE誘導セクション */}
      <div className="mt-8 md:mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-gray-200">
        {/* 限定クーポンバッジ */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 border-2 border-white animate-pulse-strong relative overflow-hidden group cursor-pointer">
            {/* 光るエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Gift className="w-5 h-5 md:w-6 md:h-6 animate-bounce relative z-10" style={{ animationDuration: '1.5s' }} />
            <span className="font-bold text-base md:text-lg font-sans tracking-wide relative z-10 animate-wiggle">限定クーポン</span>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="text-center mb-6">
          <h3 className="text-gray-900 font-serif font-bold text-xl md:text-2xl mb-4">
            公式LINE登録でセッション時間が延長！
          </h3>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="bg-gray-100 px-5 py-3 rounded-lg border-2 border-gray-300">
              <div className="text-gray-500 text-xs font-sans mb-1">通常</div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-bold text-lg line-through">45分</span>
              </div>
            </div>
            <div className="text-gray-400 text-2xl font-bold">→</div>
            <div className="bg-gradient-to-br from-[#06C755] to-[#05B84A] px-5 py-3 rounded-lg shadow-lg border-2 border-[#06C755]">
              <div className="text-white text-xs font-sans mb-1 font-bold">クーポン適用</div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-xl">60分</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed">
            公式LINEに登録すると、<br className="md:hidden" />
            <span className="font-bold text-gray-900">+15分のセッション時間</span>が無料で追加されます
          </p>
        </div>

        {/* LINE登録ボタン */}
        <a
          href="https://lin.ee/kJbTRkJ"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#06C755] text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-[#05B84A] transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg group border-2 border-[#06C755]"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          <span>公式LINEを友だち追加する</span>
          <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-gray-500 text-xs text-center mt-4 font-sans">
          ※ クーポンコードはLINE登録後に自動で送信されます
        </p>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={onReset}
          className="inline-flex items-center px-8 py-3 text-gray-500 hover:text-gray-800 font-serif text-sm transition-colors border-b border-transparent hover:border-gray-400"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          鑑定を終了してトップへ戻る
        </button>
      </div>

    </div>
  );
};

export default ResultView;
