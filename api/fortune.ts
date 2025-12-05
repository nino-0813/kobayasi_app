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
    2. 性格診断は、その人の高貴な精神性や才能を称える文章。
    3. ミッションは、社会や世界に対する役割を示唆する壮大なもの。
    4. 「今日のアドバイス」は、優雅かつ具体的なアクション。
    5. トーン＆マナー：知的、優雅、情熱的、絶対的な肯定。
    6. 「パワーワード」は、その人を表す四字熟語や美しい日本語のフレーズ（例：「光華明彩」「天衣無縫の旅人」など）。

    以下のJSONフォーマットで返してください。JSON以外のテキストは含めないでください。
    {
      "catchyTitle": "キャッチコピー",
      "powerWord": "パワーワード",
      "personality": "性格診断",
      "mission": "ミッション",
      "energyAdvice": "今日のアドバイス",
      "luckyAction": "ラッキーアクション"
    }
  `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたは世界最高峰のマヤ暦鑑定士です。常にJSON形式で応答してください。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
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
        'あなたの中に眠るのは、周囲を自然と幸福にする太陽のような輝きです。その優しさと強さは、多くの人々の道しるべとなるでしょう。',
      mission: '愛と光を体現し、世界に調和をもたらすこと。',
      energyAdvice: '美しい音楽を聴きながら、ハーブティーを楽しむ時間を持ってください。',
      luckyAction: 'お気に入りの靴を丁寧に磨くこと',
    };

    return response.status(200).json(fallbackResult);
  }
}

