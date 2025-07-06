import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'dashboard') {
    return (
      <div className="p-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-slate-700/50 rounded-lg w-64 shimmer" />
            <div className="h-4 bg-slate-700/30 rounded w-48 shimmer" />
          </div>
          <div className="h-10 bg-slate-700/50 rounded-lg w-32 shimmer" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-surface rounded-xl p-6 space-y-4"
            >
              <div className="h-4 bg-slate-700/50 rounded w-24 shimmer" />
              <div className="h-8 bg-slate-700/50 rounded w-20 shimmer" />
              <div className="h-3 bg-slate-700/30 rounded w-16 shimmer" />
            </motion.div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-brand-surface rounded-xl p-6 space-y-4">
            <div className="h-6 bg-slate-700/50 rounded w-48 shimmer" />
            <div className="h-64 bg-slate-700/30 rounded shimmer" />
          </div>
          <div className="bg-brand-surface rounded-xl p-6 space-y-4">
            <div className="h-6 bg-slate-700/50 rounded w-32 shimmer" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/50 rounded w-24 shimmer" />
                    <div className="h-3 bg-slate-700/30 rounded w-16 shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'wizard') {
    return (
      <div className="p-6 space-y-6">
        {/* Progress bar skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-slate-700/50 rounded w-48 shimmer" />
          <div className="h-2 bg-slate-700/30 rounded-full shimmer" />
        </div>

        {/* Form skeleton */}
        <div className="bg-brand-surface rounded-xl p-8 space-y-6">
          <div className="h-8 bg-slate-700/50 rounded w-64 shimmer" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-32 shimmer" />
                <div className="h-12 bg-slate-700/30 rounded-lg shimmer" />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="h-12 bg-slate-700/30 rounded-lg w-24 shimmer" />
            <div className="h-12 bg-slate-700/50 rounded-lg w-24 shimmer" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-brand-primary/30 border-t-brand-primary rounded-full mx-auto"
        />
        <p className="text-slate-400">Loading...</p>
      </div>
    </div>
  )
}

export default Loading