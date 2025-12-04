# GitHubへのプッシュ手順

## リモートリポジトリの追加

以下のコマンドでリモートリポジトリを追加してください：

```bash
git remote add origin https://github.com/nino-0813/kobayasi_app.git
```

または、新しいリポジトリを作成する場合は：

1. GitHubで新しいリポジトリを作成
2. リポジトリURLを取得
3. 以下のコマンドを実行：

```bash
git remote add origin <リポジトリURL>
```

## プッシュ

```bash
git push -u origin main
```

## 注意事項

- `.env.local`ファイルは`.gitignore`に含まれているため、コミットされません
- APIキーはVercelの環境変数で設定してください

