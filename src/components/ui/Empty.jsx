import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No data available',
  description = 'Get started by creating your first item',
  icon = 'Folder',
  actionText = 'Get Started',
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center space-y-6 p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center mx-auto"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-brand-primary" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
          <p className="text-slate-400 max-w-md">{description}</p>
        </div>

        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>{actionText}</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty