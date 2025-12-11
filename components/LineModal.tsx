import React from 'react';
import { X, MessageCircle, ExternalLink } from 'lucide-react';

interface LineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: () => void;
  lineUrl: string;
}

const LineModal: React.FC<LineModalProps> = ({ isOpen, onClose, onRegistered, lineUrl }) => {
  if (!isOpen) return null;

  const handleLineClick = () => {
    window.open(lineUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#06C755] rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            続きを見るには
          </h2>
          <p className="text-gray-600 text-sm">
            公式LINEに登録して<br />
            鑑定結果の全文を確認しましょう
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
          <p className="text-sm text-gray-500 mb-4">QRコードをスキャンするか、下のボタンから登録</p>
          <div className="flex justify-center mb-4">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(lineUrl)}`}
              alt="LINE QR Code"
              className="w-48 h-48 border-4 border-white rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLineClick}
            className="w-full bg-[#06C755] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#05B84A] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>公式LINEを開く</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={onRegistered}
            className="w-full bg-gradient-to-r from-tiffany-500 to-tiffany-600 text-white font-medium py-3 px-4 rounded-lg hover:from-tiffany-600 hover:to-tiffany-700 transition-all shadow-lg"
          >
            登録しました
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          ※ 登録後、「登録しました」ボタンを押してください
        </p>
      </div>
    </div>
  );
};

export default LineModal;

