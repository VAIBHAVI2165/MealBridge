import { PageHeader, Card, DemoNotice } from '../components/UI'
import MapView from '../components/MapView'
import { demoMapPoints } from '../data/demo'
import { MapPin, Leaf, Truck, Users } from 'lucide-react'
export default function AdminMap(){
 return <><PageHeader title="Operations map" subtitle="A geographic view of the MealBridge demo network."/><DemoNotice/><div className="stats-row"><Card className="stat-card"><small>Providers</small><strong>6</strong><span><Leaf size={14}/> Seeded demo entities</span></Card><Card className="stat-card"><small>NGOs</small><strong>4</strong><span><Users size={14}/> Seeded demo entities</span></Card><Card className="stat-card"><small>Delivery partners</small><strong>3</strong><span><Truck size={14}/> Seeded demo entities</span></Card></div><Card className="map-card"><div className="section-heading"><div><h2>All active entities</h2><p className="muted">Greater Noida demo dataset</p></div></div><MapView points={demoMapPoints} height={500}/><div className="map-legend"><span><i className="dot green"/> Providers</span><span><i className="dot orange"/> NGOs</span><span><i className="dot blue"/> Partners</span></div></Card></>
}