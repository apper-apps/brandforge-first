import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onMenuClick }) => {
  const [notifications] = useState([
    { id: 1, type: 'success', message: 'Brand strategy completed for TechCorp' },
    { id: 2, type: 'info', message: 'New competitor analysis available' },
    { id: 3, type: 'warning', message: 'Brand guidelines need review' },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-brand-surface border-b border-slate-700/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Mobile menu and breadcrumb */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors lg:hidden"
        >
          <ApperIcon name="Menu" className="w-5 h-5 text-slate-400" />
        </button>
        
        <div className="hidden sm:flex items-center space-x-2 text-sm">
          <span className="text-slate-400">Dashboard</span>
          <ApperIcon name="ChevronRight" className="w-4 h-4 text-slate-500" />
          <span className="text-slate-200">Overview</span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-2">
          <ApperIcon name="Search" className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search brands, assets..."
            className="bg-transparent text-sm text-slate-200 placeholder-slate-400 focus:outline-none w-64"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors relative"
          >
            <ApperIcon name="Bell" className="w-5 h-5 text-slate-400" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center text-xs font-medium text-white">
                {notifications.length}
              </span>
            )}
          </motion.button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-brand-surface border border-slate-700/50 rounded-xl shadow-2xl z-50"
            >
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="font-medium text-slate-200">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-slate-700/50 last:border-0">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-brand-success' :
                        notification.type === 'warning' ? 'bg-brand-warning' :
                        'bg-brand-info'
                      }`} />
                      <p className="text-sm text-slate-300">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* User menu */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="User" className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-200">Brand Manager</p>
            <p className="text-xs text-slate-400">Premium Plan</p>
          </div>
        </motion.button>
      </div>
    </header>
  )
}

export default Header