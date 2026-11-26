# MealBridge — Member 3 frontend starter

## Scope
Member 3 frontend pages and shared UI:
- `/provider/new-listing`
- `/ngo`
- `/ngo/claims`
- `/partner`
- `/partner/delivery/:id`
- `/admin/map`

Includes shell, role sidebar, demo login role picker, shared components, Leaflet maps, responsive styles, and an Axios client.

## Setup
```bash
npm install
npm run dev
```

## Backend connection
Create `.env`:
```env
VITE_API_URL=http://localhost:8000
```
`api.js` includes the bearer-token hook, but authentication is currently demo-only. Replace demo data and placeholder alerts with the actual backend endpoints and WebSocket integration.

## Demo login
Open `/login` and choose a role. The current context stores a prototype user in React memory only (no localStorage).

## Important
Map locations and listing/delivery data are synthetic demonstration data. No backend persistence is connected yet.
