import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const ValuesStep = ({ data, onChange }) => {
  const [valuesData, setValuesData] = useState({
    coreValues: [],
    mission: '',
    vision: '',
    personality: [],
    ...data.values
  })

  const coreValues = [
    { name: 'Innovation', description: 'Leading with cutting-edge solutions' },
    { name: 'Quality', description: 'Excellence in every detail' },
    { name: 'Integrity', description: 'Honest and transparent practices' },
    { name: 'Sustainability', description: 'Environmental responsibility' },
    { name: 'Customer-Centric', description: 'Putting customers first' },
    { name: 'Collaboration', description: 'Working together for success' },
    { name: 'Growth', description: 'Continuous improvement and learning' },
    { name: 'Authenticity', description: 'Being genuine and true' },
    { name: 'Reliability', description: 'Consistent and dependable' },
    { name: 'Empowerment', description: 'Enabling others to succeed' },
    { name: 'Diversity', description: 'Embracing different perspectives' },
    { name: 'Agility', description: 'Adapting quickly to change' },
  ]

  const personalityTraits = [
    { name: 'Professional', icon: 'Briefcase' },
    { name: 'Friendly', icon: 'Smile' },
    { name: 'Innovative', icon: 'Lightbulb' },
    { name: 'Trustworthy', icon: 'Shield' },
    { name: 'Energetic', icon: 'Zap' },
    { name: 'Sophisticated', icon: 'Crown' },
    { name: 'Approachable', icon: 'Users' },
    { name: 'Bold', icon: 'Target' },
    { name: 'Caring', icon: 'Heart' },
    { name: 'Playful', icon: 'Smile' },
    { name: 'Authoritative', icon: 'Award' },
    { name: 'Creative', icon: 'Palette' },
  ]

  useEffect(() => {
    onChange({ values: valuesData })
  }, [valuesData, onChange])

  const handleValueToggle = (value) => {
    setValuesData(prev => ({
      ...prev,
      coreValues: prev.coreValues.includes(value)
        ? prev.coreValues.filter(v => v !== value)
        : [...prev.coreValues, value]
    }))
  }

  const handlePersonalityToggle = (trait) => {
    setValuesData(prev => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter(t => t !== trait)
        : [...prev.personality, trait]
    }))
  }

  const handleChange = (field, value) => {
    setValuesData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <WizardStep
      title="Brand Values & Personality"
      description="Define what your brand stands for and how it communicates"
    >
      <div className="space-y-8">
        {/* Core Values */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Compass" className="w-5 h-5 text-brand-primary" />
            <span>Core Values</span>
          </h3>
          <p className="text-sm text-slate-400">Select 3-5 values that best represent your brand</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value) => (
              <motion.div
                key={value.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleValueToggle(value.name)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  valuesData.coreValues.includes(value.name)
                    ? 'border-brand-primary bg-brand-primary/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-200">{value.name}</h4>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    valuesData.coreValues.includes(value.name)
                      ? 'border-brand-primary bg-brand-primary'
                      : 'border-slate-600'
                  }`}>
                    {valuesData.coreValues.includes(value.name) && (
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Mission Statement</label>
            <textarea
              className="form-textarea"
              value={valuesData.mission}
              onChange={(e) => handleChange('mission', e.target.value)}
              placeholder="What is your company's purpose? What do you do and why do you do it?"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Vision Statement</label>
            <textarea
              className="form-textarea"
              value={valuesData.vision}
              onChange={(e) => handleChange('vision', e.target.value)}
              placeholder="What future do you want to create? Where do you see your company in 5-10 years?"
            />
          </div>
        </div>

        {/* Brand Personality */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Palette" className="w-5 h-5 text-brand-primary" />
            <span>Brand Personality</span>
          </h3>
          <p className="text-sm text-slate-400">Choose traits that describe your brand's character</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {personalityTraits.map((trait) => (
              <motion.button
                key={trait.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePersonalityToggle(trait.name)}
                className={`p-3 rounded-lg border transition-all flex items-center space-x-2 ${
                  valuesData.personality.includes(trait.name)
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                    : 'border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <ApperIcon name={trait.icon} className="w-4 h-4" />
                <span className="text-sm">{trait.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Values Summary */}
        {valuesData.coreValues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-slate-200 mb-2">Your Brand Foundation</h3>
                <p className="text-sm text-slate-400 mb-3">
                  You've selected {valuesData.coreValues.length} core values and {valuesData.personality.length} personality traits.
                </p>
                <div className="flex flex-wrap gap-2">
                  {valuesData.coreValues.map((value) => (
                    <span key={value} className="px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded">
                      {value}
                    </span>
                  ))}
                  {valuesData.personality.map((trait) => (
                    <span key={trait} className="px-2 py-1 bg-brand-secondary/20 text-brand-secondary text-xs rounded">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </WizardStep>
  )
}

export default ValuesStep