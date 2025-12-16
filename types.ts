export interface MayanSign {
  kin: number;
  solarSealNameJa: string;
  solarSealNameEn: string;
  toneNumber: number;
  toneNameJa: string;
  color: string; // The primary color associated with the seal
}

export interface FortuneResult {
  catchyTitle: string;
  powerWord: string;
  essence: string; // 生まれ持った本質（変わらない軸）
  misalignment: string; // 今のズレ（なぜ苦しいか）
  phase: string; // 今のテーマ（人生フェーズ）
  action: string; // 今日の一言アクション
  guidance: string; // 個別診断への導線
}

export enum AppState {
  WELCOME = 'WELCOME',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
