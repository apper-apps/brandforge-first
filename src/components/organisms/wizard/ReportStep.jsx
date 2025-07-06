import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  Users, 
  Zap,
  Palette,
  MessageCircle,
  Calendar,
  ArrowRight
} from 'lucide-react'

/**
 * ReportStep Component - Final step in the brand wizard
 * Displays the generated brand strategy and provides export options
 */
const ReportStep = ({ data = {}, onNext, onPrevious, isLoading = false }) => {
  const [strategy, setStrategy] = useState(null)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [showDetails, setShowDetails] = useState({})

  useEffect(() => {
    // Simulate strategy generation from wizard data
    const generateStrategy = () => {
      const mockStrategy = {
        brandIdentity: {
          name: data.companyInfo?.name || "Your Brand",
          description: data.companyInfo?.description || "A forward-thinking company",
          archetype: data.archetype || "The Innovator",
          values: data.values || ["Innovation", "Quality", "Trust"],
          positioning: data.positioning?.statement || "Leading the market with innovation"
        },
        
        targetAudience: {
          primary: data.audience?.primary || "Tech-savvy professionals",
          demographics: data.audience?.demographics || {
            age: "25-45",
            income: "$50k-$100k",
            education: "College+"
          },
          painPoints: data.audience?.painPoints || [
            "Complex workflows",
            "Time-consuming processes",
            "Lack of automation"
          ]
        },
        
        competitiveAnalysis: {
          mainCompetitors: data.competitors || [],
          marketGaps: [
            "Premium segment opportunity",
            "Mobile-first approach",
            "AI-powered features"
          ],
          differentiators: [
            "Superior user experience",
            "Innovative technology",
            "Customer-centric approach"
          ]
        },
        
        messagingFramework: {
          coreMessage: data.messaging?.coreMessage || "Empowering success through innovation",
          keyMessages: data.messaging?.keyMessages || [
            "Innovation that matters",
            "Results you can trust",
            "Experience the difference"
          ],
          toneOfVoice: data.messaging?.toneOfVoice || "Professional, confident, approachable"
        },
        
        visualIdentity: {
          colorPalette: ["#6366F1", "#8B5CF6", "#EC4899"],
          typography: "Modern, clean, geometric",
          imagery: "Futuristic, tech-focused, dynamic"
        },
        
        recommendations: [
          "Focus on digital marketing channels",
          "Develop thought leadership content",
          "Build strategic partnerships",
          "Invest in customer experience"
        ],
        
        timeline: {
          "Week 1-2": "Brand guidelines and asset creation",
          "Week 3-4": "Website and digital presence setup",
          "Week 5-6": "Marketing campaign launch",
          "Week 7-8": "Performance monitoring and optimization"
        }
      }
      
      setStrategy(mockStrategy)
    }

    generateStrategy()
  }, [data])

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create download link
      const filename = `brand-strategy-${strategy.brandIdentity.name.replace(/\s+/g, '-').toLowerCase()}.${exportFormat}`
      
      // In a real app, this would trigger an actual download
      console.log(`Exporting brand strategy as ${filename}`)
      
      // Show success message
      alert(`Brand strategy exported successfully as ${filename}`)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${strategy.brandIdentity.name} Brand Strategy`,
          text: `Check out the brand strategy for ${strategy.brandIdentity.name}`,
          url: window.location.href
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Sharing failed:', error)
    }
  }

  const toggleDetails = (section) => {
    setShowDetails(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const StrategySection = ({ title, icon: Icon, children, sectionKey }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
    >
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => toggleDetails(sectionKey)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: showDetails[sectionKey] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ 
          height: showDetails[sectionKey] ? 'auto' : '60px',
          opacity: showDetails[sectionKey] ? 1 : 0.7
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  )

  if (isLoading || !strategy) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Generating your brand strategy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Your Brand Strategy is Ready!
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've analyzed your inputs and created a comprehensive brand strategy. 
            Review the details below and export your strategy when ready.
          </p>
        </motion.div>

        {/* Export Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <div className="flex items-center gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pdf">PDF Document</option>
              <option value="docx">Word Document</option>
              <option value="pptx">PowerPoint</option>
              <option value="json">JSON Data</option>
            </select>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Strategy
                </>
              )}
            </button>
          </div>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" />
            Share Strategy
          </button>
        </motion.div>

        {/* Strategy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Brand Identity */}
          <StrategySection
            title="Brand Identity"
            icon={Zap}
            sectionKey="identity"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Brand Name</h4>
                <p className="text-gray-300">{strategy.brandIdentity.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Description</h4>
                <p className="text-gray-300">{strategy.brandIdentity.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Archetype</h4>
                <p className="text-gray-300">{strategy.brandIdentity.archetype}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Core Values</h4>
                <div className="flex flex-wrap gap-2">
                  {strategy.brandIdentity.values.map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StrategySection>

          {/* Target Audience */}
          <StrategySection
            title="Target Audience"
            icon={Users}
            sectionKey="audience"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Primary Audience</h4>
                <p className="text-gray-300">{strategy.targetAudience.primary}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Demographics</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(strategy.targetAudience.demographics).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Pain Points</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {strategy.targetAudience.painPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </StrategySection>

          {/* Competitive Analysis */}
          <StrategySection
            title="Competitive Analysis"
            icon={TrendingUp}
            sectionKey="competitive"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Market Gaps</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {strategy.competitiveAnalysis.marketGaps.map((gap, index) => (
                    <li key={index}>{gap}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Key Differentiators</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {strategy.competitiveAnalysis.differentiators.map((diff, index) => (
                    <li key={index}>{diff}</li>
                  ))}
                </ul>
              </div>
            </div>
          </StrategySection>

          {/* Messaging Framework */}
          <StrategySection
            title="Messaging Framework"
            icon={MessageCircle}
            sectionKey="messaging"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Core Message</h4>
                <p className="text-gray-300">{strategy.messagingFramework.coreMessage}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Key Messages</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {strategy.messagingFramework.keyMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Tone of Voice</h4>
                <p className="text-gray-300">{strategy.messagingFramework.toneOfVoice}</p>
              </div>
            </div>
          </StrategySection>
        </div>

        {/* Full-width sections */}
        <div className="space-y-6 mb-8">
          {/* Visual Identity */}
          <StrategySection
            title="Visual Identity"
            icon={Palette}
            sectionKey="visual"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Color Palette</h4>
                <div className="flex gap-2">
                  {strategy.visualIdentity.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-slate-600"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Typography</h4>
                <p className="text-gray-300">{strategy.visualIdentity.typography}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Imagery Style</h4>
                <p className="text-gray-300">{strategy.visualIdentity.imagery}</p>
              </div>
            </div>
          </StrategySection>

          {/* Implementation Timeline */}
          <StrategySection
            title="Implementation Timeline"
            icon={Calendar}
            sectionKey="timeline"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(strategy.timeline).map(([period, task]) => (
                <div key={period} className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">{period}</h4>
                  <p className="text-gray-300 text-sm">{task}</p>
                </div>
              ))}
            </div>
          </StrategySection>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Previous Step
          </button>
          
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            <CheckCircle className="w-4 h-4" />
            Complete Wizard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportStep