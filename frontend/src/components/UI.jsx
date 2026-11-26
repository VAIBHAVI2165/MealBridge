import { AlertCircle, LoaderCircle } from 'lucide-react'
export function PageHeader({ title, subtitle, action }) { return <div className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div> }
export function Card({ children, className='' }) { return <section className={'card '+className}>{children}</section> }
export function StatusBadge({ status }) { const key = String(status||'pending').toLowerCase().replaceAll(' ','-'); return <span className={'status status-'+key}>{status}</span> }
export function EmptyState({ title='Nothing here yet', description='Items will appear here when available.' }) { return <div className="empty-state"><div className="empty-icon">⌂</div><b>{title}</b><p>{description}</p></div> }
export function ErrorBanner({ message='Something went wrong. Please try again.' }) { return <div className="error-banner"><AlertCircle size={17}/>{message}</div> }
export function LoadingState() { return <div className="loading-state"><LoaderCircle className="spin"/><span>Loading…</span></div> }
export function DemoNotice() { return <div className="demo-notice">Prototype preview · Data shown is illustrative demo data</div> }