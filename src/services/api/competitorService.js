/**
 * Competitor Service - Handles all competitor-related API operations
 * Provides mock data for development and testing
 */

// Mock competitor data
const mockCompetitors = [
  {
    id: 1,
    name: "TechCorp Industries",
    logo: "https://via.placeholder.com/64x64/6366F1/FFFFFF?text=TC",
    industry: "Technology",
    marketShare: 35.2,
    brandStrength: 8.5,
    socialFollowers: 2500000,
    monthlyTraffic: 15000000,
    keyStrengths: ["Innovation", "Brand Recognition", "Market Presence"],
    weaknesses: ["Pricing", "Customer Service"],
    recentNews: [
      { title: "TechCorp launches new AI platform", date: "2024-01-15" },
      { title: "Q4 earnings exceed expectations", date: "2024-01-10" }
    ],
    metrics: {
      brandAwareness: 85,
      customerSatisfaction: 72,
      marketPosition: 90,
      innovation: 88,
      pricing: 45
    }
  },
  {
    id: 2,
    name: "InnovateLabs",
    logo: "https://via.placeholder.com/64x64/8B5CF6/FFFFFF?text=IL",
    industry: "Technology",
    marketShare: 22.8,
    brandStrength: 7.2,
    socialFollowers: 1200000,
    monthlyTraffic: 8500000,
    keyStrengths: ["Research & Development", "Agile Development"],
    weaknesses: ["Marketing", "Brand Awareness"],
    recentNews: [
      { title: "InnovateLabs secures $100M funding", date: "2024-01-12" },
      { title: "New product line announcement", date: "2024-01-08" }
    ],
    metrics: {
      brandAwareness: 62,
      customerSatisfaction: 81,
      marketPosition: 70,
      innovation: 92,
      pricing: 78
    }
  },
  {
    id: 3,
    name: "MarketLeader Co",
    logo: "https://via.placeholder.com/64x64/EC4899/FFFFFF?text=ML",
    industry: "Technology",
    marketShare: 18.5,
    brandStrength: 6.8,
    socialFollowers: 980000,
    monthlyTraffic: 6200000,
    keyStrengths: ["Market Penetration", "Distribution Network"],
    weaknesses: ["Innovation", "Digital Transformation"],
    recentNews: [
      { title: "MarketLeader expands to Asian markets", date: "2024-01-14" },
      { title: "Partnership with regional distributors", date: "2024-01-06" }
    ],
    metrics: {
      brandAwareness: 75,
      customerSatisfaction: 68,
      marketPosition: 82,
      innovation: 55,
      pricing: 85
    }
  }
];

// Mock competitive matrix data
const mockCompetitiveMatrix = {
  categories: [
    "Brand Strength",
    "Market Share",
    "Innovation",
    "Customer Satisfaction",
    "Pricing",
    "Digital Presence"
  ],
  competitors: [
    {
      id: 1,
      name: "TechCorp Industries",
      scores: [8.5, 9.0, 8.8, 7.2, 4.5, 8.7]
    },
    {
      id: 2,
      name: "InnovateLabs",
      scores: [7.2, 7.0, 9.2, 8.1, 7.8, 7.5]
    },
    {
      id: 3,
      name: "MarketLeader Co",
      scores: [6.8, 8.2, 5.5, 6.8, 8.5, 6.2]
    },
    {
      id: 'current',
      name: "Your Brand",
      scores: [6.5, 5.8, 7.5, 8.5, 7.2, 8.0]
    }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Competitor Service API
 */
export const competitorService = {
  /**
   * Fetch all competitors
   * @returns {Promise<Array>} Array of competitor objects
   */
  async getCompetitors() {
    try {
      await delay(800); // Simulate API delay
      return {
        success: true,
        data: mockCompetitors,
        total: mockCompetitors.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching competitors:', error);
      throw new Error('Failed to fetch competitors');
    }
  },

  /**
   * Fetch competitor by ID
   * @param {number} id - Competitor ID
   * @returns {Promise<Object>} Competitor object
   */
  async getCompetitor(id) {
    try {
      await delay(500);
      const competitor = mockCompetitors.find(c => c.id === parseInt(id));
      
      if (!competitor) {
        throw new Error('Competitor not found');
      }

      return {
        success: true,
        data: competitor,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching competitor:', error);
      throw new Error('Failed to fetch competitor details');
    }
  },

  /**
   * Fetch competitive analysis matrix
   * @returns {Promise<Object>} Matrix data with categories and competitor scores
   */
  async getCompetitiveMatrix() {
    try {
      await delay(1000);
      return {
        success: true,
        data: mockCompetitiveMatrix,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching competitive matrix:', error);
      throw new Error('Failed to fetch competitive analysis');
    }
  },

  /**
   * Add new competitor for tracking
   * @param {Object} competitorData - Competitor information
   * @returns {Promise<Object>} Created competitor object
   */
  async addCompetitor(competitorData) {
    try {
      await delay(600);
      const newCompetitor = {
        id: Date.now(),
        ...competitorData,
        createdAt: new Date().toISOString(),
        metrics: {
          brandAwareness: 0,
          customerSatisfaction: 0,
          marketPosition: 0,
          innovation: 0,
          pricing: 0
        }
      };

      return {
        success: true,
        data: newCompetitor,
        message: 'Competitor added successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error adding competitor:', error);
      throw new Error('Failed to add competitor');
    }
  },

  /**
   * Update competitor information
   * @param {number} id - Competitor ID
   * @param {Object} updates - Updated competitor data
   * @returns {Promise<Object>} Updated competitor object
   */
  async updateCompetitor(id, updates) {
    try {
      await delay(500);
      const competitor = mockCompetitors.find(c => c.id === parseInt(id));
      
      if (!competitor) {
        throw new Error('Competitor not found');
      }

      const updatedCompetitor = {
        ...competitor,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      return {
        success: true,
        data: updatedCompetitor,
        message: 'Competitor updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating competitor:', error);
      throw new Error('Failed to update competitor');
    }
  },

  /**
   * Remove competitor from tracking
   * @param {number} id - Competitor ID
   * @returns {Promise<Object>} Success confirmation
   */
  async removeCompetitor(id) {
    try {
      await delay(400);
      const competitor = mockCompetitors.find(c => c.id === parseInt(id));
      
      if (!competitor) {
        throw new Error('Competitor not found');
      }

      return {
        success: true,
        message: 'Competitor removed successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error removing competitor:', error);
      throw new Error('Failed to remove competitor');
    }
  },

  /**
   * Get competitor analysis report
   * @param {Array} competitorIds - Array of competitor IDs to analyze
   * @returns {Promise<Object>} Analysis report with insights
   */
  async getAnalysisReport(competitorIds = []) {
    try {
      await delay(1200);
      const competitors = mockCompetitors.filter(c => 
        competitorIds.length === 0 || competitorIds.includes(c.id)
      );

      const report = {
        summary: {
          totalCompetitors: competitors.length,
          averageMarketShare: competitors.reduce((sum, c) => sum + c.marketShare, 0) / competitors.length,
          topCompetitor: competitors.reduce((top, c) => c.brandStrength > top.brandStrength ? c : top, competitors[0]),
          marketGaps: ["Premium segment", "Mobile-first solutions", "Sustainability focus"]
        },
        insights: [
          "Market leader has strong brand recognition but weak pricing strategy",
          "Innovation gap exists in AI-powered features",
          "Customer service quality varies significantly across competitors",
          "Digital transformation is a key differentiator"
        ],
        recommendations: [
          "Focus on competitive pricing in premium segment",
          "Invest in AI and automation capabilities",
          "Strengthen customer service operations",
          "Accelerate digital marketing initiatives"
        ],
        competitors: competitors
      };

      return {
        success: true,
        data: report,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating analysis report:', error);
      throw new Error('Failed to generate competitive analysis report');
    }
  }
};

export default competitorService;