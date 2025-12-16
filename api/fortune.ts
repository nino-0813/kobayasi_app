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
    const { sign, age, diagnosis } = request.body;

    if (!sign || !sign.kin || !diagnosis || !diagnosis.seal || !diagnosis.tone) {
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
あなたは「マヤ暦 × 人生フェーズ診断」の専門家です。

以下の情報をもとに、読み手が
「なぜ今つまずいているのかが腑に落ちる」
診断文を作ってください。

【生まれ持った本質】
${diagnosis.seal.essence}

【強み】
${diagnosis.seal.strength}

【陥りやすい状態】
${diagnosis.seal.shadow}

【今うまくいっていない理由】
${diagnosis.misalignment}

【今の人生フェーズ】
${diagnosis.tone.message}

【今日意識する行動】
${diagnosis.seal.advice}

▼出力ルール（重要）
・断定しすぎない
・「あなたは〜かもしれません」という柔らかい表現
・否定しない
・共感から入る
・最後に「もっと深く知りたい人向け」の一文を入れる

▼構成
① 本質の説明（安心感）
② 今のズレの指摘（当たってるポイント）
③ 今はダメな時期ではないという補足
④ 今日の一言アクション
⑤ 深掘り案内

【ユーザー情報】
- KIN番号: ${sign.kin}
- 太陽の紋章: ${sign.solarSealNameJa} (${sign.solarSealNameEn})
- 銀河の音: ${sign.toneNumber} (${sign.toneNameJa})
- 年齢: ${age}歳

以下のJSONフォーマットで返してください。JSON以外のテキストは含めないでください。
各フィールドは最低200文字以上で、具体的で詳細な内容にしてください。

{
  "catchyTitle": "キャッチコピー（雑誌の特集見出しのような、洗練された魅力的なもの）",
  "powerWord": "パワーワード（その人を表す四字熟語や美しい日本語のフレーズ）",
  "essence": "本質の説明（最低200文字以上。安心感を与える内容）",
  "misalignment": "今のズレの指摘（最低200文字以上。当たってるポイントを具体的に）",
  "phase": "今のテーマ（最低200文字以上。今はダメな時期ではないという補足を含む）",
  "action": "今日の一言アクション（簡潔に）",
  "guidance": "深掘り案内（例：「もし「もっと具体的に知りたい」と感じたら、あなたの流れを個別で一緒に整理できます。」）"
}
  `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたは「マヤ暦 × 人生フェーズ診断」の専門家です。常にJSON形式で応答してください。断定しすぎず、「〜かもしれません」という柔らかい表現を使い、共感から入る診断文を作成してください。各フィールド（essence、misalignment、phase）は必ず200文字以上で、読み手が「なぜ今つまずいているのかが腑に落ちる」内容にしてください。',
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
    
    // エラー時のフォールバック（診断データを使用）
    const fallbackResult: FortuneResult = {
      catchyTitle: '魂が目覚める、運命の刻',
      powerWord: '天真爛漫の才',
      essence: `あなたは本来、${diagnosis.seal.essence}。${diagnosis.seal.strength}。ただ、${diagnosis.seal.shadow}かもしれません。この本質は、あなたが生まれ持った変わらない軸です。周囲の人々は、あなたのこの特性に自然と引き寄せられ、安心感を得ています。困難な状況でも、あなたの存在そのものが周囲に希望の光を灯す力を持っているのです。`,
      misalignment: `ただ今は、${diagnosis.misalignment}本当はまだ、${diagnosis.tone.message}これはダメな状態ではなく、流れを整えれば自然に動き出す時期です。あなたが悪いわけではなく、ただ今の使い方に少しズレが出ているだけなのです。`,
      phase: `今のあなたの人生フェーズは、${diagnosis.tone.message}この時期は、あなたの本質を活かしながら、新しい可能性を探求していく時期なのです。完璧を求めず、動きながら学ぶことが大切です。`,
      action: `今日意識してほしいのは「${diagnosis.seal.advice}」`,
      guidance: 'もし「もっと具体的に知りたい」と感じたら、あなたの流れを個別で一緒に整理できます。',
    };

    return response.status(200).json(fallbackResult);
  }
}

