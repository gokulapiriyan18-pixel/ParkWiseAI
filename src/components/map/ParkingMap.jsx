import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getNoParkingZones, getAvailabilityStatus, formatDistance } from '../../data/models'
import { calculateDistanceKm } from '../../utils/geoUtils'
import { useParking } from '../../context/ParkingContext'
import 'leaflet/dist/leaflet.css'

const CHENNAI_CENTER = [13.0827, 80.2707]

function createParkingIcon(status, pricing) {
  const colors = {
    available: '#22c55e',
    limited: '#eab308',
    full: '#ef4444',
  }

  const borderColor = pricing === 'free' ? '#4ADE80' : '#15803D'

  return L.divIcon({
    className: 'custom-parking-marker',
    html: `
      <div style="
        width: 28px;
        height: 28px;
        background: ${colors[status]};
        border: 3px solid ${borderColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

const destinationIcon = L.divIcon({
  className: 'destination-marker',
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #10B981, #059669);
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(34,197,94,0.5);
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
})

function MapBoundsController({ locations, destination }) {
  const map = useMap()

  useEffect(() => {
    if (locations.length === 0) return

    const bounds = L.latLngBounds([
      ...locations.map((loc) => [loc.latitude, loc.longitude]),
      [destination.latitude, destination.longitude],
    ])
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }, [locations, destination, map])

  return null
}

function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-[#22C55E]/20 bg-[#07130D]/90 p-4 shadow-xl backdrop-blur-xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Map Legend</p>
      <div className="space-y-2 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          Limited
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Full
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-[#4ADE80] bg-[#22C55E]" />
          Free zone border
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-[#15803D] bg-[#22C55E]" />
          Paid zone border
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500/40 border border-red-500" />
          No-Parking Zone
        </div>
      </div>
    </div>
  )
}

export default function ParkingMap() {
  const { parkingResults, aiResult, searchState, selectedDestination, parkeyPanelOpen } = useParking()
  const noParkingZones = useMemo(() => getNoParkingZones(), [])

  const displayLocations =
    searchState.hasSearched && parkingResults.length > 0 ? parkingResults : []

  const destination = selectedDestination

  return (
    <div className="relative h-[400px] overflow-hidden rounded-2xl border border-[#22C55E]/20 shadow-[0_0_30px_rgba(34,197,94,0.08)] sm:h-[500px]">
      <MapContainer
        center={CHENNAI_CENTER}
        zoom={12}
        className="h-full w-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsController locations={displayLocations} destination={destination} />

        <Marker
          position={[destination.latitude, destination.longitude]}
          icon={destinationIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>Your Destination</strong>
              <br />
              {destination.name}
            </div>
          </Popup>
        </Marker>

        {noParkingZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.35,
              weight: 2,
              dashArray: '6, 4',
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>⚠ No Parking Zone</strong>
                <br />
                {zone.name}
                <br />
                <span className="text-gray-600">{zone.description}</span>
              </div>
            </Popup>
          </Polygon>
        ))}

        {displayLocations.map((location) => {
          const availability = getAvailabilityStatus(location)
          const icon = createParkingIcon(availability, location.status)
          const isRecommended = parkeyPanelOpen && aiResult.topPick?.id === location.id
          const distanceKm =
            location.distance ??
            calculateDistanceKm(
              destination.latitude,
              destination.longitude,
              location.latitude,
              location.longitude
            )

          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={icon}
              zIndexOffset={isRecommended ? 1000 : 0}
            >
              <Popup>
                <div className="min-w-[200px] text-sm">
                  {isRecommended && (
                    <span className="mb-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                      ⭐ AI Recommended
                    </span>
                  )}
                  <strong className="block">{location.name}</strong>
                  <p className="mt-1 text-gray-600">
                    Distance: {formatDistance(distanceKm)}
                    <br />
                    Slots: {location.availableSlots}/{location.totalSlots}
                    <br />
                    Status: {location.status === 'free' ? 'Free' : 'Paid'}
                    <br />
                    AI Score:{' '}
                    {parkeyPanelOpen
                      ? aiResult.ranked.find((r) => r.id === location.id)?.aiScore ?? '—'
                      : '—'}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        })}

        {noParkingZones.map((zone) => {
          const centerLat =
            zone.coordinates.reduce((sum, c) => sum + c[0], 0) / zone.coordinates.length
          const centerLng =
            zone.coordinates.reduce((sum, c) => sum + c[1], 0) / zone.coordinates.length

          return (
            <CircleMarker
              key={`label-${zone.id}`}
              center={[centerLat, centerLng]}
              radius={0}
              pathOptions={{ opacity: 0, fillOpacity: 0 }}
            >
              <Popup>
                <strong>⚠ No Parking Zone</strong>
                <br />
                {zone.name}
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>

      <MapLegend />

      <div className="absolute right-4 top-4 z-[1000] rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 backdrop-blur-xl">
        ⚠ No Parking Zones highlighted in red
      </div>
    </div>
  )
}
