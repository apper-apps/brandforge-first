import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import CompetitorCard from '@/components/molecules/CompetitorCard'
import CompetitorMatrix from '@/components/organisms/CompetitorMatrix'
import { competitorService } from '@/services/api/competitorService'

const CompetitiveIntel = () => {
  const [competitors, setCompetitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCompetitors, setSelectedCompetitors] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'matrix'

  useEffect(() => {
    loadCompetitors()
  }, [])

  const loadCompetitors = async () => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const data = await competitorService.getAll()
      setCompetitors(data)
    } catch (err) {
      setError('Failed to load competitive intelligence data')
    } finally {
      setLoading(false)
    }
  }

  const handleCompetitorToggle = (competitorId) => {
    setSelectedCompetitors(prev => 
      prev.includes(competitorId)
        ? prev.filter(id => id !== competitorId)
        : [...prev, competitorId]
    )
  }

  const handleAddCompetitor = () => {
    // Add new competitor functionality
    console.log('Add new competitor')
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadCompetitors} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Competitive Intelligence
          </h1>
          <p className="text-slate-400 mt-2">
            Analyze your competitive landscape and identify opportunities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center bg-brand-surface rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ApperIcon name="Grid3x3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'matrix'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ApperIcon name="Table" className="w-4 h-4" />
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCompetitor}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Add Competitor</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-brand-surface rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-400">Filter by:</span>
          </div>
          
          <select className="form-select">
            <option value="">All Industries</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="retail">Retail</option>
          </select>
          
          <select className="form-select">
            <option value="">All Sizes</option>
            <option value="startup">Startup</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          
          <select className="form-select">
            <option value="">All Regions</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="global">Global</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {competitors.length === 0 ? (
        <Empty
          title="No competitors tracked yet"
          description="Start building your competitive intelligence by adding your first competitor"
          icon="Search"
          actionText="Add Competitor"
          onAction={handleAddCompetitor}
        />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitors.map((competitor) => (
                <CompetitorCard
                  key={competitor.Id}
                  competitor={competitor}
                  isSelected={selectedCompetitors.includes(competitor.Id)}
                  onToggle={() => handleCompetitorToggle(competitor.Id)}
                />
              ))}
            </div>
          ) : (
            <CompetitorMatrix
              competitors={competitors}
              selectedCompetitors={selectedCompetitors}
            />
          )}
        </>
      )}

      {/* Insights Panel */}
      {selectedCompetitors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Competitive Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-brand-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-primary mb-2">
                {selectedCompetitors.length}
              </div>
              <div className="text-sm text-slate-400">Selected Competitors</div>
            </div>
            <div className="text-center p-4 bg-brand-success/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-success mb-2">
                85%
              </div>
              <div className="text-sm text-slate-400">Market Coverage</div>
            </div>
            <div className="text-center p-4 bg-brand-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-warning mb-2">
                3
              </div>
              <div className="text-sm text-slate-400">Opportunity Gaps</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CompetitiveIntel