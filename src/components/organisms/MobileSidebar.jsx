import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'BarChart3' },
    { name: 'Brand Strategy', href: '/brand-wizard', icon: 'Sparkles' },
    { name: 'Competitive Intel', href: '/competitive-intel', icon: 'Search' },
    { name: 'Asset Library', href: '/assets', icon: 'Image' },
    { name: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-brand-surface border-r border-slate-700/50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Zap" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold font-display gradient-text">BrandForge</h1>
                    <p className="text-xs text-slate-400">AI Strategy Platform</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-brand-primary border border-brand-primary/30'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ApperIcon
                          name={item.icon}
                          className={`w-5 h-5 mr-3 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="px-4 py-6 border-t border-slate-700/50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                  <span>New Brand</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSidebar