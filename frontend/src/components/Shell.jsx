import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Leaf, MapPin, PackagePlus, ClipboardList, Truck, Map, LogOut, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
const roleLinks = {
  provider: [{ to: '/provider/new-listing', label: 'Post food', icon: PackagePlus }],
  ngo: [{ to: '/ngo', label: 'Find food', icon: MapPin }, { to: '/ngo/claims', label: 'My claims', icon: ClipboardList }],
  partner: [{ to: '/partner', label: 'Deliveries', icon: Truck }],
  admin: [{ to: '/admin/map', label: 'Operations map', icon: Map }]
}
export default function Shell() {
  const { user, setUser } = useAuth()
  const nav = useNavigate()
  const links = roleLinks[user?.role] || roleLinks.ngo
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon"><Leaf size={22}/></span><span>MealBridge</span></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} className={({isActive}) => 'side-link '+(isActive?'active':'')}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="user-card"><div className="avatar">{user?.name?.[0] || 'M'}</div><div><b>{user?.name || 'Demo User'}</b><small>{user?.role || 'ngo'} account</small></div></div><button className="side-link logout" onClick={() => { setUser(null); nav('/login') }}><LogOut size={18}/>Log out</button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="mobile-brand"><Leaf size={19}/> MealBridge</div><div className="topbar-right"><span className="demo-pill">DEMO DATA</span><span className="user-avatar">{user?.name?.[0] || 'M'}</span></div></header><div className="page-wrap"><Outlet /></div></main>
  </div>
}