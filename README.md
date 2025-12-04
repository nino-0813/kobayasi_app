# Sunrise Soul - 超・マヤ暦占い

古代マヤの叡智を現代に蘇らせる、最高級のマヤ暦鑑定アプリケーション。

## ✨ 特徴

- 🎯 生年月日からマヤ暦のKIN番号を自動計算
- 🌙 リアルタイムの月の満ち欠け表示
- ✨ AIによるパーソナライズされた鑑定結果
- 📱 レスポンシブデザイン
- 📤 SNSシェア機能
- 💾 画像ダウンロード機能

## 🚀 セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

OpenAI APIキーは [OpenAI Platform](https://platform.openai.com/api-keys) で取得できます。

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3007` にアクセスしてください。

## 📦 ビルド

```bash
npm run build
```

ビルドされたファイルは`dist`ディレクトリに出力されます。

## 🌐 Vercelでのデプロイ

詳細な手順は [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) を参照してください。

### クイックスタート

1. [Vercel](https://vercel.com) にログイン
2. プロジェクトをインポート
3. 環境変数 `OPENAI_API_KEY` を設定
4. デプロイ完了！

## 🛠️ 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite 6
- **スタイリング**: Tailwind CSS
- **AI**: OpenAI API (GPT-4o-mini)
- **アイコン**: Lucide React

## 📝 ライセンス

Private

## 🔗 関連リンク

- [Vercel デプロイガイド](./VERCEL_DEPLOY.md)
