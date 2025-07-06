import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SettingsSection = ({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-surface rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center">
          <ApperIcon name={icon} className="w-5 h-5 text-brand-primary" />
        </div>
        <h2 className="text-xl font-semibold text-slate-200">{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}

export default SettingsSection