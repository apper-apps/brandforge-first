/**
 * Analytics Service - Handles all analytics and performance tracking
 * Provides mock data for development and testing
 */

// Mock analytics data
const generateTimeSeriesData = (days, baseValue, variance) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const value = baseValue + (Math.random() - 0.5) * variance;
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, Math.round(value))
    });
  }
  
  return data;
};

const mockAnalyticsData = {
  overview: {
    totalViews: 125430,
    uniqueVisitors: 89234,
    conversionRate: 3.2,
    brandMentions: 1847,
    socialEngagement: 24567,
    marketShare: 12.5,
    brandAwareness: 68,
    customerSatisfaction: 4.2
  },
  
  brandPerformance: {
    '7d': {
      brandAwareness: generateTimeSeriesData(7, 68, 8),
      engagement: generateTimeSeriesData(7, 3200, 400),
      conversion: generateTimeSeriesData(7, 3.2, 0.5)
    },
    '30d': {
      brandAwareness: generateTimeSeriesData(30, 68, 12),
      engagement: generateTimeSeriesData(30, 3200, 600),
      conversion: generateTimeSeriesData(30, 3.2, 0.8)
    },
    '90d': {
      brandAwareness: generateTimeSeriesData(90, 68, 18),
      engagement: generateTimeSeriesData(90, 3200, 800),
      conversion: generateTimeSeriesData(90, 3.2, 1.2)
    }
  },
  
  competitorComparison: {
    yourBrand: {
      brandStrength: 75,
      marketShare: 68,
      innovation: 82,
      customerSatisfaction: 79,
      digitalPresence: 85
    },
    topCompetitor: {
      brandStrength: 88,
      marketShare: 92,
      innovation: 76,
      customerSatisfaction: 71,
      digitalPresence: 83
    }
  },
  
  demographics: {
    ageGroups: [
      { group: '18-24', percentage: 15 },
      { group: '25-34', percentage: 35 },
      { group: '35-44', percentage: 28 },
      { group: '45-54', percentage: 16 },
      { group: '55+', percentage: 6 }
    ],
    locations: [
      { country: 'United States', percentage: 45 },
      { country: 'Canada', percentage: 18 },
      { country: 'United Kingdom', percentage: 12 },
      { country: 'Australia', percentage: 8 },
      { country: 'Germany', percentage: 7 },
      { country: 'Others', percentage: 10 }
    ],
    devices: [
      { device: 'Desktop', percentage: 52 },
      { device: 'Mobile', percentage: 38 },
      { device: 'Tablet', percentage: 10 }
    ]
  },
  
  channelPerformance: [
    { channel: 'Organic Search', visitors: 42500, conversions: 1360, roi: 320 },
    { channel: 'Social Media', visitors: 28900, conversions: 867, roi: 280 },
    { channel: 'Direct', visitors: 18700, conversions: 748, roi: 400 },
    { channel: 'Paid Search', visitors: 15200, conversions: 912, roi: 180 },
    { channel: 'Email', visitors: 8900, conversions: 534, roi: 450 },
    { channel: 'Referral', visitors: 6400, conversions: 192, roi: 150 }
  ],
  
  contentPerformance: [
    { title: 'Ultimate Brand Guide 2024', views: 15600, engagement: 8.2, shares: 234 },
    { title: 'Industry Trends Analysis', views: 12400, engagement: 7.8, shares: 189 },
    { title: 'Customer Success Stories', views: 10900, engagement: 9.1, shares: 312 },
    { title: 'Product Feature Showcase', views: 8700, engagement: 6.9, shares: 156 },
    { title: 'Behind the Scenes', views: 7200, engagement: 8.7, shares: 203 }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Analytics Service API
 */
export const analyticsService = {
  /**
   * Get overview analytics data
   * @returns {Promise<Object>} Overview metrics
   */
  async getOverview() {
    try {
      await delay(600);
      return {
        success: true,
        data: mockAnalyticsData.overview,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching overview:', error);
      throw new Error('Failed to fetch analytics overview');
    }
  },

  /**
   * Get brand performance data
   * @param {string} timeRange - Time range (7d, 30d, 90d)
   * @returns {Promise<Object>} Performance metrics over time
   */
  async getBrandPerformance(timeRange = '30d') {
    try {
      await delay(800);
      const validRanges = ['7d', '30d', '90d'];
      const range = validRanges.includes(timeRange) ? timeRange : '30d';
      
      return {
        success: true,
        data: mockAnalyticsData.brandPerformance[range],
        timeRange: range,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching brand performance:', error);
      throw new Error('Failed to fetch brand performance data');
    }
  },

  /**
   * Get competitor comparison data
   * @returns {Promise<Object>} Competitor comparison metrics
   */
  async getCompetitorComparison() {
    try {
      await delay(700);
      return {
        success: true,
        data: mockAnalyticsData.competitorComparison,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching competitor comparison:', error);
      throw new Error('Failed to fetch competitor comparison data');
    }
  },

  /**
   * Get audience demographics
   * @returns {Promise<Object>} Demographic breakdown
   */
  async getDemographics() {
    try {
      await delay(500);
      return {
        success: true,
        data: mockAnalyticsData.demographics,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching demographics:', error);
      throw new Error('Failed to fetch demographic data');
    }
  },

  /**
   * Get marketing channel performance
   * @returns {Promise<Array>} Channel performance metrics
   */
  async getChannelPerformance() {
    try {
      await delay(600);
      return {
        success: true,
        data: mockAnalyticsData.channelPerformance,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching channel performance:', error);
      throw new Error('Failed to fetch channel performance data');
    }
  },

  /**
   * Get content performance metrics
   * @returns {Promise<Array>} Content performance data
   */
  async getContentPerformance() {
    try {
      await delay(550);
      return {
        success: true,
        data: mockAnalyticsData.contentPerformance,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching content performance:', error);
      throw new Error('Failed to fetch content performance data');
    }
  },

  /**
   * Get custom analytics report
   * @param {Object} filters - Report filters
   * @returns {Promise<Object>} Custom report data
   */
  async getCustomReport(filters = {}) {
    try {
      await delay(1000);
      const {
        dateRange = '30d',
        metrics = ['views', 'engagement', 'conversion'],
        channels = [],
        segments = []
      } = filters;

      // Generate custom report based on filters
      const report = {
        summary: {
          totalViews: 125430,
          totalEngagement: 24567,
          totalConversions: 4013,
          period: dateRange,
          generatedAt: new Date().toISOString()
        },
        breakdown: {
          daily: generateTimeSeriesData(30, 4200, 600),
          weekly: generateTimeSeriesData(4, 29400, 4200),
          monthly: generateTimeSeriesData(12, 125400, 18000)
        },
        insights: [
          'Peak engagement occurs on Tuesday and Wednesday',
          'Mobile users show 23% higher conversion rates',
          'Social media channels drive highest quality traffic',
          'Video content generates 40% more engagement'
        ],
        recommendations: [
          'Increase content posting on high-engagement days',
          'Optimize mobile user experience',
          'Expand social media advertising budget',
          'Create more video-based content'
        ]
      };

      return {
        success: true,
        data: report,
        filters: filters,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating custom report:', error);
      throw new Error('Failed to generate custom analytics report');
    }
  },

  /**
   * Export analytics data
   * @param {string} format - Export format (csv, json, pdf)
   * @param {Object} options - Export options
   * @returns {Promise<Object>} Export result
   */
  async exportData(format = 'csv', options = {}) {
    try {
      await delay(1200);
      const supportedFormats = ['csv', 'json', 'pdf'];
      
      if (!supportedFormats.includes(format)) {
        throw new Error(`Unsupported export format: ${format}`);
      }

      // Simulate export process
      const exportResult = {
        format,
        filename: `analytics_export_${new Date().toISOString().split('T')[0]}.${format}`,
        size: '2.4MB',
        downloadUrl: `#export-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      return {
        success: true,
        data: exportResult,
        message: 'Export completed successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export analytics data');
    }
  }
};

export default analyticsService;