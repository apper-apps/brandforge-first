import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const MessagingStep = ({ data, onChange }) => {
  const [messagingData, setMessagingData] = useState({
    tagline: '',
    voiceTone: {
      voice: [],
      tone: []
    },
    keyMessages: [],
    communicationStyle: '',
    ...data.messaging
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const voiceOptions = [
    { name: 'Professional', description: 'Business-focused and formal' },
    { name: 'Friendly', description: 'Warm and approachable' },
    { name: 'Authoritative', description: 'Expert and confident' },
    { name: 'Conversational', description: 'Casual and relatable' },
    { name: 'Inspiring', description: 'Motivational and uplifting' },
    { name: 'Educational', description: 'Informative and helpful' },
    { name: 'Playful', description: 'Fun and lighthearted' },
    { name: 'Empathetic', description: 'Understanding and caring' },
  ]

  const toneOptions = [
    { name: 'Confident', description: 'Sure and assertive' },
    { name: 'Optimistic', description: 'Positive and hopeful' },
    { name: 'Sophisticated', description: 'Refined and elegant' },
    { name: 'Energetic', description: 'Dynamic and enthusiastic' },
    { name: 'Trustworthy', description: 'Reliable and honest' },
    { name: 'Innovative', description: 'Creative and forward-thinking' },
    { name: 'Inclusive', description: 'Welcoming and diverse' },
    { name: 'Passionate', description: 'Enthusiastic and committed' },
  ]

  useEffect(() => {
    onChange({ messaging: messagingData })
  }, [messagingData, onChange])

  const handleChange = (field, value) => {
    setMessagingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleVoiceToneToggle = (category, option) => {
    setMessagingData(prev => ({
      ...prev,
      voiceTone: {
        ...prev.voiceTone,
        [category]: prev.voiceTone[category].includes(option)
          ? prev.voiceTone[category].filter(item => item !== option)
          : [...prev.voiceTone[category], option]
      }
    }))
  }

  const addKeyMessage = () => {
    setMessagingData(prev => ({
      ...prev,
      keyMessages: [...prev.keyMessages, '']
    }))
  }

  const updateKeyMessage = (index, value) => {
    setMessagingData(prev => ({
      ...prev,
      keyMessages: prev.keyMessages.map((msg, i) => i === index ? value : msg)
    }))
  }

  const removeKeyMessage = (index) => {
    setMessagingData(prev => ({
      ...prev,
      keyMessages: prev.keyMessages.filter((_, i) => i !== index)
    }))
  }

  const generateTagline = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const companyName = data.companyInfo?.name || 'Your Company'
    const archetype = data.archetype?.selectedArchetype || 'The Innovator'
    const values = data.values?.coreValues || []
    
    const taglineOptions = [
      `${companyName}: Innovation That Matters`,
      `Transforming Tomorrow, Today`,
      `Excellence in Every Detail`,
      `Your Success, Our Mission`,
      `Building the Future Together`
    ]
    
    const selectedTagline = taglineOptions[Math.floor(Math.random() * taglineOptions.length)]
    
    setMessagingData(prev => ({
      ...prev,
      tagline: selectedTagline
    }))
    
    setIsGenerating(false)
  }

  return (
    <WizardStep
      title="Brand Messaging"
      description="Craft your brand's voice and key messages"
    >
      <div className="space-y-8">
        {/* Brand Tagline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
              <ApperIcon name="MessageCircle" className="w-5 h-5 text-brand-primary" />
              <span>Brand Tagline</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateTagline}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </motion.button>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              value={messagingData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Enter your brand tagline..."
            />
          </div>
        </div>

        {/* Voice & Tone */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Volume2" className="w-5 h-5 text-brand-primary" />
            <span>Brand Voice & Tone</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Voice */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-200">Brand Voice</h4>
              <p className="text-sm text-slate-400">How your brand speaks (personality)</p>
              <div className="grid grid-cols-1 gap-3">
                {voiceOptions.map((option) => (
                  <motion.div
                    key={option.name}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleVoiceToneToggle('voice', option.name)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      messagingData.voiceTone.voice.includes(option.name)
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-slate-200">{option.name}</h5>
                        <p className="text-sm text-slate-400">{option.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        messagingData.voiceTone.voice.includes(option.name)
                          ? 'border-brand-primary bg-brand-primary'
                          : 'border-slate-600'
                      }`}>
                        {messagingData.voiceTone.voice.includes(option.name) && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-200">Brand Tone</h4>
              <p className="text-sm text-slate-400">How your brand feels (emotion)</p>
              <div className="grid grid-cols-1 gap-3">
                {toneOptions.map((option) => (
                  <motion.div
                    key={option.name}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleVoiceToneToggle('tone', option.name)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      messagingData.voiceTone.tone.includes(option.name)
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-slate-200">{option.name}</h5>
                        <p className="text-sm text-slate-400">{option.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        messagingData.voiceTone.tone.includes(option.name)
                          ? 'border-brand-primary bg-brand-primary'
                          : 'border-slate-600'
                      }`}>
                        {messagingData.voiceTone.tone.includes(option.name) && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Messages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
              <ApperIcon name="List" className="w-5 h-5 text-brand-primary" />
              <span>Key Messages</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addKeyMessage}
              className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Message</span>
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {messagingData.keyMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    className="form-input"
                    value={message}
                    onChange={(e) => updateKeyMessage(index, e.target.value)}
                    placeholder={`Key message ${index + 1}`}
                  />
                </div>
                <button
                  onClick={() => removeKeyMessage(index)}
                  className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            
            {messagingData.keyMessages.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <ApperIcon name="MessageCircle" className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                <p>No key messages added yet</p>
                <p className="text-sm">Add your main brand messages to communicate your value</p>
              </div>
            )}
          </div>
        </div>

        {/* Communication Style */}
        <div className="form-group">
          <label className="form-label">Communication Style Guidelines</label>
          <textarea
            className="form-textarea"
            value={messagingData.communicationStyle}
            onChange={(e) => handleChange('communicationStyle', e.target.value)}
            placeholder="Describe how your brand should communicate across different channels and situations..."
          />
        </div>

        {/* Messaging Summary */}
        {(messagingData.voiceTone.voice.length > 0 || messagingData.voiceTone.tone.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-brand-primary" />
              <span>Messaging Summary</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messagingData.voiceTone.voice.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-200 mb-2">Voice Attributes</h4>
                  <div className="flex flex-wrap gap-2">
                    {messagingData.voiceTone.voice.map((voice) => (
                      <span key={voice} className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-sm rounded-full">
                        {voice}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {messagingData.voiceTone.tone.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-200 mb-2">Tone Attributes</h4>
                  <div className="flex flex-wrap gap-2">
                    {messagingData.voiceTone.tone.map((tone) => (
                      <span key={tone} className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-sm rounded-full">
                        {tone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </WizardStep>
  )
}

export default MessagingStep