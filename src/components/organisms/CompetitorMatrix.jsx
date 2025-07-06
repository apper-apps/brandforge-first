import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CompetitorMatrix = ({ competitors, selectedCompetitors }) => {
  const criteria = [
    { id: 'name', label: 'Company', width: 'w-32' },
    { id: 'marketPosition', label: 'Market Position', width: 'w-24' },
    { id: 'brandStrength', label: 'Brand Strength', width: 'w-24' },
    { id: 'digitalPresence', label: 'Digital Presence', width: 'w-24' },
    { id: 'innovation', label: 'Innovation', width: 'w-24' },
    { id: 'customerLoyalty', label: 'Customer Loyalty', width: 'w-24' },
    { id: 'threatLevel', label: 'Threat Level', width: 'w-24' },
  ]

  const renderRatingStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < (rating || 3) ? 'bg-brand-primary' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'high': return 'bg-brand-error/20 text-brand-error'
      case 'medium': return 'bg-brand-warning/20 text-brand-warning'
      case 'low': return 'bg-brand-success/20 text-brand-success'
      default: return 'bg-slate-600/20 text-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-surface rounded-xl p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-200">Competitive Matrix</h2>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <ApperIcon name="Info" className="w-4 h-4" />
          <span>Compare selected competitors</span>
        </div>
      </div>

      <div className="min-w-full">
        {/* Header */}
        <div className="flex items-center space-x-4 pb-4 border-b border-slate-700/50">
          {criteria.map((criterion) => (
            <div key={criterion.id} className={`${criterion.width} text-sm font-medium text-slate-400`}>
              {criterion.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-4 mt-4">
          {competitors.filter(c => selectedCompetitors.includes(c.Id)).map((competitor) => (
            <motion.div
              key={competitor.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="w-32 flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Building2" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-200">{competitor.name}</p>
                  <p className="text-xs text-slate-400">{competitor.industry}</p>
                </div>
              </div>
              
              <div className="w-24 flex justify-center">
                {renderRatingStars(competitor.marketPosition)}
              </div>
              
              <div className="w-24 flex justify-center">
                {renderRatingStars(competitor.brandStrength)}
              </div>
              
              <div className="w-24 flex justify-center">
                {renderRatingStars(competitor.digitalPresence)}
              </div>
              
              <div className="w-24 flex justify-center">
                {renderRatingStars(competitor.innovation)}
              </div>
              
              <div className="w-24 flex justify-center">
                {renderRatingStars(competitor.customerLoyalty)}
              </div>
              
              <div className="w-24 flex justify-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getThreatLevelColor(competitor.threatLevel)}`}>
                  {competitor.threatLevel || 'Low'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CompetitorMatrix