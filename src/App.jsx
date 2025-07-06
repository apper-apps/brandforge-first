import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/Layout'
import Dashboard from '@/components/pages/Dashboard'
import BrandWizard from '@/components/pages/BrandWizard'
import CompetitiveIntel from '@/components/pages/CompetitiveIntel'
import AssetLibrary from '@/components/pages/AssetLibrary'
import Analytics from '@/components/pages/Analytics'
import Settings from '@/components/pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-brand-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="brand-wizard" element={<BrandWizard />} />
          <Route path="competitive-intel" element={<CompetitiveIntel />} />
          <Route path="assets" element={<AssetLibrary />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App