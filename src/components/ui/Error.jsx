import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry }) => {
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
          className="w-16 h-16 bg-brand-error/20 rounded-full flex items-center justify-center mx-auto"
        >
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-brand-error" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-200">Oops! Something went wrong</h3>
          <p className="text-slate-400 max-w-md">{message}</p>
        </div>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Error