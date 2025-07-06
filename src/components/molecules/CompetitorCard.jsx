import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CompetitorCard = ({ competitor, isSelected, onToggle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-brand-surface rounded-xl p-6 hover:shadow-lg transition-all duration-200 border cursor-pointer ${
        isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-700/50'
      }`}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Building2" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">{competitor.name}</h3>
            <p className="text-sm text-slate-400">{competitor.industry}</p>
          </div>
        </div>
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          isSelected 
            ? 'border-brand-primary bg-brand-primary' 
            : 'border-slate-600'
        }`}>
          {isSelected && <ApperIcon name="Check" className="w-3 h-3 text-white" />}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Market Position</span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (competitor.marketPosition || 3) ? 'bg-brand-primary' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Brand Strength</span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (competitor.brandStrength || 4) ? 'bg-brand-secondary' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Threat Level</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            competitor.threatLevel === 'high' ? 'bg-brand-error/20 text-brand-error' :
            competitor.threatLevel === 'medium' ? 'bg-brand-warning/20 text-brand-warning' :
            'bg-brand-success/20 text-brand-success'
          }`}>
            {competitor.threatLevel || 'Low'}
          </span>
        </div>
      </div>

      {/* Strengths */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-200">Key Strengths</h4>
        <div className="flex flex-wrap gap-2">
          {(competitor.strengths || ['Innovation', 'Marketing']).slice(0, 3).map((strength, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CompetitorCard