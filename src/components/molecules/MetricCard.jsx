import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const MetricCard = ({ title, value, unit, trend, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-brand-primary bg-brand-primary/20',
    secondary: 'text-brand-secondary bg-brand-secondary/20',
    accent: 'text-brand-accent bg-brand-accent/20',
    success: 'text-brand-success bg-brand-success/20',
    warning: 'text-brand-warning bg-brand-warning/20',
    error: 'text-brand-error bg-brand-error/20',
    info: 'text-brand-info bg-brand-info/20',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-brand-surface rounded-xl p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <ApperIcon name={icon} className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-slate-200">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
      
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-sm ${
          trend > 0 ? 'text-brand-success' : trend < 0 ? 'text-brand-error' : 'text-slate-400'
        }`}>
          {trend !== 0 && (
            <ApperIcon 
              name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
              className="w-4 h-4 mr-1" 
            />
          )}
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </motion.div>
  )
}

export default MetricCard