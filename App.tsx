import React, { useState } from 'react';
import Welcome from './components/Welcome';
import InputForm from './components/InputForm';
import Loading from './components/Loading';
import ResultView from './components/ResultView';
import { calculateMayanSign } from './services/mayanCalc';
import { generateMayanFortune } from './services/geminiService';
import { AppState, MayanSign, FortuneResult } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [mayanSign, setMayanSign] = useState<MayanSign | null>(null);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);

  const handleStart = () => {
    setAppState(AppState.INPUT);
  };

  const handleDateSubmit = async (date: Date) => {
    try {
      setAppState(AppState.LOADING);
      
      const sign = calculateMayanSign(date);
      setMayanSign(sign);

      const fortuneResult = await generateMayanFortune(sign);
      setFortune(fortuneResult);
      
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Error generating fortune", error);
      alert("申し訳ございません。通信エラーが発生しました。もう一度お試しください。");
      setAppState(AppState.INPUT);
    }
  };

  const handleReset = () => {
    setAppState(AppState.WELCOME);
    setMayanSign(null);
    setFortune(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-tiffany-200 selection:text-tiffany-900">
      
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Gradient Spot */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-tiffany-200 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-tiffany-100 rounded-full blur-[120px] opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-3 md:px-4 py-6 md:py-12 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header Logo (Small) - Only visible on non-welcome screens */}
        {appState !== AppState.WELCOME && (
           <div className="absolute top-6 left-0 w-full text-center opacity-50 mb-8 pointer-events-none">
              <span className="text-xs tracking-[0.3em] font-serif uppercase text-gray-400">Sunrise Soul Mayan Astrology</span>
           </div>
        )}

        {appState === AppState.WELCOME && (
          <Welcome onStart={handleStart} />
        )}

        {appState === AppState.INPUT && (
          <InputForm onSubmit={handleDateSubmit} />
        )}

        {appState === AppState.LOADING && (
          <Loading />
        )}

        {appState === AppState.RESULT && mayanSign && fortune && (
          <ResultView 
            sign={mayanSign} 
            fortune={fortune} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  );
};

export default App;