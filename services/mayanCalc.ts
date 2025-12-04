import { MayanSign } from '../types';

// Solar Seals (20)
const SOLAR_SEALS = [
  { ja: "赤い龍", en: "Red Dragon", color: "text-red-500" },
  { ja: "白い風", en: "White Wind", color: "text-slate-400" },
  { ja: "青い夜", en: "Blue Night", color: "text-blue-600" },
  { ja: "黄色い種", en: "Yellow Seed", color: "text-yellow-500" },
  { ja: "赤い蛇", en: "Red Serpent", color: "text-red-600" },
  { ja: "白い世界の橋渡し", en: "White Worldbridger", color: "text-slate-400" },
  { ja: "青い手", en: "Blue Hand", color: "text-blue-500" },
  { ja: "黄色い星", en: "Yellow Star", color: "text-yellow-400" },
  { ja: "赤い月", en: "Red Moon", color: "text-red-500" },
  { ja: "白い犬", en: "White Dog", color: "text-slate-400" },
  { ja: "青い猿", en: "Blue Monkey", color: "text-blue-500" },
  { ja: "黄色い人", en: "Yellow Human", color: "text-yellow-500" },
  { ja: "赤い空歩く人", en: "Red Skywalker", color: "text-red-500" },
  { ja: "白い魔法使い", en: "White Wizard", color: "text-slate-400" },
  { ja: "青い鷲", en: "Blue Eagle", color: "text-blue-600" },
  { ja: "黄色い戦士", en: "Yellow Warrior", color: "text-yellow-500" },
  { ja: "赤い地球", en: "Red Earth", color: "text-red-600" },
  { ja: "白い鏡", en: "White Mirror", color: "text-slate-400" },
  { ja: "青い嵐", en: "Blue Storm", color: "text-blue-700" },
  { ja: "黄色い太陽", en: "Yellow Sun", color: "text-yellow-500" },
];

// Galactic Tones (13)
const GALACTIC_TONES = [
  "磁気", "月", "電気", "自己存在", "倍音", "律動", "共振", "銀河", "太陽", "惑星", "スペクトル", "水晶", "宇宙"
];

/**
 * Calculates the Mayan Kin, Seal, and Tone from a Gregorian date.
 * Uses a known anchor date: Feb 8, 2023 was Kin 260.
 */
export const calculateMayanSign = (date: Date): MayanSign => {
  // Anchor date: Feb 8, 2023 is Kin 260
  const anchorDate = new Date(2023, 1, 8); // Month is 0-indexed in JS Date
  const anchorKin = 260;

  // Calculate difference in days
  const oneDay = 24 * 60 * 60 * 1000;
  // Use UTC to avoid timezone/DST issues when calculating raw day difference
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utcAnchor = Date.UTC(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate());
  
  const diffDays = Math.round((utcDate - utcAnchor) / oneDay);
  
  // Calculate Kin
  // Formula handles negative differences (dates before anchor)
  let kin = (anchorKin + diffDays) % 260;
  if (kin <= 0) kin += 260;

  // Calculate Seal (0-19)
  // Kin 1 = Red Dragon (Index 0). So (Kin - 1) % 20
  const sealIndex = (kin - 1) % 20;
  
  // Calculate Tone (1-13)
  // Kin 1 = Tone 1. So (Kin - 1) % 13 + 1
  const toneNumber = ((kin - 1) % 13) + 1;
  const toneNameJa = GALACTIC_TONES[toneNumber - 1];

  return {
    kin,
    solarSealNameJa: SOLAR_SEALS[sealIndex].ja,
    solarSealNameEn: SOLAR_SEALS[sealIndex].en,
    color: SOLAR_SEALS[sealIndex].color,
    toneNumber,
    toneNameJa: `${toneNameJa}の音`,
  };
};
