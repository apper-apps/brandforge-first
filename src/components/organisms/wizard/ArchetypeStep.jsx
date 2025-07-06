import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const ArchetypeStep = ({ data, onChange }) => {
  const [archetypeData, setArchetypeData] = useState({
    selectedArchetype: '',
    ...data.archetype
  })

  const archetypes = [
    {
      name: 'The Innocent',
      description: 'Optimistic, honest, and pure',
      characteristics: ['Optimistic', 'Honest', 'Pure', 'Simple'],
      examples: ['Coca-Cola', 'McDonald\'s', 'Nintendo'],
      color: 'from-blue-500 to-cyan-500',
      icon: 'Heart',
      motivation: 'To be happy and pure'
    },
    {
      name: 'The Sage',
      description: 'Wise, knowledgeable, and thoughtful',
      characteristics: ['Wise', 'Knowledgeable', 'Thoughtful', 'Mentor'],
      examples: ['Google', 'Harvard', 'BBC'],
      color: 'from-indigo-500 to-purple-500',
      icon: 'BookOpen',
      motivation: 'To understand the world'
    },
    {
      name: 'The Explorer',
      description: 'Free-spirited, adventurous, and pioneering',
      characteristics: ['Adventurous', 'Free-spirited', 'Pioneering', 'Authentic'],
      examples: ['North Face', 'Jeep', 'National Geographic'],
      color: 'from-green-500 to-teal-500',
      icon: 'Compass',
      motivation: 'To experience freedom and find yourself'
    },
    {
      name: 'The Hero',
      description: 'Courageous, determined, and inspiring',
      characteristics: ['Courageous', 'Determined', 'Inspiring', 'Triumphant'],
      examples: ['Nike', 'BMW', 'FedEx'],
      color: 'from-red-500 to-orange-500',
      icon: 'Trophy',
      motivation: 'To prove worth through courageous action'
    },
    {
      name: 'The Rebel',
      description: 'Revolutionary, unconventional, and disruptive',
      characteristics: ['Revolutionary', 'Unconventional', 'Disruptive', 'Bold'],
      examples: ['Harley-Davidson', 'Apple', 'Tesla'],
      color: 'from-purple-500 to-pink-500',
      icon: 'Zap',
      motivation: 'To overturn what isn\'t working'
    },
    {
      name: 'The Magician',
      description: 'Visionary, inventive, and transformative',
      characteristics: ['Visionary', 'Inventive', 'Transformative', 'Charismatic'],
      examples: ['Disney', 'Apple', 'Tesla'],
      color: 'from-violet-500 to-purple-500',
      icon: 'Sparkles',
      motivation: 'To make dreams come true'
    },
    {
      name: 'The Regular Guy',
      description: 'Relatable, down-to-earth, and authentic',
      characteristics: ['Relatable', 'Down-to-earth', 'Authentic', 'Friendly'],
      examples: ['IKEA', 'Home Depot', 'Walmart'],
      color: 'from-amber-500 to-orange-500',
      icon: 'Users',
      motivation: 'To belong and connect with others'
    },
    {
      name: 'The Lover',
      description: 'Passionate, committed, and intimate',
      characteristics: ['Passionate', 'Committed', 'Intimate', 'Romantic'],
      examples: ['Victoria\'s Secret', 'Hallmark', 'Godiva'],
      color: 'from-pink-500 to-rose-500',
      icon: 'Heart',
      motivation: 'To find and give love'
    },
    {
      name: 'The Jester',
      description: 'Playful, humorous, and lighthearted',
      characteristics: ['Playful', 'Humorous', 'Lighthearted', 'Fun'],
      examples: ['Ben & Jerry\'s', 'Old Spice', 'Mailchimp'],
      color: 'from-yellow-500 to-orange-500',
      icon: 'Smile',
      motivation: 'To have fun and enjoy life'
    },
    {
      name: 'The Caregiver',
      description: 'Caring, nurturing, and selfless',
      characteristics: ['Caring', 'Nurturing', 'Selfless', 'Generous'],
      examples: ['Johnson & Johnson', 'Salvation Army', 'TOMS'],
      color: 'from-emerald-500 to-teal-500',
      icon: 'Shield',
      motivation: 'To help others'
    },
    {
      name: 'The Creator',
      description: 'Creative, artistic, and imaginative',
      characteristics: ['Creative', 'Artistic', 'Imaginative', 'Expressive'],
      examples: ['LEGO', 'Adobe', 'Crayola'],
      color: 'from-cyan-500 to-blue-500',
      icon: 'Palette',
      motivation: 'To create something of enduring value'
    },
    {
      name: 'The Ruler',
      description: 'Authoritative, responsible, and influential',
      characteristics: ['Authoritative', 'Responsible', 'Influential', 'Leader'],
      examples: ['Mercedes-Benz', 'Rolex', 'Microsoft'],
      color: 'from-slate-500 to-gray-500',
      icon: 'Crown',
      motivation: 'To create prosperity and success'
    },
  ]

  useEffect(() => {
    onChange({ archetype: archetypeData })
  }, [archetypeData, onChange])

  const handleArchetypeSelect = (archetype) => {
    setArchetypeData(prev => ({
      ...prev,
      selectedArchetype: archetype.name
    }))
  }

  const selectedArchetypeDetails = archetypes.find(a => a.name === archetypeData.selectedArchetype)

  return (
    <WizardStep
      title="Brand Archetype"
      description="Choose the archetype that best represents your brand's personality"
    >
      <div className="space-y-8">
        {/* Archetype Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archetypes.map((archetype) => (
            <motion.div
              key={archetype.name}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleArchetypeSelect(archetype)}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${
                archetypeData.selectedArchetype === archetype.name
                  ? 'border-brand-primary bg-brand-primary/10'
                  : 'border-slate-700 hover:border-slate-600 bg-brand-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${archetype.color} flex items-center justify-center`}>
                  <ApperIcon name={archetype.icon} className="w-6 h-6 text-white" />
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  archetypeData.selectedArchetype === archetype.name
                    ? 'border-brand-primary bg-brand-primary'
                    : 'border-slate-600'
                }`}>
                  {archetypeData.selectedArchetype === archetype.name && (
                    <ApperIcon name="Check" className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{archetype.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{archetype.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Characteristics</p>
                  <div className="flex flex-wrap gap-1">
                    {archetype.characteristics.slice(0, 3).map((char, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 mb-1">Examples</p>
                  <p className="text-xs text-slate-400">{archetype.examples.join(', ')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Archetype Details */}
        {selectedArchetypeDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${selectedArchetypeDetails.color} flex items-center justify-center`}>
                <ApperIcon name={selectedArchetypeDetails.icon} className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{selectedArchetypeDetails.name}</h3>
                <p className="text-slate-400 mb-4">{selectedArchetypeDetails.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-300 mb-2">Core Motivation</p>
                    <p className="text-sm text-slate-400">{selectedArchetypeDetails.motivation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300 mb-2">Key Characteristics</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedArchetypeDetails.characteristics.map((char, i) => (
                        <span key={i} className="px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface rounded-lg p-4 border border-slate-700"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1">
              <ApperIcon name="Brain" className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-medium text-slate-200 mb-2">AI Recommendation</h3>
              <p className="text-sm text-slate-400">
                {selectedArchetypeDetails ? (
                  `Based on your brand values and target audience, ${selectedArchetypeDetails.name} aligns well with your brand's mission to create authentic connections while maintaining professional credibility.`
                ) : (
                  'Select an archetype to see personalized recommendations based on your brand values and target audience.'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </WizardStep>
  )
}

export default ArchetypeStep