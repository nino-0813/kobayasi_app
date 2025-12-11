import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { MayanSign, FortuneResult } from '../types';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // CORS設定
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sign: MayanSign = request.body;

    if (!sign || !sign.kin) {
      return response.status(400).json({ error: 'Invalid request body' });
    }

    // 環境変数からAPIキーを取得（サーバーサイドのみ）
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API Key is missing');
      return response.status(500).json({ error: 'Server configuration error' });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const prompt = `
    あなたは、政財界のリーダーや一流のアーティストを顧客に持つ、世界最高峰のマヤ暦鑑定士です。
    言葉遣いは丁寧で洗練されており、相手に深い気づきと自信を与える「プロフェッショナルなモチベーター」です。
    薄っぺらい励ましではなく、その人の魂の本質を深く見抜き、圧倒的な肯定感で背中を押してください。
    
    ターゲット：人生をより豊かに、美しく生きたいと願う大人たち。

    以下のユーザーのマヤ暦情報（KIN）を元に、最高級の鑑定結果を作成してください。
    
    【ユーザー情報】
    - KIN番号: ${sign.kin}
    - 太陽の紋章: ${sign.solarSealNameJa} (${sign.solarSealNameEn})
    - 銀河の音: ${sign.toneNumber} (${sign.toneNameJa})

    【要件】
    1. キャッチコピーは、雑誌の特集見出しのような、洗練された魅力的なもの。
    2. 性格診断（personality）は、最低200文字以上で、その人の高貴な精神性や才能を詳しく称える文章。具体的な特徴、強み、周囲への影響などを丁寧に描写してください。
    3. ミッション（mission）は、最低200文字以上で、社会や世界に対する役割を示唆する壮大なもの。なぜその使命が重要なのか、どのように実現していくのかを詳しく説明してください。
    4. エネルギーを高める秘訣（energyAdvice）は、最低200文字以上で、優雅かつ具体的なアクション。なぜその方法が効果的なのか、どのように実践するのかを詳しく説明してください。
    5. トーン＆マナー：知的、優雅、情熱的、絶対的な肯定。
    6. 「パワーワード」は、その人を表す四字熟語や美しい日本語のフレーズ（例：「光華明彩」「天衣無縫の旅人」など）。
    7. ラッキーアクション（luckyAction）は、今日実践できる具体的な行動を1つ。

    【重要】personality、mission、energyAdviceの各フィールドは、必ず最低200文字以上で記述してください。短すぎる文章は避け、読者が深く理解できるよう、具体的で詳細な内容にしてください。

    以下のJSONフォーマットで返してください。JSON以外のテキストは含めないでください。
    {
      "catchyTitle": "キャッチコピー",
      "powerWord": "パワーワード",
      "personality": "性格診断（最低200文字以上）",
      "mission": "ミッション（最低200文字以上）",
      "energyAdvice": "エネルギーを高める秘訣（最低200文字以上）",
      "luckyAction": "ラッキーアクション"
    }
  `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたは世界最高峰のマヤ暦鑑定士です。常にJSON形式で応答してください。各フィールド（personality、mission、energyAdvice）は必ず200文字以上で、詳細で具体的な内容を記述してください。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      const fortuneResult: FortuneResult = JSON.parse(content);
      return response.status(200).json(fortuneResult);
    }

    throw new Error('No response content from OpenAI');
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // エラー時のフォールバック
    const fallbackResult: FortuneResult = {
      catchyTitle: '魂が目覚める、運命の刻',
      powerWord: '天真爛漫の才',
      personality:
        'あなたの中に眠るのは、周囲を自然と幸福にする太陽のような輝きです。その優しさと強さは、多くの人々の道しるべとなるでしょう。あなたは生まれながらにして、人々の心に希望の光を灯す力を持っています。困難な状況でも、あなたの存在そのものが周囲に安心感と勇気を与えます。あなたの本質は、深い共感力と直感的な理解力によって、他人の痛みや喜びを敏感に感じ取り、適切な言葉や行動で支えることができるのです。この才能は、単なる優しさではなく、人々の人生を変えるほどの影響力を持っています。',
      mission: 'あなたの魂のミッションは、愛と光を体現し、世界に調和をもたらすことです。この使命は、単なる理想ではなく、あなたがこの世に生まれてきた根本的な理由です。あなたは、争いや対立が生まれる場所に、理解と受容のエネルギーを届ける役割を担っています。具体的には、日常の小さな場面から、より大きな社会的な場面まで、あなたの存在そのものが調和を生み出します。この使命を果たすためには、まず自分自身を大切にし、内なる光を輝かせ続けることが重要です。あなたが輝けば輝くほど、周囲の人々も自然と光り始め、最終的には世界全体がより調和の取れた場所になっていくのです。',
      energyAdvice: 'あなたのエネルギーを高める秘訣は、美しい音楽を聴きながら、ハーブティーを楽しむ時間を持つことです。この時間は、単なる休息ではなく、あなたの内なる声と対話し、魂を浄化する重要な儀式となります。音楽の振動は、あなたの感情や思考を整え、より深いリラックス状態へと導いてくれます。特に、自然の音やクラシック音楽、またはあなたの心に響くメロディーは、あなたのエネルギーを高次元へと引き上げてくれます。ハーブティーは、身体だけでなく、精神的なバランスも整えてくれます。カモミールやラベンダーなど、リラックス効果のあるハーブを選ぶことで、ストレスを解放し、新しい洞察を得ることができます。この時間を毎日、たとえ10分でも確保することで、あなたの直感力が研ぎ澄まされ、より良い判断ができるようになります。',
      luckyAction: 'お気に入りの靴を丁寧に磨くこと',
    };

    return response.status(200).json(fallbackResult);
  }
}

