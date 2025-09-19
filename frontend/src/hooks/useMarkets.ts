import { useEffect, useState } from 'react';
import type { MarketsDataset, Market } from '../types';

interface UseMarketsResult {
  markets: Market[];
  dataset: MarketsDataset | null;
  loading: boolean;
  error: string | null;
}

export function useMarkets(): UseMarketsResult {
  const [dataset, setDataset] = useState<MarketsDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const response = await fetch('/data/markets.json', {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = (await response.json()) as MarketsDataset;
        setDataset(json);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message ?? '未知のエラーが発生しました');
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    markets: dataset?.markets ?? [],
    dataset,
    loading,
    error,
  };
}
