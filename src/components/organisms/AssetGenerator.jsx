import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const AssetGenerator = ({ isOpen, onClose, onGenerate }) => {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [generating, setGenerating] = useState(false)
  const [generatedAssets, setGeneratedAssets] = useState([])

  const assetTypes = [
    { id: 'logo', name: 'Logo Concepts', icon: 'Zap', description: 'AI-generated logo variations' },
    { id: 'business-card', name: 'Business Cards', icon: 'CreditCard', description: 'Professional business card templates' },
    { id: 'social-media', name: 'Social Media', icon: 'Share2', description: 'Headers, posts, and story templates' },
    { id: 'presentation', name: 'Presentations', icon: 'Presentation', description: 'Slide deck templates' },
    { id: 'email-signature', name: 'Email Signatures', icon: 'Mail', description: 'Professional email signatures' },
    { id: 'marketing', name: 'Marketing Materials', icon: 'Megaphone', description: 'Flyers, brochures, and ads' },
  ]

  const handleTypeToggle = (typeId) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const handleGenerate = async () => {
    if (selectedTypes.length === 0) return

    setGenerating(true)
    
    // Simulate asset generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newAssets = selectedTypes.map(type => ({
      Id: Date.now() + Math.random(),
      name: `${assetTypes.find(t => t.id === type)?.name} Design`,
      type: type,
      format: 'PNG',
      version: 1,
      createdAt: new Date().toISOString(),
    }))

    setGeneratedAssets(newAssets)
    setGenerating(false)
    onGenerate(newAssets)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-brand-surface rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-200">Generate Assets</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Select Asset Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assetTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleTypeToggle(type.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTypes.includes(type.id)
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedTypes.includes(type.id) 
                          ? 'bg-brand-primary text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        <ApperIcon name={type.icon} className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-200">{type.name}</h4>
                        <p className="text-sm text-slate-400">{type.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedTypes.includes(type.id)
                          ? 'border-brand-primary bg-brand-primary'
                          : 'border-slate-600'
                      }`}>
                        {selectedTypes.includes(type.id) && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="text-sm text-slate-400">
                {selectedTypes.length} asset type{selectedTypes.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  disabled={selectedTypes.length === 0 || generating}
                  className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Sparkles" className="w-4 h-4" />
                      <span>Generate Assets</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AssetGenerator