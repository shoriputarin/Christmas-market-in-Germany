# クリスマスマーケット地図表示 Web アプリ

在日ドイツ大使館が公開しているクリスマスマーケット情報を、地図とサイドパネルで閲覧できる
React + TypeScript 製の SPA です。Leaflet と OpenStreetMap タイルを利用し、PC（1280px 以上）で
の利用を主ターゲットにしています。

## プロジェクト構成

```text
Christmas-market-in-Germany/
├── # クリスマスマーケット地図表示 Web アプリ 要件定義書.md
├── markets_seed.json
├── Enriched_Christmas_Market_Seed__preview_.csv
└── frontend/               # Web アプリ本体（Vite + React）
    ├── public/
    │   └── data/
    │       ├── markets.json   # 本番想定データ
    │       └── schema.json    # JSON Schema
    └── src/
```

## セットアップ

1. Node.js 20.19 以上を推奨（20.18 でも動作するが Vite が警告を出す）
2. 依存関係をインストール

   ```bash
   cd frontend
   npm install
   ```

3. 開発サーバーを起動

   ```bash
   npm run dev
   ```

   ブラウザで <http://localhost:5173> を開くとアプリが表示されます。

4. 本番ビルド

   ```bash
   npm run build
   npm run preview
   ```

## データ更新フロー

- 参照元: <https://japan.diplo.de/ja-ja/themen/willkommen/weihnachtsmaerkte-915164>
- マーケット情報は `frontend/public/data/markets.json` に保存します
- スキーマは `frontend/public/data/schema.json` を参照してください
- `markets_seed.json` は元データのサマリです。年度更新時は `slug-year` 形式の `id` を付与し、
  `last_verified` と `period` を更新してからアプリをビルドします

## ライセンス表記

- 地図タイル: © OpenStreetMap contributors
- 地図ライブラリ: Leaflet
- データ: 在日ドイツ大使館ウェブサイト出典

```
