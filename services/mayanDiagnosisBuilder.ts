import { MayanSign } from '../types';
import { ConcernType } from '../types/Concern';
import { SOLAR_SEALS, SolarSealData } from './mayanChara';
import { GALACTIC_TONES, GalacticToneData } from './mayanTone';
import { getMisalignmentByConcern } from './mayanMisalignment';

export interface DiagnosisData {
  seal: SolarSealData;
  tone: GalacticToneData;
  misalignment: string;
}

/**
 * 診断データを1つにまとめる
 * 20紋章 × 音 × 悩み別ズレ判定を完全に固定
 */
export function buildDiagnosis(
  sign: MayanSign,
  age: number,
  concern: ConcernType
): DiagnosisData {
  const seal = SOLAR_SEALS.find(s => s.ja === sign.solarSealNameJa);
  const tone = GALACTIC_TONES.find(t => t.number === sign.toneNumber);

  if (!seal || !tone) {
    throw new Error('Invalid Mayan sign data');
  }

  // 悩み別にズレ判定を切り替える
  const misalignment = getMisalignmentByConcern(
    concern,
    seal.shadow,
    tone.number,
    age
  );

  return {
    seal,
    tone,
    misalignment,
  };
}

