
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './components/Shell'
import ProtectedRoute from './components/ProtectedRoute'

import NewListing from './pages/NewListing'
import NGODashboard from './pages/NGODashboard'
import NGOClaims from './pages/NGOClaims'
import PartnerDashboard from './pages/PartnerDashboard'
import DeliveryDetail from './pages/DeliveryDetail'
import AdminMap from './pages/AdminMap'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/ngo" replace />} />

        <Route
          path="/provider/new-listing"
          element={
            <ProtectedRoute roles={['provider']}>
              <NewListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo"
          element={
            <ProtectedRoute roles={['ngo']}>
              <NGODashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/claims"
          element={
            <ProtectedRoute roles={['ngo']}>
              <NGOClaims />
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner"
          element={
            <ProtectedRoute roles={['partner']}>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner/delivery/:id"
          element={
            <ProtectedRoute roles={['partner']}>
              <DeliveryDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/map"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminMap />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
