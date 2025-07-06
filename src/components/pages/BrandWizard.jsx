import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setWizardProgress, setWizardData, resetWizard } from '@/store/brandSlice'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import WizardStep from '@/components/organisms/WizardStep'
import WizardProgress from '@/components/molecules/WizardProgress'
import CompanyInfoStep from '@/components/organisms/wizard/CompanyInfoStep'
import AudienceStep from '@/components/organisms/wizard/AudienceStep'
import CompetitorStep from '@/components/organisms/wizard/CompetitorStep'
import ValuesStep from '@/components/organisms/wizard/ValuesStep'
import ArchetypeStep from '@/components/organisms/wizard/ArchetypeStep'
import PositioningStep from '@/components/organisms/wizard/PositioningStep'
import MessagingStep from '@/components/organisms/wizard/MessagingStep'
import ReportStep from '@/components/organisms/wizard/ReportStep'
import { brandService } from '@/services/api/brandService'

const BrandWizard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { wizardProgress, wizardData } = useSelector(state => state.brand)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(wizardProgress || 0)

  const steps = [
    { id: 0, title: 'Company Info', component: CompanyInfoStep },
    { id: 1, title: 'Target Audience', component: AudienceStep },
    { id: 2, title: 'Competitors', component: CompetitorStep },
    { id: 3, title: 'Brand Values', component: ValuesStep },
    { id: 4, title: 'Archetype', component: ArchetypeStep },
    { id: 5, title: 'Positioning', component: PositioningStep },
    { id: 6, title: 'Messaging', component: MessagingStep },
    { id: 7, title: 'Strategy Report', component: ReportStep },
  ]

  useEffect(() => {
    return () => {
      // Save progress when component unmounts
      dispatch(setWizardProgress(currentStep))
    }
  }, [currentStep, dispatch])

  const handleStepChange = (stepData) => {
    dispatch(setWizardData(stepData))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      dispatch(setWizardProgress(currentStep + 1))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      dispatch(setWizardProgress(currentStep - 1))
    }
  }

  const handleComplete = async () => {
    try {
      setLoading(true)
      
      // Generate final brand strategy
      const brandStrategy = await brandService.generateStrategy(wizardData)
      
      // Save brand
      await brandService.create(brandStrategy)
      
      // Reset wizard
      dispatch(resetWizard())
      
      // Navigate to dashboard
      navigate('/')
    } catch (error) {
      console.error('Failed to complete brand strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  if (loading) {
    return <Loading type="wizard" />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-display gradient-text"
        >
          Brand Strategy Wizard
        </motion.h1>
        <p className="text-slate-400">
          Let AI guide you through creating a comprehensive brand strategy
        </p>
      </div>

      {/* Progress */}
      <WizardProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} />

      {/* Current Step */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-brand-surface rounded-xl p-8"
      >
        <CurrentStepComponent
          data={wizardData}
          onChange={handleStepChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span>Step {currentStep + 1} of {steps.length}</span>
        </div>

        {currentStep === steps.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="CheckCircle" className="w-4 h-4" />
            <span>Complete Strategy</span>
          </motion.button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
          >
            <span>Next</span>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default BrandWizard