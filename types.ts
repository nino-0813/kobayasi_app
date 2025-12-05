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
  personality: string;
  mission: string;
  energyAdvice: string;
  luckyAction: string;
}

export enum AppState {
  WELCOME = 'WELCOME',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
