import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const PositioningStep = ({ data, onChange }) => {
  const [positioningData, setPositioningData] = useState({
    positioning: '',
    valueProposition: '',
    differentiators: [],
    targetSegment: '',
    ...data.positioning
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const commonDifferentiators = [
    'Innovation',
    'Quality',
    'Price',
    'Customer Service',
    'Speed',
    'Convenience',
    'Expertise',
    'Reliability',
    'Sustainability',
    'Personalization',
    'Technology',
    'Security'
  ]

  useEffect(() => {
    onChange({ positioning: positioningData })
  }, [positioningData, onChange])

  const handleChange = (field, value) => {
    setPositioningData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDifferentiatorToggle = (differentiator) => {
    setPositioningData(prev => ({
      ...prev,
      differentiators: prev.differentiators.includes(differentiator)
        ? prev.differentiators.filter(d => d !== differentiator)
        : [...prev.differentiators, differentiator]
    }))
  }

  const generatePositioning = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const generatedPositioning = `For ${data.companyInfo?.name || 'your company'} in the ${data.companyInfo?.industry || 'technology'} industry, we position ourselves as the innovative solution provider that helps ${data.audience?.primaryAudience || 'businesses'} achieve their goals through cutting-edge technology and exceptional customer service.`
    
    const generatedValue = `We deliver superior value through our combination of ${positioningData.differentiators.slice(0, 3).join(', ')} while maintaining the highest standards of quality and reliability.`
    
    setPositioningData(prev => ({
      ...prev,
      positioning: generatedPositioning,
      valueProposition: generatedValue
    }))
    
    setIsGenerating(false)
  }

  return (
    <WizardStep
      title="Brand Positioning"
      description="Define how your brand is positioned in the market"
    >
      <div className="space-y-8">
        {/* Key Differentiators */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Target" className="w-5 h-5 text-brand-primary" />
            <span>Key Differentiators</span>
          </h3>
          <p className="text-sm text-slate-400">Select 3-5 factors that set your brand apart from competitors</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonDifferentiators.map((differentiator) => (
              <motion.button
                key={differentiator}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDifferentiatorToggle(differentiator)}
                className={`p-3 rounded-lg border transition-all text-sm ${
                  positioningData.differentiators.includes(differentiator)
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                    : 'border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {differentiator}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Target Segment */}
        <div className="form-group">
          <label className="form-label">Target Market Segment</label>
          <textarea
            className="form-textarea"
            value={positioningData.targetSegment}
            onChange={(e) => handleChange('targetSegment', e.target.value)}
            placeholder="Describe your primary target market segment and their specific needs..."
          />
        </div>

        {/* AI Generation */}
        <div className="bg-brand-surface rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
              <ApperIcon name="Sparkles" className="w-5 h-5 text-brand-primary" />
              <span>AI-Generated Positioning</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePositioning}
              disabled={isGenerating || positioningData.differentiators.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Wand2" className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Positioning Statement</label>
              <textarea
                className="form-textarea"
                value={positioningData.positioning}
                onChange={(e) => handleChange('positioning', e.target.value)}
                placeholder="Your positioning statement will appear here..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Value Proposition</label>
              <textarea
                className="form-textarea"
                value={positioningData.valueProposition}
                onChange={(e) => handleChange('valueProposition', e.target.value)}
                placeholder="Your value proposition will appear here..."
              />
            </div>
          </div>
        </div>

        {/* Positioning Framework */}
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
            <ApperIcon name="Map" className="w-5 h-5 text-brand-primary" />
            <span>Positioning Framework</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-200 mb-2">For (Target Customer)</h4>
                <p className="text-sm text-slate-400">
                  {data.audience?.primaryAudience || 'Define your target audience'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-200 mb-2">Who (Need/Opportunity)</h4>
                <p className="text-sm text-slate-400">
                  {positioningData.targetSegment || 'Describe their specific needs'}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-200 mb-2">Our Product/Service</h4>
                <p className="text-sm text-slate-400">
                  {data.companyInfo?.description || 'Describe your offering'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-200 mb-2">That Provides (Key Benefit)</h4>
                <div className="flex flex-wrap gap-2">
                  {positioningData.differentiators.slice(0, 3).map((diff, i) => (
                    <span key={i} className="px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded">
                      {diff}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Positioning */}
        <div className="bg-brand-surface rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
            <ApperIcon name="BarChart3" className="w-5 h-5 text-brand-primary" />
            <span>Market Position</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-brand-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-primary mb-2">Premium</div>
              <div className="text-sm text-slate-400">High Quality, High Price</div>
            </div>
            <div className="text-center p-4 bg-brand-secondary/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-secondary mb-2">Challenger</div>
              <div className="text-sm text-slate-400">Innovation & Disruption</div>
            </div>
            <div className="text-center p-4 bg-brand-accent/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-accent mb-2">Accessible</div>
              <div className="text-sm text-slate-400">Value & Convenience</div>
            </div>
          </div>
        </div>
      </div>
    </WizardStep>
  )
}

export default PositioningStep