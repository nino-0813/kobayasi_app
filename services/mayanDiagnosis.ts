import { MayanSign } from '../types';
import { SOLAR_SEALS } from './mayanChara';
import { GALACTIC_TONES } from './mayanTone';

export interface DiagnosisData {
  essence: string; // 生まれ持った本質
  strength: string; // 強み
  shadow: string; // 陥りやすい状態
  misalignment: string; // 今のズレ（なぜ苦しいか）
  phase: string; // 今のテーマ（人生フェーズ）
  action: string; // 今日の一言アクション
}

/**
 * マヤ暦から診断データを生成
 * 「売れる診断」の構造：本質、ズレ、テーマ、アクション
 */
export function diagnoseMayan(sign: MayanSign, age: number): DiagnosisData {
  const seal = SOLAR_SEALS.find(s => s.ja === sign.solarSealNameJa);
  const tone = GALACTIC_TONES.find(t => t.number === sign.toneNumber);

  let misalignment = "";

  if (seal && tone) {
    // 年齢とToneの組み合わせでズレを判定
    if (tone.number <= 3 && age > 30) {
      misalignment =
        "本来はまだ試行錯誤していい時期なのに、責任を背負いすぎています。「ちゃんとしなきゃ」と思いすぎていませんか？";
    } else if (tone.number >= 10 && age < 25) {
      misalignment =
        "結果を出そうと焦りすぎて、本来の流れを早めすぎています。もっと試行錯誤していい時期です。";
    } else if (tone.number >= 7 && tone.number <= 9 && age < 30) {
      misalignment =
        "統合や完成を意識しすぎて、まだ動きながら学ぶ時期を飛ばそうとしています。プロセスを大切にしてください。";
    } else if (tone.number <= 3 && age >= 40) {
      misalignment =
        "本来は方向性を定める時期なのに、過去の経験に縛られすぎています。新しい視点を取り入れてみてください。";
    } else {
      misalignment =
        "本質と現実の使い方に小さなズレが出ています。自分の感覚を後回しにしていませんか？";
    }
  }

  return {
    essence: seal?.essence || "",
    strength: seal?.strength || "",
    shadow: seal?.shadow || "",
    misalignment: misalignment || "本質と現実の使い方に小さなズレが出ています。",
    phase: tone?.message || "",
    action: seal?.advice || "",
  };
}

