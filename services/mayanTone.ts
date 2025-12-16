export interface GalacticToneData {
  number: number;
  name: string;
  theme: string; // テーマ
  message: string; // メッセージ（今の人生フェーズ）
}

export const GALACTIC_TONES: GalacticToneData[] = [
  { 
    number: 1, 
    name: "磁気", 
    theme: "目的", 
    message: "何を目指すかを決める時期。方向性を定めることが大切です。" 
  },
  { 
    number: 2, 
    name: "月", 
    theme: "挑戦", 
    message: "不安や迷いが出やすい時期。試行錯誤しながら進む時期です。" 
  },
  { 
    number: 3, 
    name: "電気", 
    theme: "行動", 
    message: "試しながら動く時期。完璧を求めず、動きながら学びます。" 
  },
  { 
    number: 4, 
    name: "自己存在", 
    theme: "安定", 
    message: "形にしていく時期。基盤を固め、継続していく時期です。" 
  },
  { 
    number: 5, 
    name: "倍音", 
    theme: "拡大", 
    message: "影響力を広げる時期。自分の力を外に発信していきます。" 
  },
  { 
    number: 6, 
    name: "律動", 
    theme: "調和", 
    message: "バランスを取る時期。リズムを作り、流れに乗ります。" 
  },
  { 
    number: 7, 
    name: "共振", 
    theme: "共鳴", 
    message: "人とつながる時期。協力やパートナーシップが重要です。" 
  },
  { 
    number: 8, 
    name: "銀河", 
    theme: "統合", 
    message: "全体を見る時期。バランスを取りながら統合していきます。" 
  },
  { 
    number: 9, 
    name: "太陽", 
    theme: "完成", 
    message: "一つのサイクルが完成する時期。成果を確認し、次へ進みます。" 
  },
  { 
    number: 10, 
    name: "惑星", 
    theme: "実現", 
    message: "結果を出す時期。努力が形になり始めます。" 
  },
  { 
    number: 11, 
    name: "スペクトル", 
    theme: "解放", 
    message: "手放す時期。不要なものを解放し、軽くなります。" 
  },
  { 
    number: 12, 
    name: "水晶", 
    theme: "協力", 
    message: "チームワークが重要になる時期。一人で抱え込まない。" 
  },
  { 
    number: 13, 
    name: "宇宙", 
    theme: "超越", 
    message: "新しい次元へ進む時期。大きな変化を受け入れます。" 
  },
];

