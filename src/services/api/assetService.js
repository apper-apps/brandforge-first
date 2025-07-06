// Mock asset data for demonstration
const mockAssets = [
  {
    id: 1,
    name: 'Primary Logo',
    type: 'logo',
    category: 'brand',
    format: 'svg',
    size: '2.4 MB',
    url: '/assets/logos/primary-logo.svg',
    thumbnail: '/assets/thumbnails/primary-logo.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    selected: false,
    tags: ['logo', 'primary', 'brand']
  },
  {
    id: 2,
    name: 'Business Card Template',
    type: 'business-card',
    category: 'marketing',
    format: 'pdf',
    size: '1.8 MB',
    url: '/assets/templates/business-card.pdf',
    thumbnail: '/assets/thumbnails/business-card.jpg',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    selected: false,
    tags: ['business-card', 'template', 'marketing']
  },
  {
    id: 3,
    name: 'Social Media Banner',
    type: 'social-media',
    category: 'social',
    format: 'png',
    size: '3.2 MB',
    url: '/assets/social/banner.png',
    thumbnail: '/assets/thumbnails/social-banner.jpg',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    selected: false,
    tags: ['social', 'banner', 'marketing']
  },
  {
    id: 4,
    name: 'Letter Head Template',
    type: 'letterhead',
    category: 'stationary',
    format: 'pdf',
    size: '1.2 MB',
    url: '/assets/templates/letterhead.pdf',
    thumbnail: '/assets/thumbnails/letterhead.jpg',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    selected: false,
    tags: ['letterhead', 'template', 'stationary']
  },
  {
    id: 5,
    name: 'Brand Color Palette',
    type: 'color-palette',
    category: 'brand',
    format: 'json',
    size: '0.1 MB',
    url: '/assets/brand/colors.json',
    thumbnail: '/assets/thumbnails/color-palette.jpg',
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
    selected: false,
    tags: ['colors', 'palette', 'brand']
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Asset service with comprehensive functionality
export const assetService = {
  // Get all assets with optional filtering and pagination
  async getAssets(params = {}) {
    await delay(800); // Simulate API call
    
    const {
      type = 'all',
      category,
      search = '',
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    try {
      let filteredAssets = [...mockAssets];

      // Filter by type
      if (type !== 'all') {
        filteredAssets = filteredAssets.filter(asset => asset.type === type);
      }

      // Filter by category
      if (category && category !== 'all') {
        filteredAssets = filteredAssets.filter(asset => asset.category === category);
      }

      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        filteredAssets = filteredAssets.filter(asset =>
          asset.name.toLowerCase().includes(searchLower) ||
          asset.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      // Sort assets
      filteredAssets.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Paginate
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          assets: paginatedAssets,
          pagination: {
            page,
            limit,
            total: filteredAssets.length,
            totalPages: Math.ceil(filteredAssets.length / limit),
            hasNext: endIndex < filteredAssets.length,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      console.error('Error fetching assets:', error);
      return {
        success: false,
        error: 'Failed to fetch assets'
      };
    }
  },

  // Get single asset by ID
  async getAssetById(id) {
    await delay(300);
    
    try {
      const asset = mockAssets.find(a => a.id === parseInt(id));
      if (!asset) {
        return {
          success: false,
          error: 'Asset not found'
        };
      }

      return {
        success: true,
        data: asset
      };
    } catch (error) {
      console.error('Error fetching asset:', error);
      return {
        success: false,
        error: 'Failed to fetch asset'
      };
    }
  },

  // Toggle asset selection
  async toggleAssetSelection(assetId) {
    await delay(200);
    
    try {
      const assetIndex = mockAssets.findIndex(a => a.id === assetId);
      if (assetIndex === -1) {
        return {
          success: false,
          error: 'Asset not found'
        };
      }

      mockAssets[assetIndex].selected = !mockAssets[assetIndex].selected;
      
      return {
        success: true,
        data: {
          assetId,
          selected: mockAssets[assetIndex].selected
        }
      };
    } catch (error) {
      console.error('Error toggling asset selection:', error);
      return {
        success: false,
        error: 'Failed to toggle asset selection'
      };
    }
  },

  // Generate new assets
  async generateAssets(params = {}) {
    await delay(3000); // Simulate longer generation time
    
    const {
      type = 'logo',
      style = 'modern',
      colors = ['#6366F1', '#8B5CF6'],
      size = 'medium',
      format = 'svg'
    } = params;

    try {
      // Simulate asset generation
      const newAsset = {
        id: Date.now(),
        name: `Generated ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        type,
        category: 'generated',
        format,
        size: '1.5 MB',
        url: `/assets/generated/${type}-${Date.now()}.${format}`,
        thumbnail: `/assets/thumbnails/generated-${type}.jpg`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        selected: false,
        tags: ['generated', type, style],
        generationParams: {
          style,
          colors,
          size,
          format
        }
      };

      mockAssets.unshift(newAsset);

      return {
        success: true,
        data: {
          asset: newAsset,
          message: 'Asset generated successfully'
        }
      };
    } catch (error) {
      console.error('Error generating asset:', error);
      return {
        success: false,
        error: 'Failed to generate asset'
      };
    }
  },

  // Download selected assets
  async downloadSelectedAssets() {
    await delay(1000);
    
    try {
      const selectedAssets = mockAssets.filter(asset => asset.selected);
      
      if (selectedAssets.length === 0) {
        return {
          success: false,
          error: 'No assets selected for download'
        };
      }

      // Simulate download preparation
      const downloadData = {
        assets: selectedAssets,
        downloadUrl: `/api/assets/download/${Date.now()}`,
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        totalSize: selectedAssets.reduce((total, asset) => {
          const size = parseFloat(asset.size.replace(' MB', ''));
          return total + size;
        }, 0)
      };

      return {
        success: true,
        data: downloadData
      };
    } catch (error) {
      console.error('Error preparing download:', error);
      return {
        success: false,
        error: 'Failed to prepare download'
      };
    }
  },

  // Get asset types and categories
  async getAssetMetadata() {
    await delay(300);
    
    try {
      const types = [
        { value: 'all', label: 'All Assets' },
        { value: 'logo', label: 'Logos' },
        { value: 'business-card', label: 'Business Cards' },
        { value: 'social-media', label: 'Social Media' },
        { value: 'letterhead', label: 'Letterheads' },
        { value: 'color-palette', label: 'Color Palettes' }
      ];

      const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'brand', label: 'Brand Assets' },
        { value: 'marketing', label: 'Marketing Materials' },
        { value: 'social', label: 'Social Media' },
        { value: 'stationary', label: 'Stationary' },
        { value: 'generated', label: 'Generated Assets' }
      ];

      const formats = ['svg', 'png', 'jpg', 'pdf', 'json'];

      return {
        success: true,
        data: {
          types,
          categories,
          formats
        }
      };
    } catch (error) {
      console.error('Error fetching asset metadata:', error);
      return {
        success: false,
        error: 'Failed to fetch asset metadata'
      };
    }
  },

  // Delete asset
  async deleteAsset(assetId) {
    await delay(500);
    
    try {
      const assetIndex = mockAssets.findIndex(a => a.id === assetId);
      if (assetIndex === -1) {
        return {
          success: false,
          error: 'Asset not found'
        };
      }

      const deletedAsset = mockAssets.splice(assetIndex, 1)[0];
      
      return {
        success: true,
        data: {
          deletedAsset,
          message: 'Asset deleted successfully'
        }
      };
    } catch (error) {
      console.error('Error deleting asset:', error);
      return {
        success: false,
        error: 'Failed to delete asset'
      };
    }
  },

  // Update asset
  async updateAsset(assetId, updates) {
    await delay(400);
    
    try {
      const assetIndex = mockAssets.findIndex(a => a.id === assetId);
      if (assetIndex === -1) {
        return {
          success: false,
          error: 'Asset not found'
        };
      }

      mockAssets[assetIndex] = {
        ...mockAssets[assetIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: mockAssets[assetIndex]
      };
    } catch (error) {
      console.error('Error updating asset:', error);
      return {
        success: false,
        error: 'Failed to update asset'
      };
    }
  }
};

export default assetService;