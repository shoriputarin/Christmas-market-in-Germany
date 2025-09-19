import type { Market } from '../types';
import { formatDateRange, formatDate } from '../utils/date';

interface MarketDetailProps {
  market: Market | null;
}

export function MarketDetail({ market }: MarketDetailProps) {
  if (!market) {
    return (
      <section aria-live="polite" className="market-detail">
        <p>マーケットを選択すると詳細が表示されます。</p>
      </section>
    );
  }

  const regionLabel = [market.country, market.region].filter(Boolean).join(' / ');
  const sources = market.sources ?? [];

  return (
    <section aria-live="polite" className="market-detail">
      <header>
        <p className="market-detail__region">{regionLabel}</p>
        <h2>{market.name.ja}</h2>
        <p className="market-detail__subtitle">{market.name.de ?? market.name.en}</p>
      </header>

      <dl>
        <div>
          <dt>国</dt>
          <dd>{market.country}</dd>
        </div>
        <div>
          <dt>地域</dt>
          <dd>{market.region}</dd>
        </div>
        <div>
          <dt>開催都市</dt>
          <dd>{market.city}</dd>
        </div>
        <div>
          <dt>会場</dt>
          <dd>{market.venue}</dd>
        </div>
        {market.address && (
          <div>
            <dt>住所</dt>
            <dd>{market.address}</dd>
          </div>
        )}
        <div>
          <dt>開催期間</dt>
          <dd>
            {formatDateRange(market.period.start, market.period.end)}
            {market.period.note && (
              <span className="market-detail__note">（{market.period.note}）</span>
            )}
          </dd>
        </div>
        {market.opening_hours && (
          <div>
            <dt>営業時間</dt>
            <dd>{market.opening_hours}</dd>
          </div>
        )}
        <div>
          <dt>ステータス</dt>
          <dd>{statusToLabel(market.status)}</dd>
        </div>
        <div>
          <dt>最終確認日</dt>
          <dd>{formatDate(market.last_verified)}</dd>
        </div>
        {market.url ? (
          <div>
            <dt>公式リンク</dt>
            <dd>
              <a href={market.url} target="_blank" rel="noopener noreferrer">
                公式サイトを開く
              </a>
            </dd>
          </div>
        ) : (
          <div>
            <dt>公式リンク</dt>
            <dd>出典にURLが記載されていません</dd>
          </div>
        )}
        {sources.length > 0 && (
          <div>
            <dt>参照リンク</dt>
            <dd>
              {sources.map((src, index) => (
                <span key={src}>
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    リンク{index + 1}
                  </a>
                  {index < sources.length - 1 && ' / '}
                </span>
              ))}
            </dd>
          </div>
        )}
        {market.notes && (
          <div>
            <dt>補足</dt>
            <dd>{market.notes}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

function statusToLabel(status: Market['status']): string {
  switch (status) {
    case 'scheduled':
      return '開催予定';
    case 'ongoing':
      return '開催中';
    case 'ended':
      return '終了';
    default:
      return '不明';
  }
}
