import { MayanSign, FortuneResult } from '../types';
import { ConcernType } from '../types/Concern';
import { buildDiagnosis } from './mayanDiagnosisBuilder';

/**
 * API Route経由でマヤ暦の鑑定結果を生成
 * APIキーはサーバーサイドでのみ使用され、フロントエンドには露出しません
 */
export const generateMayanFortune = async (sign: MayanSign, age: number, concern: ConcernType): Promise<FortuneResult> => {
  try {
    // 診断データを生成（20紋章 × 音 × 悩み別ズレ判定を完全に固定）
    const diagnosis = buildDiagnosis(sign, age, concern);
    
    // VercelのAPI Routeにリクエスト
    const response = await fetch('/api/fortune', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sign, age, concern, diagnosis }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const fortuneResult: FortuneResult = await response.json();
    return fortuneResult;
  } catch (error) {
    console.error('API Error:', error);
    console.log('Using fallback diagnosis result');
    // エラー時のフォールバック（診断データを使用）
    const diagnosis = buildDiagnosis(sign, age, concern);
    
    // より詳細で「変わった」と感じられるフォールバック結果
    const fallbackResult: FortuneResult = {
      catchyTitle: '魂が目覚める、運命の刻',
      powerWord: '天真爛漫の才',
      essence: `あなたは本来、${diagnosis.seal.essence}。${diagnosis.seal.strength}。ただ、${diagnosis.seal.shadow}かもしれません。この本質は、あなたが生まれ持った変わらない軸です。周囲の人々は、あなたのこの特性に自然と引き寄せられ、安心感を得ています。困難な状況でも、あなたの存在そのものが周囲に希望の光を灯す力を持っているのです。`,
      misalignment: `ただ今は、${diagnosis.misalignment}本当はまだ、${diagnosis.tone.message}これはダメな状態ではなく、流れを整えれば自然に動き出す時期です。あなたが悪いわけではなく、ただ今の使い方に少しズレが出ているだけなのです。`,
      phase: `今のあなたの人生フェーズは、${diagnosis.tone.message}この時期は、あなたの本質を活かしながら、新しい可能性を探求していく時期なのです。完璧を求めず、動きながら学ぶことが大切です。`,
      action: `今日意識してほしいのは「${diagnosis.seal.advice}」`,
      guidance: 'もし「もっと具体的に知りたい」と感じたら、あなたの流れを個別で一緒に整理できます。',
    };
    
    console.log('Fallback result:', fallbackResult);
    return fallbackResult;
  }
};
