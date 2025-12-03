import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const messages = [
    "星の配置を読み解いています...",
    "古代の叡智にアクセス中...",
    "あなたの魂の輝きを抽出しています...",
    "まもなく鑑定結果が出ます..."
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 animate-fade-in">
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 border border-tiffany-200 rounded-full"></div>
        <div className="absolute inset-0 border-t-2 border-luxury-gold rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-luxury-gold text-xs font-serif tracking-widest">
          KIN
        </div>
      </div>
      
      <h2 className="text-xl font-serif text-gray-700 mb-3 tracking-widest">
        Now Loading...
      </h2>
      
      <p className="text-gray-400 font-sans text-sm animate-pulse">
        {messages[msgIndex]}
      </p>
    </div>
  );
};

export default Loading;