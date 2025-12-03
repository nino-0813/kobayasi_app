import { MayanSign, FortuneResult } from '../types';

/**
 * API Route経由でマヤ暦の鑑定結果を生成
 * APIキーはサーバーサイドでのみ使用され、フロントエンドには露出しません
 */
export const generateMayanFortune = async (sign: MayanSign): Promise<FortuneResult> => {
  try {
    // VercelのAPI Routeにリクエスト
    const response = await fetch('/api/fortune', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sign),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const fortuneResult: FortuneResult = await response.json();
    return fortuneResult;
  } catch (error) {
    console.error('API Error:', error);
    // エラー時のフォールバック
    return {
      catchyTitle: '魂が目覚める、運命の刻',
      powerWord: '天真爛漫の才',
      personality:
        'あなたの中に眠るのは、周囲を自然と幸福にする太陽のような輝きです。その優しさと強さは、多くの人々の道しるべとなるでしょう。',
      mission: '愛と光を体現し、世界に調和をもたらすこと。',
      energyAdvice: '美しい音楽を聴きながら、ハーブティーを楽しむ時間を持ってください。',
      luckyAction: 'お気に入りの靴を丁寧に磨くこと',
    };
  }
};
