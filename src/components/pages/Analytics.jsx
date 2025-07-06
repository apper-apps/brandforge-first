import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import MetricCard from '@/components/molecules/MetricCard'
import { analyticsService } from '@/services/api/analyticsService'

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ]

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const data = await analyticsService.getAnalytics(timeRange)
      setAnalytics(data)
    } catch (err) {
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  const brandPerformanceOptions = {
    chart: {
      type: 'line',
      height: 350,
      background: 'transparent',
      toolbar: { show: false },
    },
    theme: { mode: 'dark' },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#6366F1', '#8B5CF6', '#EC4899'],
    xaxis: {
      categories: analytics?.performance?.dates || [],
      labels: { style: { colors: '#94A3B8' } },
    },
    yaxis: {
      labels: { style: { colors: '#94A3B8' } },
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 3,
    },
    legend: {
      labels: { colors: '#94A3B8' },
    },
  }

  const brandPerformanceSeries = [
    {
      name: 'Brand Awareness',
      data: analytics?.performance?.awareness || []
    },
    {
      name: 'Engagement',
      data: analytics?.performance?.engagement || []
    },
    {
      name: 'Conversion',
      data: analytics?.performance?.conversion || []
    }
  ]

  const competitorAnalysisOptions = {
    chart: {
      type: 'radar',
      height: 350,
      background: 'transparent',
      toolbar: { show: false },
    },
    theme: { mode: 'dark' },
    xaxis: {
      categories: ['Brand Strength', 'Market Share', 'Innovation', 'Customer Loyalty', 'Digital Presence'],
    },
    colors: ['#6366F1', '#EC4899'],
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 4,
    },
    legend: {
      labels: { colors: '#94A3B8' },
    },
  }

  const competitorAnalysisSeries = [
    {
      name: 'Your Brand',
      data: analytics?.competitor?.yourBrand || []
    },
    {
      name: 'Top Competitor',
      data: analytics?.competitor?.topCompetitor || []
    }
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Brand Analytics
          </h1>
          <p className="text-slate-400 mt-2">
            Track performance and optimize your brand strategy
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="Download" className="w-5 h-5" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Brand Health Score"
          value={analytics?.metrics?.brandHealth || 0}
          unit="%"
          trend={analytics?.metrics?.brandHealthTrend || 0}
          icon="Heart"
          color="primary"
        />
        <MetricCard
          title="Market Position"
          value={analytics?.metrics?.marketPosition || 0}
          unit="/10"
          trend={analytics?.metrics?.marketPositionTrend || 0}
          icon="TrendingUp"
          color="success"
        />
        <MetricCard
          title="Competitive Advantage"
          value={analytics?.metrics?.competitiveAdvantage || 0}
          unit="%"
          trend={analytics?.metrics?.competitiveAdvantageTrend || 0}
          icon="Target"
          color="warning"
        />
        <MetricCard
          title="Brand Consistency"
          value={analytics?.metrics?.brandConsistency || 0}
          unit="%"
          trend={analytics?.metrics?.brandConsistencyTrend || 0}
          icon="CheckCircle"
          color="accent"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Brand Performance */}
        <div className="bg-brand-surface rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-200">Brand Performance</h2>
            <ApperIcon name="TrendingUp" className="w-5 h-5 text-brand-primary" />
          </div>
          {analytics?.performance && (
            <Chart
              options={brandPerformanceOptions}
              series={brandPerformanceSeries}
              type="line"
              height={350}
            />
          )}
        </div>

        {/* Competitor Analysis */}
        <div className="bg-brand-surface rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-200">Competitive Analysis</h2>
            <ApperIcon name="Target" className="w-5 h-5 text-brand-primary" />
          </div>
          {analytics?.competitor && (
            <Chart
              options={competitorAnalysisOptions}
              series={competitorAnalysisSeries}
              type="radar"
              height={350}
            />
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-brand-surface rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-6">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analytics?.insights?.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  insight.type === 'opportunity' ? 'bg-brand-success/20' :
                  insight.type === 'warning' ? 'bg-brand-warning/20' :
                  'bg-brand-info/20'
                }`}>
                  <ApperIcon
                    name={insight.type === 'opportunity' ? 'TrendingUp' : 
                          insight.type === 'warning' ? 'AlertTriangle' : 'Info'}
                    className={`w-4 h-4 ${
                      insight.type === 'opportunity' ? 'text-brand-success' :
                      insight.type === 'warning' ? 'text-brand-warning' :
                      'text-brand-info'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200 mb-2">{insight.title}</h3>
                  <p className="text-sm text-slate-400">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics