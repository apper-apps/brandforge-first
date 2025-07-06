import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'brand_created': return 'Plus'
      case 'strategy_completed': return 'CheckCircle'
      case 'assets_generated': return 'Image'
      case 'competitor_added': return 'Users'
      case 'report_generated': return 'FileText'
      default: return 'Activity'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'brand_created': return 'text-brand-primary bg-brand-primary/20'
      case 'strategy_completed': return 'text-brand-success bg-brand-success/20'
      case 'assets_generated': return 'text-brand-accent bg-brand-accent/20'
      case 'competitor_added': return 'text-brand-warning bg-brand-warning/20'
      case 'report_generated': return 'text-brand-info bg-brand-info/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-3 p-3 hover:bg-slate-800/50 rounded-lg transition-colors"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
        <ApperIcon name={getActivityIcon(activity.type)} className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-200">{activity.message}</p>
        <p className="text-xs text-slate-400">{activity.timestamp}</p>
      </div>
    </motion.div>
  )
}

export default ActivityItem