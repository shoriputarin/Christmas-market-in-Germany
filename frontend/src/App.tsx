import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useMarkets } from './hooks/useMarkets';
import type { Market } from './types';
import { MarketList } from './components/MarketList';
import { MarketDetail } from './components/MarketDetail';
import { MapView } from './components/MapView';
import { formatDate } from './utils/date';

function App() {
  const { markets, dataset, loading, error } = useMarkets();
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!selectedMarketId && markets.length > 0) {
      setSelectedMarketId(markets[0].id);
    }
  }, [markets, selectedMarketId]);

  const selectedMarket = useMemo<Market | null>(() => {
    return markets.find((market) => market.id === selectedMarketId) ?? null;
  }, [markets, selectedMarketId]);

  const handleSelect = (market: Market) => {
    setSelectedMarketId(market.id);
  };

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>クリスマスマーケット地図</h1>
          <p className="app__description">
            在日ドイツ大使館の掲載情報をもとに、主要都市のクリスマスマーケットを地図で確認できます。
            サイドパネルからマーケットを選ぶと、詳細が表示されます。
          </p>
        </div>
        {dataset && (
          <dl className="app__meta">
            <div>
              <dt>データバージョン</dt>
              <dd>{dataset.version}</dd>
            </div>
            <div>
              <dt>データ最終更新</dt>
              <dd>{formatDate(dataset.generated_at)}</dd>
            </div>
          </dl>
        )}
      </header>

      <main className="app__layout">
        <aside className="app__sidebar">
          {loading && <p role="status">データを読み込み中です…</p>}
          {error && !loading && (
            <p role="alert" className="app__error">
              データを読み込めませんでした: {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <MarketList
                markets={markets}
                selectedMarketId={selectedMarketId}
                onSelect={handleSelect}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
              />
              <MarketDetail market={selectedMarket} />
            </>
          )}
        </aside>

        <section className="app__map" aria-labelledby="map-heading">
          <h2 id="map-heading" className="sr-only">
            地図表示
          </h2>
          <p className="app__map-helper" role="note">
            マップの操作が難しい場合は、左側のリストでマーケットを選択してください。
          </p>
          <MapView
            markets={markets}
            selectedMarketId={selectedMarketId}
            onSelect={handleSelect}
          />
        </section>
      </main>

      <footer className="app__footer">
        <p>
          データ出典: <a href="https://japan.diplo.de/ja-ja/themen/willkommen/weihnachtsmaerkte-915164">在日ドイツ大使館</a> /
          タイル: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> /
          地図: <a href="https://leafletjs.com/">Leaflet</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
