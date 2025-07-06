import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SettingsSection from '@/components/molecules/SettingsSection'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      competitorAlerts: true,
      brandUpdates: false,
      weeklyReports: true,
    },
    branding: {
      defaultIndustry: 'technology',
      autoGenerateAssets: true,
      brandConsistencyChecks: true,
    },
    integrations: {
      canva: false,
      figma: false,
      slack: false,
      hubspot: false,
    },
    privacy: {
      dataCollection: true,
      analyticsTracking: true,
      marketingEmails: false,
    }
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Settings
          </h1>
          <p className="text-slate-400 mt-2">
            Customize your BrandForge AI experience
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:from-brand-primary/90 hover:to-brand-secondary/90 transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="Save" className="w-5 h-5" />
          <span>Save Changes</span>
        </motion.button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifications */}
        <SettingsSection title="Notifications" icon="Bell">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Email Notifications</h3>
                <p className="text-sm text-slate-400">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Competitor Alerts</h3>
                <p className="text-sm text-slate-400">Get notified of competitor changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.competitorAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'competitorAlerts', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Brand Updates</h3>
                <p className="text-sm text-slate-400">Notifications about brand changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.brandUpdates}
                  onChange={(e) => handleSettingChange('notifications', 'brandUpdates', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Weekly Reports</h3>
                <p className="text-sm text-slate-400">Receive weekly analytics summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.weeklyReports}
                  onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          </div>
        </SettingsSection>

        {/* Branding Preferences */}
        <SettingsSection title="Branding Preferences" icon="Palette">
          <div className="space-y-4">
            <div>
              <label className="form-label">Default Industry</label>
              <select
                className="form-select"
                value={settings.branding.defaultIndustry}
                onChange={(e) => handleSettingChange('branding', 'defaultIndustry', e.target.value)}
              >
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Auto-Generate Assets</h3>
                <p className="text-sm text-slate-400">Automatically create assets after strategy completion</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.branding.autoGenerateAssets}
                  onChange={(e) => handleSettingChange('branding', 'autoGenerateAssets', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Brand Consistency Checks</h3>
                <p className="text-sm text-slate-400">Monitor brand guidelines compliance</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.branding.brandConsistencyChecks}
                  onChange={(e) => handleSettingChange('branding', 'brandConsistencyChecks', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          </div>
        </SettingsSection>

        {/* Integrations */}
        <SettingsSection title="Integrations" icon="Plug">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Palette" className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Canva</h3>
                  <p className="text-sm text-slate-400">Design platform</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.integrations.canva}
                  onChange={(e) => handleSettingChange('integrations', 'canva', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Figma" className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Figma</h3>
                  <p className="text-sm text-slate-400">Design collaboration</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.integrations.figma}
                  onChange={(e) => handleSettingChange('integrations', 'figma', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="MessageSquare" className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Slack</h3>
                  <p className="text-sm text-slate-400">Team communication</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.integrations.slack}
                  onChange={(e) => handleSettingChange('integrations', 'slack', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">HubSpot</h3>
                  <p className="text-sm text-slate-400">CRM integration</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.integrations.hubspot}
                  onChange={(e) => handleSettingChange('integrations', 'hubspot', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          </div>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacy & Data" icon="Shield">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Data Collection</h3>
                <p className="text-sm text-slate-400">Allow data collection for improving services</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.dataCollection}
                  onChange={(e) => handleSettingChange('privacy', 'dataCollection', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Analytics Tracking</h3>
                <p className="text-sm text-slate-400">Track usage for analytics insights</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.analyticsTracking}
                  onChange={(e) => handleSettingChange('privacy', 'analyticsTracking', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Marketing Emails</h3>
                <p className="text-sm text-slate-400">Receive marketing and promotional emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privacy.marketingEmails}
                  onChange={(e) => handleSettingChange('privacy', 'marketingEmails', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  )
}

export default Settings