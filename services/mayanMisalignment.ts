import { ConcernType } from "../types/Concern";

/**
 * 悩み別ズレ判定ロジック
 * 同じマヤ暦でも、悩みが違えば刺さる指摘が変わる
 */
export function getMisalignmentByConcern(
  concern: ConcernType,
  sealShadow: string,
  toneNumber: number,
  age: number
): string {
  switch (concern) {
    case "work":
      if (toneNumber <= 3 && age >= 30) {
        return "本来は試しながら方向性を探していい時期なのに、早く結果を出そうとしすぎています。";
      }
      return `仕事面では、${sealShadow}が原因で本来の力を発揮しきれていないようです。`;

    case "money":
      if (toneNumber >= 9 && age < 30) {
        return "まだ積み上げの時期なのに、収入の結果だけを急ぎすぎています。";
      }
      return `お金に関して、${sealShadow}がブレーキになっている可能性があります。`;

    case "relationship":
      return `人間関係では、${sealShadow}が強く出て、無理に合わせすぎているように見えます。`;

    case "action":
      if (toneNumber === 1 || toneNumber === 2) {
        return "今は迷いが出やすい流れなので、行動できなくて当然の時期です。";
      }
      return `行動が止まりやすいのは、${sealShadow}を一人で抱え込んでいるからかもしれません。`;

    default:
      return "本質と現実の使い方に小さなズレが出ています。";
  }
}

