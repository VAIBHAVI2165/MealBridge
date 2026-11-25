import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader, Card, DemoNotice, StatusBadge } from '../components/UI'
import { demoDeliveries } from '../data/demo'
import MapView from '../components/MapView'
import { MapPin, PackageCheck, Truck } from 'lucide-react'
export default function DeliveryDetail(){
 const {id}=useParams(), nav=useNavigate()
 const delivery=demoDeliveries.find(d=>d.id===id)||demoDeliveries[0]
 const route=[[delivery.pickupLat,delivery.pickupLng],[delivery.dropLat,delivery.dropLng]]
 return <><PageHeader title={`Delivery ${delivery.id}`} subtitle="Pickup, drop-off and delivery progress."/><DemoNotice/><Card><div className="detail-header"><div><h2>{delivery.food}</h2><p className="muted">{delivery.plates} plates · Claim {delivery.claim}</p></div><StatusBadge status={delivery.status.replace('_',' ')}/></div><MapView height={390} route={route} points={[{id:'pick',label:'Pickup',kind:'provider',lat:delivery.pickupLat,lng:delivery.pickupLng,note:delivery.provider},{id:'drop',label:'Drop-off',kind:'ngo',lat:delivery.dropLat,lng:delivery.dropLng,note:delivery.recipient}]}/><div className="location-details"><div><MapPin className="pickup-color"/><small>Pickup</small><b>{delivery.pickup}</b><span>{delivery.provider}</span></div><div><MapPin className="drop-color"/><small>Drop-off</small><b>{delivery.drop}</b><span>{delivery.recipient}</span></div></div><div className="delivery-actions"><button className="btn-secondary" onClick={()=>alert('Prototype: PATCH /deliveries/'+delivery.id+'/status with picked_up') }><Truck size={17}/> Mark picked up</button><button className="btn-primary" onClick={()=>alert('Prototype: PATCH /deliveries/'+delivery.id+'/status with delivered')}><PackageCheck size={17}/> Mark delivered</button></div></Card></>
}