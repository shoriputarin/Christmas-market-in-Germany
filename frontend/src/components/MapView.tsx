import { useEffect, useMemo, useRef } from 'react';
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

  const markersRef = useRef(new Map<string, L.Marker>());

  const icons = useMemo(() => {
    const baseOptions = {
      iconSize: [28, 28] as [number, number],
      iconAnchor: [14, 27] as [number, number],
      popupAnchor: [0, -24] as [number, number],
    };

    const defaultIcon = L.divIcon({
      ...baseOptions,
      className: 'map-marker',
      html: '<span class="map-marker__inner"></span>',
    });

    const activeIcon = L.divIcon({
      ...baseOptions,
      className: 'map-marker map-marker--active',
      html: '<span class="map-marker__inner"></span>',
    });

    return { defaultIcon, activeIcon };
  }, []);

  useEffect(() => {
    if (!selectedMarketId) {
      return;
    }

    const marker = markersRef.current.get(selectedMarketId);
    marker?.openPopup();
  }, [selectedMarketId]);

  return (
    <div className="map-container" role="application" aria-label="地図表示">
      <MapContainer center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM} scrollWheelZoom className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {bounds && <FitBounds bounds={bounds} />}

        {markets.map((market) => (
          <Marker
            key={market.id}
            position={[market.coordinates.lat, market.coordinates.lng]}
            icon={market.id === selectedMarketId ? icons.activeIcon : icons.defaultIcon}
            ref={(markerInstance) => {
              if (markerInstance) {
                markersRef.current.set(market.id, markerInstance);
              } else {
                markersRef.current.delete(market.id);
              }
            }}
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
