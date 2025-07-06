import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const AssetCard = ({ asset, isSelected, onToggle }) => {
  const getAssetIcon = (type) => {
    switch (type) {
      case 'logo': return 'Zap'
      case 'business-card': return 'CreditCard'
      case 'social-media': return 'Share2'
      case 'presentation': return 'Presentation'
      case 'email-signature': return 'Mail'
      case 'marketing': return 'Megaphone'
      default: return 'Image'
    }
  }

  const getAssetColor = (type) => {
    switch (type) {
      case 'logo': return 'from-brand-primary to-brand-secondary'
      case 'business-card': return 'from-brand-secondary to-brand-accent'
      case 'social-media': return 'from-brand-accent to-brand-primary'
      case 'presentation': return 'from-brand-info to-brand-primary'
      case 'email-signature': return 'from-brand-success to-brand-info'
      case 'marketing': return 'from-brand-warning to-brand-accent'
      default: return 'from-slate-600 to-slate-500'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-brand-surface rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border cursor-pointer ${
        isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-700/50'
      }`}
      onClick={onToggle}
    >
      {/* Preview */}
      <div className={`h-32 bg-gradient-to-br ${getAssetColor(asset.type)} flex items-center justify-center relative`}>
        <ApperIcon name={getAssetIcon(asset.type)} className="w-12 h-12 text-white/80" />
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-slate-200">{asset.name}</h3>
          <span className="text-xs text-slate-400 capitalize">{asset.type.replace('-', ' ')}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
          <span>Version {asset.version}</span>
          <span>{asset.format || 'PNG'}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1"
          >
            <ApperIcon name="Download" className="w-4 h-4" />
            <span>Download</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
          >
            <ApperIcon name="Eye" className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default AssetCard