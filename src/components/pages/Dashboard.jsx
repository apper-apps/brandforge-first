import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import StatsCard from '@/components/molecules/StatsCard'
import BrandCard from '@/components/molecules/BrandCard'
import ActivityItem from '@/components/molecules/ActivityItem'
import { brandService } from '@/services/api/brandService'

const Dashboard = () => {
  const navigate = useNavigate()
  const { brands } = useSelector(state => state.brand)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [stats, setStats] = useState({
    totalBrands: 0,
    completedStrategies: 0,
    activeProjects: 0,
    totalAssets: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const brandsData = await brandService.getAll()
      const activities = await brandService.getRecentActivity()
      
      setStats({
        totalBrands: brandsData.length,
        completedStrategies: brandsData.filter(b => b.status === 'completed').length,
        activeProjects: brandsData.filter(b => b.status === 'active').length,
        totalAssets: brandsData.reduce((sum, b) => sum + (b.assets?.length || 0), 0)
      })
      
      setRecentActivity(activities)
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBrand = () => {
    navigate('/brand-wizard')
  }

  if (loading) {
    return <Loading type="dashboard" />
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Brand Strategy Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Manage your brand portfolio and track performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateBrand}
          className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>Create Brand Strategy</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Brands"
          value={stats.totalBrands}
          icon="Building2"
          color="primary"
          trend="+12%"
        />
        <StatsCard
          title="Completed Strategies"
          value={stats.completedStrategies}
          icon="CheckCircle"
          color="success"
          trend="+8%"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon="Clock"
          color="warning"
          trend="+3%"
        />
        <StatsCard
          title="Total Assets"
          value={stats.totalAssets}
          icon="Image"
          color="accent"
          trend="+25%"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-200">Brand Portfolio</h2>
            <button className="text-brand-primary hover:text-brand-secondary transition-colors">
              View All
            </button>
          </div>
          
          {brands.length === 0 ? (
            <Empty
              title="No brands created yet"
              description="Start building your brand strategy by creating your first brand"
              icon="Sparkles"
              actionText="Create Brand Strategy"
              onAction={handleCreateBrand}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brands.slice(0, 4).map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-200">Recent Activity</h2>
          <div className="bg-brand-surface rounded-xl p-6">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Activity" className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-brand-surface rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/brand-wizard')}
            className="p-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-200 text-left"
          >
            <ApperIcon name="Sparkles" className="w-6 h-6 text-brand-primary mb-2" />
            <h3 className="font-medium text-slate-200">Brand Strategy Wizard</h3>
            <p className="text-sm text-slate-400">Create comprehensive brand strategy</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/competitive-intel')}
            className="p-4 bg-gradient-to-r from-brand-secondary/10 to-brand-accent/10 border border-brand-secondary/20 rounded-lg hover:from-brand-secondary/20 hover:to-brand-accent/20 transition-all duration-200 text-left"
          >
            <ApperIcon name="Search" className="w-6 h-6 text-brand-secondary mb-2" />
            <h3 className="font-medium text-slate-200">Competitive Analysis</h3>
            <p className="text-sm text-slate-400">Analyze market positioning</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/assets')}
            className="p-4 bg-gradient-to-r from-brand-accent/10 to-brand-primary/10 border border-brand-accent/20 rounded-lg hover:from-brand-accent/20 hover:to-brand-primary/20 transition-all duration-200 text-left"
          >
            <ApperIcon name="Image" className="w-6 h-6 text-brand-accent mb-2" />
            <h3 className="font-medium text-slate-200">Generate Assets</h3>
            <p className="text-sm text-slate-400">Create visual identity</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard