import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const WizardProgress = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="bg-brand-surface rounded-xl p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-200">Progress</span>
          <span className="text-sm text-slate-400">{currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full"
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 p-2 rounded-lg text-sm ${
              index === currentStep
                ? 'bg-brand-primary/20 text-brand-primary'
                : index < currentStep
                ? 'bg-brand-success/20 text-brand-success'
                : 'bg-slate-700/50 text-slate-400'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index === currentStep
                ? 'bg-brand-primary text-white'
                : index < currentStep
                ? 'bg-brand-success text-white'
                : 'bg-slate-600 text-slate-400'
            }`}>
              {index < currentStep ? (
                <ApperIcon name="Check" className="w-3 h-3" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            <span className="hidden sm:block font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WizardProgress