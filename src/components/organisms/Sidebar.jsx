import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'BarChart3' },
    { name: 'Brand Strategy', href: '/brand-wizard', icon: 'Sparkles' },
    { name: 'Competitive Intel', href: '/competitive-intel', icon: 'Search' },
    { name: 'Asset Library', href: '/assets', icon: 'Image' },
    { name: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ]

  return (
    <div className="h-full bg-brand-surface border-r border-slate-700/50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-6 py-5 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display gradient-text">BrandForge</h1>
            <p className="text-xs text-slate-400">AI Strategy Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-brand-primary border border-brand-primary/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon
                  name={item.icon}
                  className={`w-5 h-5 mr-3 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}
                />
                {item.name}
              </motion.div>
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
  )
}

export default Sidebar