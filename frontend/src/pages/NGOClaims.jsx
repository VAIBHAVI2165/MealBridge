import { PageHeader, Card, DemoNotice, StatusBadge } from '../components/UI'
import { demoClaims } from '../data/demo'
import { Search, ClipboardList } from 'lucide-react'
import { useState } from 'react'
export default function NGOClaims(){
 const [q,setQ]=useState('')
 const list=demoClaims.filter(c=>`${c.id} ${c.food} ${c.provider}`.toLowerCase().includes(q.toLowerCase()))
 return <><PageHeader title="My claims" subtitle="Track requests and delivery progress in one place."/><DemoNotice/><Card><div className="table-toolbar"><div className="searchbox"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search claims"/></div><span className="count-label">{list.length} claims</span></div><div className="table-wrap"><table><thead><tr><th>Claim ID</th><th>Food</th><th>Provider</th><th>Plates</th><th>Delivery partner</th><th>Status</th></tr></thead><tbody>{list.map(c=><tr key={c.id}><td className="table-id">{c.id}</td><td><b>{c.food}</b><small>{c.claimed}</small></td><td>{c.provider}</td><td>{c.plates}</td><td>{c.partner}</td><td><StatusBadge status={c.status}/></td></tr>)}</tbody></table></div></Card><Card className="info-card"><ClipboardList/><div><b>Live status updates</b><p>Status changes will appear here automatically when the WebSocket connection is enabled in the backend integration.</p></div></Card></>
}