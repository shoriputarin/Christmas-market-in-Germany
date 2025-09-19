# クリスマスマーケット地図表示 Web アプリ

ドイツおよびベルギーの主要クリスマスマーケット情報を、地図とサイドパネルで閲覧できる
React + TypeScript 製の SPA です。Leaflet と OpenStreetMap タイルを利用し、PC（1280px 以上）で
の利用を主ターゲットにしています。

## プロジェクト構成

```text
Christmas-market-in-Germany/
├── # クリスマスマーケット地図表示 Web アプリ 要件定義書.md
├── belgium_christmas_markets_2025.{csv,json}   # 参考資料（元データ）
├── markets_seed.json
├── Enriched_Christmas_Market_Seed__preview_.csv
└── frontend/               # Web アプリ本体（Vite + React）
    ├── public/
    │   └── data/
    │       ├── markets.json   # 本番想定データ（独/ベルギー統合）
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

- 主な参照元
  - ドイツ: <https://japan.diplo.de/ja-ja/themen/willkommen/weihnachtsmaerkte-915164>
  - ベルギー: <https://www.arukikata.co.jp/tokuhain/275044/> など各都市公式サイト
- マーケット情報は `frontend/public/data/markets.json` に保存します
  - `country` フィールドで国別に管理しています
  - 参照リンクは `sources` 配列に追加してください
- スキーマは `frontend/public/data/schema.json` を参照してください
- `markets_seed.json`・各 CSV/JSON は元データの控えです。年度更新時は `slug-year` 形式の `id` を付与し、
  `last_verified` と `period` を更新してからアプリをビルドします

## ライセンス表記

- 地図タイル: © OpenStreetMap contributors
- 地図ライブラリ: Leaflet
- データ: 在日ドイツ大使館サイト / 歩き方特派員レポート / 各都市公式観光情報
