import React, { useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface InputFormProps {
  onSubmit: (date: Date) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [year, setYear] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [day, setDay] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year && month && day) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      onSubmit(date);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const selectClass = "w-full appearance-none bg-white border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded-none focus:outline-none focus:border-tiffany-500 focus:ring-1 focus:ring-tiffany-500 text-center font-serif text-lg shadow-sm transition-all cursor-pointer hover:border-tiffany-300";

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in px-4">
      <div className="glass-card rounded-sm p-10 md:p-14 relative overflow-hidden shadow-2xl">
        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-luxury-gold opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-luxury-gold opacity-50"></div>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
             <Calendar className="w-8 h-8 text-tiffany-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-3 tracking-wider">
            生年月日を入力
          </h2>
          <div className="w-10 h-0.5 bg-luxury-gold mx-auto mb-4"></div>
          <p className="text-gray-500 font-sans text-sm leading-relaxed">
            あなたがこの世に生を受けた日。<br/>
            そこに刻まれた暗号を解読します。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 text-center">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Year</label>
              <div className="relative">
                <select 
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className={selectClass}
                  style={{ borderRadius: '4px' }}
                >
                  <option value="" disabled>-</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Month</label>
              <div className="relative">
                <select 
                  required
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className={selectClass}
                  style={{ borderRadius: '4px' }}
                >
                  <option value="" disabled>-</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Day</label>
              <div className="relative">
                <select 
                  required
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className={selectClass}
                  style={{ borderRadius: '4px' }}
                >
                  <option value="" disabled>-</option>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full group bg-gray-900 text-white font-serif py-4 rounded-sm shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center text-lg tracking-widest border border-gray-900"
          >
            <span>鑑定結果を見る</span>
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-luxury-gold" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;