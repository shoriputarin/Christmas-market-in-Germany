# クリスマスマーケット地図ビューア

Vite + React + TypeScript を使って構築したシングルページアプリケーションです。Leaflet の地図上で
ドイツ各都市のクリスマスマーケットを表示し、サイドパネルから名称・開催期間などを確認できます。

## 主要機能

- Leaflet + OpenStreetMap タイルでマーケット位置を可視化
- サイドパネルでマーケット一覧を検索・選択し、詳細情報を参照
- リスト選択と地図ピンが連動し、詳細ポップアップも表示
- アクセシビリティ配慮: キーボード操作対応、代替導線の提示

## セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動（デフォルト: http://localhost:5173）
npm run dev

# 本番ビルド
npm run build

# ビルド成果物のプレビュー
npm run preview
```

> Node.js 20.19 以上が推奨です。20.18 では Vite からエンジン警告が表示されますが、ビルド自体は成功します。

## データについて

- データセット: `public/data/markets.json`
- JSON Schema: `public/data/schema.json`
- いずれも静的に配信され、`fetch('/data/markets.json')` で読み込みます
- `id` は `slug-year` 形式でユニークに付与し、`last_verified` で最終確認日を記録しています

## ライセンス表記

- データ出典: 在日ドイツ大使館ウェブサイト
- 地図タイル: © OpenStreetMap contributors
- 地図ライブラリ: Leaflet

