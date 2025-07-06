import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const AudienceStep = ({ data, onChange }) => {
  const [audienceData, setAudienceData] = useState({
    primaryAudience: '',
    demographics: {
      ageRange: '',
      gender: '',
      income: '',
      education: '',
      location: ''
    },
    psychographics: {
      values: [],
      interests: [],
      challenges: [],
      behaviors: []
    },
    ...data.audience
  })

  const ageRanges = [
    'Under 25',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+'
  ]

  const incomeRanges = [
    'Under $30k',
    '$30k-$50k',
    '$50k-$75k',
    '$75k-$100k',
    '$100k-$150k',
    '$150k+'
  ]

  const educationLevels = [
    'High School',
    'Some College',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree'
  ]

  const commonValues = [
    'Innovation',
    'Sustainability',
    'Quality',
    'Affordability',
    'Convenience',
    'Security',
    'Community',
    'Personal Growth'
  ]

  const commonInterests = [
    'Technology',
    'Health & Wellness',
    'Travel',
    'Education',
    'Entertainment',
    'Sports',
    'Fashion',
    'Food & Dining'
  ]

  useEffect(() => {
    onChange({ audience: audienceData })
  }, [audienceData, onChange])

  const handleChange = (field, value) => {
    setAudienceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDemographicChange = (field, value) => {
    setAudienceData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [field]: value
      }
    }))
  }

  const handlePsychographicToggle = (category, item) => {
    setAudienceData(prev => ({
      ...prev,
      psychographics: {
        ...prev.psychographics,
        [category]: prev.psychographics[category].includes(item)
          ? prev.psychographics[category].filter(i => i !== item)
          : [...prev.psychographics[category], item]
      }
    }))
  }

  return (
    <WizardStep
      title="Target Audience"
      description="Define your ideal customers to create a focused brand strategy"
    >
      <div className="space-y-8">
        {/* Primary Audience */}
        <div className="form-group">
          <label className="form-label">Primary Audience Description</label>
          <textarea
            className="form-textarea"
            value={audienceData.primaryAudience}
            onChange={(e) => handleChange('primaryAudience', e.target.value)}
            placeholder="Describe your primary target audience in detail..."
          />
        </div>

        {/* Demographics */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Users" className="w-5 h-5 text-brand-primary" />
            <span>Demographics</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Age Range</label>
              <select
                className="form-select"
                value={audienceData.demographics.ageRange}
                onChange={(e) => handleDemographicChange('ageRange', e.target.value)}
              >
                <option value="">Select age range</option>
                {ageRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={audienceData.demographics.gender}
                onChange={(e) => handleDemographicChange('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="All">All</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Income Range</label>
              <select
                className="form-select"
                value={audienceData.demographics.income}
                onChange={(e) => handleDemographicChange('income', e.target.value)}
              >
                <option value="">Select income range</option>
                {incomeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Education Level</label>
              <select
                className="form-select"
                value={audienceData.demographics.education}
                onChange={(e) => handleDemographicChange('education', e.target.value)}
              >
                <option value="">Select education level</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group md:col-span-2">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                value={audienceData.demographics.location}
                onChange={(e) => handleDemographicChange('location', e.target.value)}
                placeholder="e.g., Urban areas, Suburban, Global, Specific regions"
              />
            </div>
          </div>
        </div>

        {/* Psychographics */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
            <ApperIcon name="Brain" className="w-5 h-5 text-brand-primary" />
            <span>Values & Interests</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Core Values</label>
              <div className="grid grid-cols-2 gap-2">
                {commonValues.map(value => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePsychographicToggle('values', value)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      audienceData.psychographics.values.includes(value)
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {value}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Interests</label>
              <div className="grid grid-cols-2 gap-2">
                {commonInterests.map(interest => (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePsychographicToggle('interests', interest)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      audienceData.psychographics.interests.includes(interest)
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {interest}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1">
              <ApperIcon name="Target" className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-medium text-slate-200 mb-2">AI Insight</h3>
              <p className="text-sm text-slate-400">
                Based on your industry selection, we recommend focusing on tech-savvy professionals 
                aged 25-45 who value innovation and efficiency. Consider their digital-first approach 
                when developing your brand messaging.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </WizardStep>
  )
}

export default AudienceStep