export type MarketStatus = 'scheduled' | 'ongoing' | 'ended' | 'unknown';

export interface MarketPeriod {
  start: string;
  end: string;
  note?: string;
  is_estimated?: boolean;
}

export interface MarketName {
  ja: string;
  de?: string;
  en?: string;
}

export interface MarketCoordinates {
  lat: number;
  lng: number;
}

export interface Market {
  id: string;
  slug: string;
  year: number;
  name: MarketName;
  city: string;
  region: string;
  venue: string;
  address?: string;
  coordinates: MarketCoordinates;
  period: MarketPeriod;
  url: string | null;
  status: MarketStatus;
  opening_hours?: string;
  last_verified: string;
  notes?: string;
}

export interface MarketsDataset {
  version: string;
  source: string;
  generated_at: string;
  markets: Market[];
}
