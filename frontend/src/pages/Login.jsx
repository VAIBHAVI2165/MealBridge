import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
export default function Login(){
 const {setUser}=useAuth(),nav=useNavigate()
 return <div className="login-page"><div className="login-card"><div className="brand login-brand"><span className="brand-icon"><Leaf/></span><span>MealBridge</span></div><h1>Welcome back</h1><p>Prototype sign-in: choose a demo role to preview your assigned workspace.</p><div className="role-buttons">{['provider','ngo','partner','admin'].map(role=><button key={role} className="btn-secondary full" onClick={()=>{setUser({id:1,name:'Demo '+role,role,token:null});nav(role==='provider'?'/provider/new-listing':role==='ngo'?'/ngo':role==='partner'?'/partner':'/admin/map')}}>Continue as {role}</button>)}</div><small className="demo-caption">Demo only · Real authentication connects to the backend API</small></div></div>
}