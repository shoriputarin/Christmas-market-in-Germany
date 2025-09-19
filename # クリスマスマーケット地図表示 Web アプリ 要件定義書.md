# クリスマスマーケット地図表示 Web アプリ 要件定義書

最終更新: 2025-09-20（JST）

---

## 1. 目的 / ゴール

* 在日ドイツ大使館サイトに掲載の **クリスマスマーケット情報**（出典: [https://japan.diplo.de/ja-ja/themen/willkommen/weihnachtsmaerkte-915164](https://japan.diplo.de/ja-ja/themen/willkommen/weihnachtsmaerkte-915164)）を地図上に可視化し、閲覧者が開催地・開催日・詳細情報を直感的に確認できるようにする。
* **PC優先**で、直近の開催可否や日付を素早く確認できる UI を提供する（レスポンシブ対応は将来の拡張）。

## 2. スコープ

* **対象デバイス**: **PC（デスクトップ）優先**。画面幅 1280px 以上を主ターゲット（将来スマホ対応を拡張で検討）。
* **必須 (MVP)**

  * **ドイツ国内**の開催都市にマップピン表示
  * ピン（またはリスト）をクリック/タップで詳細ポップアップ表示
  * 基本情報: 名称、都市名、会場、開催期間（日付）、公式リンク
  * **デスクトップ向けUI**: 左（または右）にサイドパネル（リスト/詳細）、反対側に地図の2カラム
  * Leaflet + OSM を想定したシングルページ Web（静的配信）
* **任意 (拡張)**

  * 日付フィルタ（開催中/今週末/期間指定）
  * 地域・都道府県フィルタ、テキスト検索
  * ピンのクラスタリング
  * 多言語対応（日本語/英語/ドイツ語）
  * ソーシャル共有、OGP 画像
  * PWA（オフライン閲覧）

## 3. 利用者像 / ユースケース

* 旅行者/家族連れ: 近場のマーケットと日程をすぐに知りたい
* 主催・関連団体: 情報の正確性、公式サイトへの導線を確保したい
* メディア/学校: 地域別の開催状況を俯瞰したい

### 代表ユーザーストーリー

* 「ユーザーとして、現在地周辺の開催中マーケットだけを地図で見たい」（拡張）
* 「ユーザーとして、ピンをタップしたら開催期間と公式リンクがすぐ分かる」（MVP）

## 4. 画面/UX 仕様（初版・PC）

* **レイアウト**: 2カラム（例）

  * **左: サイドパネル** — リスト / 検索 / フィルタ（拡張） / 詳細
  * **右: 地図** — 初期表示は日本全域、ズームで都市へ
* **ヘッダー**: タイトル/簡易説明/出典表記（固定）
* **ピンのポップアップ**（MVP 必須項目）

  * 名称（日本語名があれば日本語、なければ原文）
  * 市/地域名、会場（住所テキスト）
  * 開催期間（開始日〜終了日。単日/複数日/週末のみなどの表記に対応）
  * 公式リンク（新規タブで開く）
  * 出典/免責のミニ表記
* **アクセシビリティ**

  * キーボード操作: リスト→ピンへフォーカス移動
  * 地図操作の代替: リスト選択でポップアップを開く

### アクセシビリティ達成基準（Leaflet 前提・MVP）

* **代替ナビゲーション**: サイドパネルのリストから全スポットに到達可能。各リスト項目は `button` として実装し、`aria-label` にマーケット名＋都市を付与。
* **ポップアップの告知**: ピン/リスト操作で詳細が開いたら、`role="dialog"`（または `aria-live=polite` な領域）へフォーカス移動。閉じるとトリガー要素へフォーカスを戻す。
* **キーボード操作**: `Tab` でヘッダー→リスト→地図→フッターの順に到達。地図コンテナは `tabindex="-1"` とし、マップ内フォーカスはピン（`button`）のみに限定。
* **ラベル**: 地図コンテナに `aria-label="ドイツのクリスマスマーケット地図"`。ピン要素に `aria-label` で名称/都市/期間の要約を付与。
* **コントラスト**: テキストとアイコンは WCAG 2.2 AA（4.5:1）以上。ポップアップのフォーカスリングは明示的に可視化。
* **受け入れテスト**: NVDA（Windows/Chrome）で、①リストからベルリンを開く→詳細読み上げ→閉じる→フォーカスが元に戻る、②ピンに `Tab` 到達できる、を確認。

## 5. 機能要件

* **地図表示**: OSM タイル + Leaflet（候補）。ピン表示、ズーム/パン。
* **データ読込**: `/data/markets.json` を静的配信。フロントでフェッチしレンダリング。
* **詳細表示**: ピンまたはリスト選択で、ポップアップ/サイドパネルに詳細。
* **（拡張）フィルタ/検索**: 期間、地域、フリーワード。
* **（拡張）現在地**: ブラウザ Geolocation API（許諾時のみ）。
* **（拡張）クラスタリング**: ピン密度に応じたクラスタ表示。

## 6. 非機能要件

* **パフォーマンス**: LCP < 2.0s（有線/デスクトップ想定・10Mbps相当）、初回データ <= 200KB（目安）
* **アクセシビリティ**: キーボード操作、コントラスト比、ARIA（マップ操作の代替パターン）
* **多言語**: i18n フレームワーク採用（拡張）
* **SEO**: メタ/OGP、サイトマップ（静的）
* **セキュリティ/プライバシー**: 解析は匿名（拡張: Plausible など）、位置情報は端末内のみ使用
* **ライセンス表記**: © OpenStreetMap contributors、Leaflet、データ出典（在日ドイツ大使館サイト）

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Christmas Markets Dataset",
  "type": "object",
  "required": ["version", "source", "markets"],
  "additionalProperties": false,
  "properties": {
    "version": { "type": "string" },
    "source": { "type": "string", "format": "uri" },
    "generated_at": { "type": "string", "format": "date" },
    "markets": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["id", "name", "city", "lat", "lng", "url"],
        "properties": {
          "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
          "name": {
            "type": "object",
            "minProperties": 1,
            "additionalProperties": false,
            "properties": {
              "ja": { "type": "string" },
              "en": { "type": "string" },
              "de": { "type": "string" }
            }
          },
          "city": { "type": "string" },
          "region": { "type": "string" },
          "venue": { "type": "string" },
          "address": { "type": "string" },
          "dates": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "start": { "type": "string", "format": "date" },
              "end": { "type": "string", "format": "date" },
              "note": { "type": "string" }
            }
          },
          "times": { "type": "string" },
          "url": { "type": "string", "format": "uri" },
          "source_url": { "type": "string", "format": "uri" },
          "organizer": { "type": "string" },
          "admission": { "type": "string" },
          "lat": { "type": "number" },
          "lng": { "type": "number" },
          "tags": { "type": "array", "items": { "type": "string" } },
          "last_verified": { "type": "string", "format": "date" }
        }
      }
    }
  }
}
```

### ７．データ方針

* **取得**: 初期は手動整備（Google Spreadsheet/Notion → エクスポート JSON）
* **同定**: `id` は `slug-year` 形式でユニークに付与
* **地理情報**: ジオコーディングは Nominatim（OSM）や Google Geocoding API などを事前バッチで取得（本番では静的値を配信）
* **更新**: 年次でリセット。`last_verified` を記録

## 8. 技術構成（確定/提案）

* **フロント**: Vite + React（TypeScript）
* **マップ**: Leaflet + OSM（無償/高自由度）。代替: MapLibre GL、Google Maps JS API。
* **デプロイ**: **Vercel**（静的エクスポート or SPA デプロイ）
* **CI**: JSON スキーマ検証 + Lint（ESLint/TypeScript/Prettier）
* **解析（任意）**: Plausible（クッキー不要）/ GA4

## 9. API / ファイル構成（静的サイト想定）

* `/index.html` — 1 ページ
* `/assets/*` — 画像/アイコン
* `/data/markets.json` — マーケット一覧（上記スキーマ）
* `/data/schema.json` — JSON Schema（データ検証用）

## 10. 受け入れ基準（MVP）

* **PC（≥1280px）での表示**: 2カラムレイアウトが崩れない
* 地図が表示され、最低 3 都市以上にピンが表示される
* リスト or ピンをクリックで名称・都市・期間・公式リンクが見える
* 出典と地図ライセンス表記がページに明示される

## 11. テスト観点

* JSON 読込/パース（失敗時のフォールバック）
* ピン重なり時のタップ/クリック精度
* 期間表記（単日/複数日/未定）
* 外部リンクの挙動（`noopener`/`noreferrer`）
* アクセシビリティ（Tab 移動、スクリーンリーダー）
* モバイルスクロール vs マップパンの競合回避

## 12. 運用・更新フロー（初期案）

1. 出典ページを参照し、管理シートに行を追加/更新
2. 住所→緯度経度を事前ジオコーディング（重複/誤差チェック）
3. JSON にエクスポートして `markets.json` を差し替え
4. 変更は PR ベースでレビューし自動デプロイ

## 13. リスクと配慮

* 出典サイトの**利用規約/著作権**の遵守（引用/リンク方針の確認）
* 情報の**鮮度/正確性**（年次変動/中止情報の反映）
* 地図タイルの**利用制限**（OSM のフェアユース、キャッシュ/レート）

## 16. 参考 UI ワイヤ（テキスト）

* **ヘッダー**: タイトル、簡単な説明、出典リンク
* **メイン**: 左サイドパネル（リスト/詳細）、右に地図
* **ポップアップ**: 名称 / 都市・会場 / 期間 / 公式リンク（外部） / 出典
* **フッター**: © 表記（OSM/Leaflet/出典）、年次切替（将来）

## 17. 初期データ（主要都市リンクのシード）

* 本ドキュメント末尾の「主要都市リンク（出典ベース）」を元に `/data/markets.json` を起票
* 年度情報や日付は後追いで更新（初期は URL と都市名・概略のみ）
* 初期投入対象（都市 / 公式または観光局リンク）

  * ベルリン — weihnachteninberlin.de
  * ミュンヘン — muenchen.travel
  * ハンブルク — hamburger-weihnachtsmarkt.com
  * ケルン — koelnerweihnachtsmarkt.de
  * フランクフルト — frankfurt-tourismus.de
  * ドレスデン — weihnachtsmarkt-dresden.de
  * シュトゥットガルト — stuttgarter-weihnachtsmarkt.de
  * ライプツィヒ — leipzig.de/weihnachtsmarkt
  * ニュルンベルク — christkindlesmarkt.de
  * リューベック — luebeck-tourismus.de/kultur/weihnachtsstadt-des-nordens
  * ハイデルベルク — heidelberg-marketing.de
  * エアフルト — erfurter-weihnachtsmarkt.eu
  * アウグスブルク — augsburgerchristkindlesmarkt.com
  * アンナベルク・ブッフホルツ — annaberg-buchholz.de
  * デュッセルドルフ — （URL未記載のため本文参照・調査中）
  * ドルトムント — （URL未記載のため本文参照・調査中）

> 備考: 各都市は市の中心または主要会場の座標を採用。`source_url` に都市別の参照 URL（可能なら各都市の公式マーケットページ）を保持。

**補足**: データの詳細プレビューは *Enriched\_Christmas\_Market\_Seed\_\_preview\_* を参照（キャンバス内の表ビュー）。

---

### 変更履歴

* 2025-09-20: 初版ドラフト作成
* 2025-09-20: PC優先/Vercelデプロイ前提に更新、初期データ方針を追記
