import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import AssetCard from '@/components/molecules/AssetCard'
import AssetGenerator from '@/components/organisms/AssetGenerator'
import { assetService } from '@/services/api/assetService'

const AssetLibrary = () => {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAssets, setSelectedAssets] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [showGenerator, setShowGenerator] = useState(false)

  const assetTypes = [
    { value: 'all', label: 'All Assets' },
    { value: 'logo', label: 'Logos' },
    { value: 'business-card', label: 'Business Cards' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'email-signature', label: 'Email Signatures' },
    { value: 'marketing', label: 'Marketing Collateral' },
  ]

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const data = await assetService.getAll()
      setAssets(data)
    } catch (err) {
      setError('Failed to load asset library')
    } finally {
      setLoading(false)
    }
  }

  const handleAssetToggle = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const handleGenerateAssets = () => {
    setShowGenerator(true)
  }

  const handleDownloadSelected = () => {
    // Download selected assets
    console.log('Download selected assets:', selectedAssets)
  }

  const filteredAssets = filterType === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === filterType)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadAssets} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Asset Library
          </h1>
          <p className="text-slate-400 mt-2">
            Generate and manage your brand assets
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {selectedAssets.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadSelected}
              className="px-4 py-2 bg-brand-success text-white rounded-lg hover:bg-brand-success/90 transition-colors flex items-center space-x-2"
            >
              <ApperIcon name="Download" className="w-4 h-4" />
              <span>Download ({selectedAssets.length})</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateAssets}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="Sparkles" className="w-5 h-5" />
            <span>Generate Assets</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-brand-surface rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-400">Filter by type:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {assetTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type.value
                    ? 'bg-brand-primary text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      {filteredAssets.length === 0 ? (
        <Empty
          title="No assets generated yet"
          description="Start creating your brand assets with our AI-powered generator"
          icon="Image"
          actionText="Generate Assets"
          onAction={handleGenerateAssets}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.Id}
              asset={asset}
              isSelected={selectedAssets.includes(asset.Id)}
              onToggle={() => handleAssetToggle(asset.Id)}
            />
          ))}
        </div>
      )}

      {/* Asset Generator Modal */}
      {showGenerator && (
        <AssetGenerator
          isOpen={showGenerator}
          onClose={() => setShowGenerator(false)}
          onGenerate={(newAssets) => {
            setAssets(prev => [...prev, ...newAssets])
            setShowGenerator(false)
          }}
        />
      )}
    </div>
  )
}

export default AssetLibrary