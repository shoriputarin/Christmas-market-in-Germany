import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Market } from '../types';

interface MapViewProps {
  markets: Market[];
  selectedMarketId: string | null;
  onSelect: (market: Market) => void;
}

const DEFAULT_POSITION: [number, number] = [51.163375, 10.447683]; // Germany centroid
const DEFAULT_ZOOM = 5;

export function MapView({ markets, selectedMarketId, onSelect }: MapViewProps) {
  const selectedMarket = markets.find((market) => market.id === selectedMarketId) ?? null;

  const bounds = useMemo(() => {
    if (markets.length === 0) {
      return null;
    }
    const latLngs = markets.map((market) => [market.coordinates.lat, market.coordinates.lng]) as [
      number,
      number
    ][];
    return L.latLngBounds(latLngs);
  }, [markets]);

  return (
    <div className="map-container" role="application" aria-label="地図表示">
      <MapContainer center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM} scrollWheelZoom className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {bounds && <FitBounds bounds={bounds} />}
        {selectedMarket && <FocusOnSelection market={selectedMarket} />}

        {markets.map((market) => (
          <Marker
            key={market.id}
            position={[market.coordinates.lat, market.coordinates.lng]}
            eventHandlers={{
              click: () => onSelect(market),
            }}
          >
            <Popup>
              <div className="map-popup">
                <strong>{market.name.ja}</strong>
                <p>{market.city}</p>
                <p>{market.venue}</p>
                {market.url ? (
                  <a href={market.url} target="_blank" rel="noopener noreferrer">
                    公式サイト
                  </a>
                ) : (
                  <span>公式サイト未確認</span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [map, bounds]);

  return null;
}

function FocusOnSelection({ market }: { market: Market }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([market.coordinates.lat, market.coordinates.lng], 11, {
      animate: true,
      duration: 0.75,
    });
  }, [map, market]);

  return null;
}
