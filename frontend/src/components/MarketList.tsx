import { useMemo } from 'react';
import type { Market } from '../types';
import { formatDateRange } from '../utils/date';

interface MarketListProps {
  markets: Market[];
  selectedMarketId: string | null;
  onSelect: (market: Market) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export function MarketList({
  markets,
  selectedMarketId,
  onSelect,
  searchTerm,
  onSearchTermChange,
}: MarketListProps) {
  const filteredMarkets = useMemo(() => {
    if (!searchTerm.trim()) {
      return markets;
    }

    const term = searchTerm.trim().toLowerCase();
    return markets.filter((market) => {
      const haystack = [
        market.name.ja,
        market.name.en,
        market.name.de,
        market.city,
        market.region,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [markets, searchTerm]);

  return (
    <section aria-label="クリスマスマーケット一覧" className="market-list">
      <label className="market-list__search">
        <span className="sr-only">マーケットを検索</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="都市名やマーケット名で検索"
          aria-label="マーケット検索"
        />
      </label>

      <p className="market-list__result-summary">
        {filteredMarkets.length}件表示 / 総件数 {markets.length}件
      </p>

      <ul role="list" className="market-list__items">
        {filteredMarkets.map((market) => {
          const isSelected = market.id === selectedMarketId;
          return (
            <li key={market.id}>
              <button
                type="button"
                className={`market-list__item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelect(market)}
                aria-pressed={isSelected}
              >
                <div className="market-list__item-header">
                  <span className="market-list__item-city">{market.city}</span>
                  <span className="market-list__item-region">{market.region}</span>
                </div>
                <h3>{market.name.ja}</h3>
                <p className="market-list__item-period">
                  {formatDateRange(market.period.start, market.period.end)}
                </p>
                <p className="market-list__item-venue">{market.venue}</p>
              </button>
            </li>
          );
        })}
      </ul>

      {filteredMarkets.length === 0 && (
        <div className="market-list__empty" role="status">
          条件に一致するマーケットが見つかりません。
        </div>
      )}
    </section>
  );
}
