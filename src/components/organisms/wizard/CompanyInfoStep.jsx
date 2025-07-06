import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import WizardStep from '@/components/organisms/WizardStep'

const CompanyInfoStep = ({ data, onChange }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    size: '',
    goals: '',
    description: '',
    ...data.companyInfo
  })

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Professional Services',
    'Entertainment',
    'Other'
  ]

  const companySizes = [
    'Startup (1-10 employees)',
    'Small (11-50 employees)',
    'Medium (51-250 employees)',
    'Large (251-1000 employees)',
    'Enterprise (1000+ employees)'
  ]

  useEffect(() => {
    onChange({ companyInfo: companyData })
  }, [companyData, onChange])

  const handleChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <WizardStep
      title="Company Information"
      description="Tell us about your company to personalize your brand strategy"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-input"
            value={companyData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your company name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Industry</label>
          <select
            className="form-select"
            value={companyData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div className="form-group md:col-span-2">
          <label className="form-label">Company Size</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {companySizes.map(size => (
              <motion.label
                key={size}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  companyData.size === size
                    ? 'border-brand-primary bg-brand-primary/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={companyData.size === size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  companyData.size === size
                    ? 'border-brand-primary bg-brand-primary'
                    : 'border-slate-600'
                }`}>
                  {companyData.size === size && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-sm text-slate-200">{size}</span>
              </motion.label>
            ))}
          </div>
        </div>

        <div className="form-group md:col-span-2">
          <label className="form-label">Company Description</label>
          <textarea
            className="form-textarea"
            value={companyData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe what your company does and what makes it unique"
          />
        </div>

        <div className="form-group md:col-span-2">
          <label className="form-label">Business Goals</label>
          <textarea
            className="form-textarea"
            value={companyData.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            placeholder="What are your main business goals? (e.g., increase market share, launch new products, expand internationally)"
          />
        </div>
      </div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1">
            <ApperIcon name="Lightbulb" className="w-4 h-4 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-medium text-slate-200 mb-2">AI Tip</h3>
            <p className="text-sm text-slate-400">
              The more detailed your company information, the better we can tailor your brand strategy. 
              Consider including your unique value proposition and competitive advantages.
            </p>
          </div>
        </div>
      </motion.div>
    </WizardStep>
  )
}

export default CompanyInfoStep