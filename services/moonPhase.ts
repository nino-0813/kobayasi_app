// 月の満ち欠けを計算する関数

export interface MoonPhase {
  phase: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  age: number; // 月齢（0-29.53）
  name: string; // 日本語名
  illumination: number; // 照度（0-1）
}

/**
 * 指定された日付の月齢を計算
 * 基準: 2000年1月6日 18:14 UTC が新月
 */
export const calculateMoonPhase = (date: Date = new Date()): MoonPhase => {
  // 基準新月日: 2000年1月6日 18:14 UTC
  const baseNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  
  // 月の周期（日）
  const lunarCycle = 29.53058867;
  
  // 経過日数を計算
  const diffMs = date.getTime() - baseNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  // 月齢を計算（0-29.53の範囲）
  let age = diffDays % lunarCycle;
  if (age < 0) age += lunarCycle;
  
  // 照度を計算（0-1）
  // より正確な計算: 月齢から照度を計算
  // 満月（14.77日）で1.0、新月（0日）で0.0
  let illumination: number;
  const halfCycle = 14.765294335; // 29.53058867 / 2
  if (age <= halfCycle) {
    // 新月から満月へ（0度から180度）
    const angle = (age / halfCycle) * Math.PI;
    illumination = 0.5 * (1 - Math.cos(angle));
  } else {
    // 満月から新月へ（180度から360度）
    const angle = ((age - halfCycle) / halfCycle) * Math.PI;
    illumination = 0.5 * (1 + Math.cos(angle));
  }
  
  // 照度を0-1の範囲に正規化
  illumination = Math.max(0, Math.min(1, illumination));
  
  // 月の満ち欠けの状態を判定
  let phase: MoonPhase['phase'];
  let name: string;
  
  if (age < 1.84) {
    phase = 'new';
    name = '新月';
  } else if (age < 5.53) {
    phase = 'waxing-crescent';
    name = '三日月';
  } else if (age < 9.22) {
    phase = 'first-quarter';
    name = '上弦の月';
  } else if (age < 12.91) {
    phase = 'waxing-gibbous';
    name = '十三夜';
  } else if (age < 16.61) {
    phase = 'full';
    name = '満月';
  } else if (age < 20.30) {
    phase = 'waning-gibbous';
    name = '十六夜';
  } else if (age < 23.99) {
    phase = 'last-quarter';
    name = '下弦の月';
  } else {
    phase = 'waning-crescent';
    name = '有明の月';
  }
  
  return {
    phase,
    age: Math.round(age * 10) / 10,
    name,
    illumination: Math.round(illumination * 100) / 100,
  };
};

