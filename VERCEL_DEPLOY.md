# Vercel デプロイガイド

このプロジェクトをVercelで公開する際の設定手順です。

## 📋 必要な環境変数

Vercelのダッシュボードで以下の環境変数を設定してください：

### 必須環境変数

| 環境変数名 | 説明 | 取得方法 |
|-----------|------|---------|
| `OPENAI_API_KEY` | OpenAI APIキー | [OpenAI Platform](https://platform.openai.com/api-keys) で取得 |

## 🚀 デプロイ手順

### 1. Vercelにプロジェクトをインポート

1. [Vercel](https://vercel.com) にログイン
2. 「Add New Project」をクリック
3. GitHub/GitLab/Bitbucketからリポジトリをインポート

### 2. 環境変数の設定

1. プロジェクト設定画面で「Environment Variables」を開く
2. 以下の環境変数を追加：

```
OPENAI_API_KEY=sk-...
```

**重要**: 
- 環境変数は **Production**, **Preview**, **Development** すべてに設定することを推奨
- APIキーは機密情報のため、GitHubにコミットしないでください

### 3. ビルド設定

Vercelは自動的にViteプロジェクトを検出しますが、以下の設定を確認してください：

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (自動検出)
- **Output Directory**: `dist` (自動検出)
- **Install Command**: `npm install` (自動検出)

### 4. デプロイ

設定を保存すると、自動的にデプロイが開始されます。

## ⚠️ 注意事項

### セキュリティ

1. **APIキーの保護**
   - 環境変数はVercelのダッシュボードでのみ設定
   - `.env`ファイルはGitにコミットしない（`.gitignore`に追加済み）
   - ブラウザでAPIキーが公開されるため、本番環境ではバックエンドAPI経由での呼び出しを推奨

2. **CORS設定**
   - 現在の実装では`dangerouslyAllowBrowser: true`を使用
   - 本番環境では、APIキーを保護するためにバックエンドサーバー経由での呼び出しを検討してください

### パフォーマンス

- Viteのビルド最適化により、本番環境では自動的に最適化されます
- 静的アセットは自動的にCDNに配信されます

## 🔧 トラブルシューティング

### 環境変数が読み込まれない

1. Vercelのダッシュボードで環境変数が正しく設定されているか確認
2. 環境変数名が正確か確認（大文字小文字を区別）
3. デプロイを再実行

### ビルドエラー

1. ローカルで`npm run build`が成功するか確認
2. Node.jsのバージョンを確認（Vercelは自動検出）
3. ビルドログを確認してエラー内容を特定

### API呼び出しエラー

1. APIキーが有効か確認
2. ブラウザのコンソールでエラーメッセージを確認
3. Vercelの関数ログを確認

## 📝 追加の設定（オプション）

### カスタムドメイン

1. Vercelのプロジェクト設定で「Domains」を開く
2. ドメインを追加してDNS設定を完了

### 環境別の設定

- **Production**: 本番環境用のAPIキー
- **Preview**: プレビュー環境用のAPIキー（必要に応じて）
- **Development**: 開発環境用のAPIキー（必要に応じて）

## 🔗 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [OpenAI API Documentation](https://platform.openai.com/docs)

