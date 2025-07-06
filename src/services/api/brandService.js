/**
 * Brand Service - Handles all brand-related API operations
 * Provides mock data for development and testing
 */

// Mock brand data
const mockBrands = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform",
    logo: "https://via.placeholder.com/64x64/6366F1/FFFFFF?text=TF",
    industry: "Technology",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    metrics: {
      brandAwareness: 75,
      marketShare: 12.5,
      customerSatisfaction: 4.2,
      socialFollowers: 25000,
      monthlyTraffic: 150000
    },
    colors: {
      primary: "#6366F1",
      secondary: "#8B5CF6",
      accent: "#EC4899"
    },
    archetype: "The Innovator",
    values: ["Innovation", "Reliability", "User-Centric Design"],
    targetAudience: "Tech-savvy professionals aged 25-45",
    positioning: "The most intuitive automation platform for modern teams"
  },
  {
    id: 2,
    name: "GreenEarth Cosmetics",
    description: "Sustainable beauty products for conscious consumers",
    logo: "https://via.placeholder.com/64x64/10B981/FFFFFF?text=GE",
    industry: "Beauty & Personal Care",
    status: "active",
    createdAt: "2024-01-10T08:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
    metrics: {
      brandAwareness: 68,
      marketShare: 8.3,
      customerSatisfaction: 4.5,
      socialFollowers: 45000,
      monthlyTraffic: 89000
    },
    colors: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#F59E0B"
    },
    archetype: "The Caregiver",
    values: ["Sustainability", "Natural Beauty", "Ethical Practices"],
    targetAudience: "Environmentally conscious women aged 18-40",
    positioning: "Clean beauty that cares for you and the planet"
  }
];

// Mock dashboard data
const mockDashboardData = {
  stats: {
    totalBrands: 2,
    activeCampaigns: 8,
    totalReach: 284000,
    averageEngagement: 6.8,
    monthlyGrowth: 12.5,
    customerSatisfaction: 4.35
  },
  
  recentActivity: [
    {
      id: 1,
      type: "brand_created",
      title: "New brand 'TechFlow Solutions' created",
      description: "Brand wizard completed successfully",
      timestamp: "2024-01-20T14:30:00Z",
      icon: "plus-circle",
      color: "brand-success"
    },
    {
      id: 2,
      type: "campaign_launched",
      title: "Social media campaign launched",
      description: "Q1 awareness campaign for GreenEarth Cosmetics",
      timestamp: "2024-01-19T11:15:00Z",
      icon: "rocket",
      color: "brand-primary"
    },
    {
      id: 3,
      type: "report_generated",
      title: "Monthly analytics report generated",
      description: "Performance metrics for January 2024",
      timestamp: "2024-01-18T09:45:00Z",
      icon: "file-text",
      color: "brand-info"
    },
    {
      id: 4,
      type: "competitor_added",
      title: "New competitor added to tracking",
      description: "MarketLeader Co added to competitive analysis",
      timestamp: "2024-01-17T16:20:00Z",
      icon: "eye",
      color: "brand-warning"
    }
  ],
  
  topPerformingBrands: [
    {
      id: 1,
      name: "TechFlow Solutions",
      performance: 85,
      growth: 15.2,
      engagement: 7.8
    },
    {
      id: 2,
      name: "GreenEarth Cosmetics",
      performance: 78,
      growth: 9.5,
      engagement: 8.2
    }
  ],
  
  upcomingTasks: [
    {
      id: 1,
      title: "Review Q1 campaign performance",
      dueDate: "2024-01-25T10:00:00Z",
      priority: "high",
      brand: "TechFlow Solutions"
    },
    {
      id: 2,
      title: "Update competitor analysis",
      dueDate: "2024-01-28T14:00:00Z",
      priority: "medium",
      brand: "GreenEarth Cosmetics"
    },
    {
      id: 3,
      title: "Prepare monthly report",
      dueDate: "2024-01-30T17:00:00Z",
      priority: "low",
      brand: "All Brands"
    }
  ]
};

// Mock brand strategy data
const mockBrandStrategies = {
  "The Innovator": {
    description: "Brands that push boundaries and create new solutions",
    characteristics: ["Forward-thinking", "Risk-taking", "Visionary"],
    messagingTone: "Confident, inspiring, future-focused",
    colorPalette: ["#6366F1", "#8B5CF6", "#EC4899"],
    typography: "Modern, clean, geometric",
    imagery: "Futuristic, tech-focused, dynamic"
  },
  "The Caregiver": {
    description: "Brands that nurture and support their customers",
    characteristics: ["Compassionate", "Reliable", "Supportive"],
    messagingTone: "Warm, caring, trustworthy",
    colorPalette: ["#10B981", "#059669", "#F59E0B"],
    typography: "Soft, approachable, rounded",
    imagery: "Natural, people-focused, authentic"
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Brand Service API
 */
export const brandService = {
  /**
   * Get all brands
   * @returns {Promise<Array>} Array of brand objects
   */
  async getBrands() {
    try {
      await delay(600);
      return {
        success: true,
        data: mockBrands,
        total: mockBrands.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw new Error('Failed to fetch brands');
    }
  },

  /**
   * Get brand by ID
   * @param {number} id - Brand ID
   * @returns {Promise<Object>} Brand object
   */
  async getBrand(id) {
    try {
      await delay(400);
      const brand = mockBrands.find(b => b.id === parseInt(id));
      
      if (!brand) {
        throw new Error('Brand not found');
      }

      return {
        success: true,
        data: brand,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching brand:', error);
      throw new Error('Failed to fetch brand details');
    }
  },

  /**
   * Create new brand
   * @param {Object} brandData - Brand information
   * @returns {Promise<Object>} Created brand object
   */
  async createBrand(brandData) {
    try {
      await delay(800);
      const newBrand = {
        id: Date.now(),
        ...brandData,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metrics: {
          brandAwareness: 0,
          marketShare: 0,
          customerSatisfaction: 0,
          socialFollowers: 0,
          monthlyTraffic: 0
        }
      };

      return {
        success: true,
        data: newBrand,
        message: 'Brand created successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating brand:', error);
      throw new Error('Failed to create brand');
    }
  },

  /**
   * Update brand
   * @param {number} id - Brand ID
   * @param {Object} updates - Updated brand data
   * @returns {Promise<Object>} Updated brand object
   */
  async updateBrand(id, updates) {
    try {
      await delay(600);
      const brand = mockBrands.find(b => b.id === parseInt(id));
      
      if (!brand) {
        throw new Error('Brand not found');
      }

      const updatedBrand = {
        ...brand,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      return {
        success: true,
        data: updatedBrand,
        message: 'Brand updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating brand:', error);
      throw new Error('Failed to update brand');
    }
  },

  /**
   * Delete brand
   * @param {number} id - Brand ID
   * @returns {Promise<Object>} Success confirmation
   */
  async deleteBrand(id) {
    try {
      await delay(500);
      const brand = mockBrands.find(b => b.id === parseInt(id));
      
      if (!brand) {
        throw new Error('Brand not found');
      }

      return {
        success: true,
        message: 'Brand deleted successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error deleting brand:', error);
      throw new Error('Failed to delete brand');
    }
  },

  /**
   * Get dashboard data
   * @returns {Promise<Object>} Dashboard statistics and activity
   */
  async getDashboardData() {
    try {
      await delay(700);
      return {
        success: true,
        data: mockDashboardData,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  },

  /**
   * Generate brand strategy
   * @param {Object} wizardData - Data from brand wizard
   * @returns {Promise<Object>} Generated brand strategy
   */
  async generateBrandStrategy(wizardData) {
    try {
      await delay(2000); // Longer delay to simulate AI processing
      
      const {
        companyInfo = {},
        audience = {},
        competitors = [],
        values = [],
        archetype = "The Innovator",
        positioning = {},
        messaging = {}
      } = wizardData;

      // Generate strategy based on wizard data
      const strategy = {
        brandIdentity: {
          name: companyInfo.name || "Your Brand",
          description: companyInfo.description || "A forward-thinking company",
          archetype: archetype,
          values: values,
          positioning: positioning.statement || "Leading the market with innovation"
        },
        
        targetAudience: {
          primary: audience.primary || "Tech-savvy professionals",
          demographics: audience.demographics || {},
          psychographics: audience.psychographics || {},
          painPoints: audience.painPoints || []
        },
        
        competitiveAnalysis: {
          mainCompetitors: competitors,
          marketGaps: [
            "Premium segment opportunity",
            "Mobile-first approach",
            "Sustainability focus"
          ],
          differentiators: [
            "Superior user experience",
            "Innovative technology",
            "Customer-centric approach"
          ]
        },
        
        brandStrategy: mockBrandStrategies[archetype] || mockBrandStrategies["The Innovator"],
        
        messagingFramework: {
          coreMessage: messaging.coreMessage || "Empowering success through innovation",
          keyMessages: messaging.keyMessages || [
            "Innovation that matters",
            "Results you can trust",
            "Experience the difference"
          ],
          toneOfVoice: messaging.toneOfVoice || "Professional, confident, approachable"
        },
        
        recommendations: [
          "Focus on digital marketing channels",
          "Develop thought leadership content",
          "Build strategic partnerships",
          "Invest in customer experience",
          "Monitor competitor activities closely"
        ],
        
        nextSteps: [
          "Finalize brand guidelines",
          "Develop marketing materials",
          "Launch brand awareness campaign",
          "Set up tracking and analytics",
          "Create content calendar"
        ],
        
        timeline: {
          "Week 1-2": "Brand guidelines and asset creation",
          "Week 3-4": "Website and digital presence setup",
          "Week 5-6": "Marketing campaign launch",
          "Week 7-8": "Performance monitoring and optimization"
        }
      };

      return {
        success: true,
        data: strategy,
        message: 'Brand strategy generated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating brand strategy:', error);
      throw new Error('Failed to generate brand strategy');
    }
  },

  /**
   * Get brand analytics
   * @param {number} id - Brand ID
   * @param {string} timeRange - Time range for analytics
   * @returns {Promise<Object>} Brand analytics data
   */
  async getBrandAnalytics(id, timeRange = '30d') {
    try {
      await delay(800);
      const brand = mockBrands.find(b => b.id === parseInt(id));
      
      if (!brand) {
        throw new Error('Brand not found');
      }

      const analytics = {
        brandId: id,
        timeRange,
        metrics: {
          ...brand.metrics,
          growth: {
            brandAwareness: 12.5,
            marketShare: 8.3,
            customerSatisfaction: 5.7,
            socialFollowers: 15.2,
            monthlyTraffic: 18.9
          }
        },
        performance: {
          reach: Math.floor(Math.random() * 100000) + 50000,
          impressions: Math.floor(Math.random() * 500000) + 200000,
          engagement: Math.floor(Math.random() * 10000) + 5000,
          conversions: Math.floor(Math.random() * 1000) + 500
        },
        trends: {
          positive: ["Increasing social engagement", "Growing brand awareness"],
          negative: ["Declining conversion rate", "Increased competitor activity"],
          neutral: ["Stable market share", "Consistent customer satisfaction"]
        }
      };

      return {
        success: true,
        data: analytics,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching brand analytics:', error);
      throw new Error('Failed to fetch brand analytics');
    }
  }
};

export default brandService;