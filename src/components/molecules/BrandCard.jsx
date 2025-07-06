import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const BrandCard = ({ brand }) => {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-brand-success bg-brand-success/20'
      case 'active': return 'text-brand-warning bg-brand-warning/20'
      case 'draft': return 'text-slate-400 bg-slate-400/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  const handleEdit = () => {
    navigate('/brand-wizard')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-brand-surface rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-slate-700/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Building2" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">{brand.name}</h3>
            <p className="text-sm text-slate-400">{brand.industry}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.status)}`}>
          {brand.status}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Archetype</span>
          <span className="text-slate-200">{brand.archetype || 'Not selected'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Assets</span>
          <span className="text-slate-200">{brand.assets?.length || 0} generated</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last Updated</span>
          <span className="text-slate-200">{brand.lastUpdated || 'Today'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEdit}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 text-sm font-medium"
        >
          Edit Strategy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
        >
          View Assets
        </motion.button>
      </div>
    </motion.div>
  )
}

export default BrandCard