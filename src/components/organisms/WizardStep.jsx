import { motion } from 'framer-motion'

const WizardStep = ({ title, description, children, onNext, onPrevious, canProceed = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
        {description && <p className="text-slate-400">{description}</p>}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  )
}

export default WizardStep