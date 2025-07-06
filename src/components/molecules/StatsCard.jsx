import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StatsCard = ({ title, value, icon, color = 'primary', trend }) => {
  const colorClasses = {
    primary: 'from-brand-primary/20 to-brand-primary/10 border-brand-primary/30 text-brand-primary',
    secondary: 'from-brand-secondary/20 to-brand-secondary/10 border-brand-secondary/30 text-brand-secondary',
    accent: 'from-brand-accent/20 to-brand-accent/10 border-brand-accent/30 text-brand-accent',
    success: 'from-brand-success/20 to-brand-success/10 border-brand-success/30 text-brand-success',
    warning: 'from-brand-warning/20 to-brand-warning/10 border-brand-warning/30 text-brand-warning',
    error: 'from-brand-error/20 to-brand-error/10 border-brand-error/30 text-brand-error',
    info: 'from-brand-info/20 to-brand-info/10 border-brand-info/30 text-brand-info',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-slate-200">{value}</p>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend.startsWith('+') ? 'text-brand-success' : 'text-brand-error'
              }`}>
                <ApperIcon 
                  name={trend.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                  className="w-4 h-4 mr-1" 
                />
                {trend}
              </div>
            )}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color === 'primary' ? 'bg-brand-primary/20' : 
          color === 'secondary' ? 'bg-brand-secondary/20' :
          color === 'accent' ? 'bg-brand-accent/20' :
          color === 'success' ? 'bg-brand-success/20' :
          color === 'warning' ? 'bg-brand-warning/20' :
          color === 'error' ? 'bg-brand-error/20' :
          'bg-brand-info/20'}`}>
          <ApperIcon name={icon} className={`w-6 h-6 ${colorClasses[color].split(' ')[3]}`} />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard