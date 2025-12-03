import React, { useRef } from 'react';
import { MayanSign, FortuneResult } from '../types';
import { Star, Zap, Heart, RefreshCw, Quote, Feather, Download, Share2, Twitter, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultViewProps {
  sign: MayanSign;
  fortune: FortuneResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ sign, fortune, onReset }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const shareText = `【マヤ暦占い】${fortune.catchyTitle}\n\nあなたの称号: ${fortune.powerWord}\nKIN番号: ${sign.kin}\n太陽の紋章: ${sign.solarSealNameJa}\n銀河の音: ${sign.toneNameJa}\n\n#マヤ暦 #マヤ暦占い #SunriseSoul`;

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `mayan-astrology-kin${sign.kin}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('画像のダウンロードに失敗しました。もう一度お試しください。');
    }
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareLINE = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert('リンクのコピーに失敗しました。');
    }
  };

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

        {/* Content Columns */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-10">
           
           {/* Personality */}
           <div className="relative">
              <div className="flex items-center mb-4">
                 <div className="p-2 bg-tiffany-100 rounded-full mr-3">
                   <Star className="w-5 h-5 text-tiffany-500" />
                 </div>
                 <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 flex-grow">
                   本質と才能
                 </h3>
              </div>
              <p className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base text-justify">
                {fortune.personality}
              </p>
           </div>

           {/* Mission */}
           <div className="relative">
              <div className="flex items-center mb-4">
                 <div className="p-2 bg-rose-100 rounded-full mr-3">
                   <Zap className="w-5 h-5 text-rose-500" />
                 </div>
                 <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 flex-grow">
                   魂のミッション
                 </h3>
              </div>
              <p className="text-gray-700 md:text-gray-600 font-sans leading-relaxed md:leading-loose text-base md:text-base text-justify">
                {fortune.mission}
              </p>
           </div>

        </div>

        {/* Advice Section */}
        <div className="bg-tiffany-50 p-6 md:p-10 border border-tiffany-100 relative overflow-hidden">
           <Quote className="absolute top-4 left-4 w-8 h-8 md:w-10 md:h-10 text-tiffany-200 transform rotate-180" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div>
                 <h3 className="text-tiffany-700 font-serif font-bold mb-3 md:mb-4 flex items-center text-base md:text-lg">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    エネルギーを高める秘訣
                 </h3>
                 <p className="text-gray-800 font-sans leading-relaxed text-base md:text-lg font-medium">
                    {fortune.energyAdvice}
                 </p>
              </div>
              <div className="bg-white p-5 md:p-6 shadow-sm border border-white rounded-lg">
                 <h4 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4 text-center">Todays Lucky Action</h4>
                 <p className="text-lg md:text-xl font-serif text-center text-gray-900 font-medium">
                    {fortune.luckyAction}
                 </p>
              </div>
           </div>
        </div>

      </div>

      {/* Share and Download Buttons */}
      <div className="mt-6 md:mt-8 flex flex-col items-center gap-3 md:gap-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full max-w-md">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-tiffany-500 to-tiffany-600 text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-200 flex-1 min-w-[140px] justify-center"
          >
            <Download className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="whitespace-nowrap">画像をダウンロード</span>
          </button>

          {/* Share Buttons */}
          <button
            onClick={handleShareTwitter}
            className="inline-flex items-center px-4 md:px-5 py-2.5 md:py-3 bg-[#1DA1F2] text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-200 flex-1 min-w-[100px] justify-center"
          >
            <Twitter className="w-4 h-4 mr-1.5 md:mr-2" />
            Twitter
          </button>

          <button
            onClick={handleShareFacebook}
            className="inline-flex items-center px-4 md:px-5 py-2.5 md:py-3 bg-[#1877F2] text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-200 flex-1 min-w-[100px] justify-center"
          >
            <Facebook className="w-4 h-4 mr-1.5 md:mr-2" />
            Facebook
          </button>

          <button
            onClick={handleShareLINE}
            className="inline-flex items-center px-4 md:px-5 py-2.5 md:py-3 bg-[#06C755] text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-200 flex-1 min-w-[100px] justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-1.5 md:mr-2" />
            LINE
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center px-4 md:px-5 py-2.5 md:py-3 bg-gray-600 text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-200 w-full justify-center"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1.5 md:mr-2" />
                コピーしました
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5 md:mr-2" />
                リンクをコピー
              </>
            )}
          </button>
        </div>
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
