export interface SolarSealData {
  ja: string;
  en: string;
  color: string;
  essence: string; // 生まれ持った本質
  strength: string; // 強み
  shadow: string; // 陥りやすい状態（弱点）
  advice: string; // アドバイス
}

export const SOLAR_SEALS: SolarSealData[] = [
  {
    ja: "赤い龍",
    en: "Red Dragon",
    color: "text-red-500",
    essence: "人を育て、物事を始めるエネルギー",
    strength: "面倒見がよく、スタート役として力を発揮する",
    shadow: "与えすぎて自分を後回しにしやすい",
    advice: "まず自分を満たすことを最優先にする"
  },
  {
    ja: "白い風",
    en: "White Wind",
    color: "text-slate-400",
    essence: "言葉と感性で人をつなぐ存在",
    strength: "共感力が高く、空気を読むのが得意",
    shadow: "本音を飲み込みすぎる",
    advice: "感じたことを言葉にして表現する"
  },
  {
    ja: "青い夜",
    en: "Blue Night",
    color: "text-blue-600",
    essence: "内面の世界を深く探求する人",
    strength: "想像力と洞察力が豊か",
    shadow: "考えすぎて動けなくなる",
    advice: "答えが出なくても一歩動いてみる"
  },
  {
    ja: "黄色い種",
    en: "Yellow Seed",
    color: "text-yellow-500",
    essence: "可能性を育てる存在",
    strength: "コツコツと成長を積み重ねられる",
    shadow: "芽が出る前に諦めやすい",
    advice: "結果よりも継続を意識する"
  },
  {
    ja: "赤い蛇",
    en: "Red Serpent",
    color: "text-red-600",
    essence: "生命力と本能のエネルギー",
    strength: "集中力と粘り強さがある",
    shadow: "無理をしすぎて疲弊する",
    advice: "体の声を最優先にする"
  },
  {
    ja: "白い世界の橋渡し",
    en: "White Worldbridger",
    color: "text-slate-400",
    essence: "人と人、役割をつなぐ存在",
    strength: "調整力と手放す力がある",
    shadow: "自分の気持ちを後回しにする",
    advice: "終わらせる勇気を持つ"
  },
  {
    ja: "青い手",
    en: "Blue Hand",
    color: "text-blue-500",
    essence: "体験を通して学ぶ人",
    strength: "実践力が高く、形にするのが得意",
    shadow: "完璧を求めすぎて止まる",
    advice: "途中でも出してみる"
  },
  {
    ja: "黄色い星",
    en: "Yellow Star",
    color: "text-yellow-400",
    essence: "美と調和をもたらす存在",
    strength: "センスがよく、整える力がある",
    shadow: "理想が高くなりすぎる",
    advice: "今あるものを認める"
  },
  {
    ja: "赤い月",
    en: "Red Moon",
    color: "text-red-500",
    essence: "流れを浄化する存在",
    strength: "直感が鋭く、変化に強い",
    shadow: "感情に飲まれやすい",
    advice: "一度立ち止まって整える"
  },
  {
    ja: "白い犬",
    en: "White Dog",
    color: "text-slate-400",
    essence: "愛と誠実さを大切にする人",
    strength: "信頼関係を築くのが得意",
    shadow: "尽くしすぎて疲れる",
    advice: "自分の境界線を守る"
  },
  {
    ja: "青い猿",
    en: "Blue Monkey",
    color: "text-blue-500",
    essence: "遊び心と創造性の人",
    strength: "発想力があり場を明るくする",
    shadow: "真剣さを求められると苦しくなる",
    advice: "楽しさを最優先に選ぶ"
  },
  {
    ja: "黄色い人",
    en: "Yellow Human",
    color: "text-yellow-500",
    essence: "自由意志を持つ存在",
    strength: "自分で選び決める力がある",
    shadow: "迷いすぎて決められない",
    advice: "自分の選択を信じる"
  },
  {
    ja: "赤い空歩く人",
    en: "Red Skywalker",
    color: "text-red-500",
    essence: "探求と成長の人",
    strength: "挑戦を恐れず広げていける",
    shadow: "落ち着けず不安になる",
    advice: "今いる場所に意味を見つける"
  },
  {
    ja: "白い魔法使い",
    en: "White Wizard",
    color: "text-slate-400",
    essence: "人を魅了する存在",
    strength: "自然体で影響力を持つ",
    shadow: "我慢しすぎて疲れる",
    advice: "正直な気持ちを出す"
  },
  {
    ja: "青い鷲",
    en: "Blue Eagle",
    color: "text-blue-600",
    essence: "未来を見通す視点を持つ人",
    strength: "全体を俯瞰できる",
    shadow: "現実が疎かになりやすい",
    advice: "目の前の一歩に集中する"
  },
  {
    ja: "黄色い戦士",
    en: "Yellow Warrior",
    color: "text-yellow-500",
    essence: "問いを持ち挑む存在",
    strength: "疑問を深め、成長できる",
    shadow: "考えすぎて動けない",
    advice: "答えは動きながら探す"
  },
  {
    ja: "赤い地球",
    en: "Red Earth",
    color: "text-red-600",
    essence: "流れとシンクロする人",
    strength: "タイミングを掴む力がある",
    shadow: "周りに振り回されやすい",
    advice: "自分のリズムを大切にする"
  },
  {
    ja: "白い鏡",
    en: "White Mirror",
    color: "text-slate-400",
    essence: "真実を映し出す存在",
    strength: "客観性と冷静さがある",
    shadow: "厳しくなりすぎる",
    advice: "優しさも同時に持つ"
  },
  {
    ja: "青い嵐",
    en: "Blue Storm",
    color: "text-blue-700",
    essence: "変化を起こす存在",
    strength: "停滞を打ち破る力がある",
    shadow: "感情の波が激しくなる",
    advice: "変化の前に一呼吸置く"
  },
  {
    ja: "黄色い太陽",
    en: "Yellow Sun",
    color: "text-yellow-500",
    essence: "無条件の愛を照らす存在",
    strength: "周囲を明るくする影響力",
    shadow: "頑張りすぎて燃え尽きる",
    advice: "休むことも使命と知る"
  }
];
