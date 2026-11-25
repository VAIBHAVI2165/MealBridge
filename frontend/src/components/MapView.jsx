import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { demoMapPoints } from '../data/demo'
const colors = { provider: '#2e7d57', ngo: '#df8b36', partner: '#637e91' }
function markerIcon(kind) {
  return L.divIcon({ className: 'custom-marker', html: `<span style="background:${colors[kind]};"></span>`, iconSize:[20,20], iconAnchor:[10,10] })
}
export default function MapView({ points=demoMapPoints, route=null, height=360 }) {
  const center = points.length ? [points[0].lat, points[0].lng] : [28.474,77.504]
  return <div className="map-frame" style={{height}}>
    <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{height:'100%',width:'100%'}}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {points.map(p => <Marker key={p.id} position={[p.lat,p.lng]} icon={markerIcon(p.kind)}><Popup><b>{p.label}</b><br/>{p.note}</Popup></Marker>)}
      {route && <Polyline positions={route} pathOptions={{color:'#2e7d57',weight:5,opacity:.8}}/>}
    </MapContainer>
  </div>
}