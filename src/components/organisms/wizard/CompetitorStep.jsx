import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const CompetitorStep = ({ data, onChange }) => {
  const [competitorData, setCompetitorData] = useState({
    competitors: [],
    ...data.competitors
  })

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    website: '',
    positioning: '',
    strengths: '',
    weaknesses: ''
  })

  useEffect(() => {
    onChange({ competitors: competitorData })
  }, [competitorData, onChange])

  const handleAddCompetitor = () => {
    if (newCompetitor.name.trim()) {
      const competitor = {
        id: Date.now(),
        ...newCompetitor,
        strengths: newCompetitor.strengths.split(',').map(s => s.trim()).filter(s => s),
        weaknesses: newCompetitor.weaknesses.split(',').map(s => s.trim()).filter(s => s)
      }
      
      setCompetitorData(prev => ({
        ...prev,
        competitors: [...prev.competitors, competitor]
      }))
      
      setNewCompetitor({
        name: '',
        website: '',
        positioning: '',
        strengths: '',
        weaknesses: ''
      })
    }
  }

  const handleRemoveCompetitor = (id) => {
    setCompetitorData(prev => ({
      ...prev,
      competitors: prev.competitors.filter(c => c.id !== id)
    }))
  }

  const handleNewCompetitorChange = (field, value) => {
    setNewCompetitor(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <WizardStep
      title="Competitor Analysis"
      description="Identify your main competitors to understand your market position"
    >
      <div className="space-y-8">
        {/* Existing Competitors */}
        {competitorData.competitors.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
              <ApperIcon name="Users" className="w-5 h-5 text-brand-primary" />
              <span>Identified Competitors</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitorData.competitors.map((competitor) => (
                <motion.div
                  key={competitor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-secondary/20 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Building2" className="w-4 h-4 text-brand-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-200">{competitor.name}</h4>
                        {competitor.website && (
                          <p className="text-xs text-slate-400">{competitor.website}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCompetitor(competitor.id)}
                      className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {competitor.positioning && (
                    <div className="mb-3">
                      <p className="text-sm text-slate-300">{competitor.positioning}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {competitor.strengths.slice(0, 2).map((strength, i) => (
                          <span key={i} className="px-2 py-1 bg-brand-success/20 text-brand-success text-xs rounded">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Weaknesses</p>
                      <div className="flex flex-wrap gap-1">
                        {competitor.weaknesses.slice(0, 2).map((weakness, i) => (
                          <span key={i} className="px-2 py-1 bg-brand-error/20 text-brand-error text-xs rounded">
                            {weakness}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Competitor */}
        <div className="bg-brand-surface rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
            <ApperIcon name="Plus" className="w-5 h-5 text-brand-primary" />
            <span>Add Competitor</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                value={newCompetitor.name}
                onChange={(e) => handleNewCompetitorChange('name', e.target.value)}
                placeholder="Competitor name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                type="url"
                className="form-input"
                value={newCompetitor.website}
                onChange={(e) => handleNewCompetitorChange('website', e.target.value)}
                placeholder="https://competitor.com"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label className="form-label">Market Positioning</label>
              <textarea
                className="form-textarea"
                value={newCompetitor.positioning}
                onChange={(e) => handleNewCompetitorChange('positioning', e.target.value)}
                placeholder="How does this competitor position themselves in the market?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Strengths</label>
              <input
                type="text"
                className="form-input"
                value={newCompetitor.strengths}
                onChange={(e) => handleNewCompetitorChange('strengths', e.target.value)}
                placeholder="Enter strengths separated by commas"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weaknesses</label>
              <input
                type="text"
                className="form-input"
                value={newCompetitor.weaknesses}
                onChange={(e) => handleNewCompetitorChange('weaknesses', e.target.value)}
                placeholder="Enter weaknesses separated by commas"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddCompetitor}
              disabled={!newCompetitor.name.trim()}
              className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Competitor</span>
            </motion.button>
          </div>
        </div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1">
              <ApperIcon name="Brain" className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-medium text-slate-200 mb-2">AI Analysis</h3>
              <p className="text-sm text-slate-400">
                {competitorData.competitors.length > 0 ? (
                  `Based on ${competitorData.competitors.length} competitor${competitorData.competitors.length > 1 ? 's' : ''} analyzed, 
                  we'll identify market gaps and positioning opportunities for your brand.`
                ) : (
                  'Add at least 2-3 main competitors to get comprehensive market analysis and positioning recommendations.'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </WizardStep>
  )
}

export default CompetitorStep