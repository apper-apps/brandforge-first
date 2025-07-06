import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentBrand: null,
  brands: [],
  wizardProgress: 0,
  wizardData: {},
  isLoading: false,
  error: null,
}

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setCurrentBrand: (state, action) => {
      state.currentBrand = action.payload
    },
    setBrands: (state, action) => {
      state.brands = action.payload
    },
    addBrand: (state, action) => {
      state.brands.push(action.payload)
    },
    updateBrand: (state, action) => {
      const index = state.brands.findIndex(brand => brand.id === action.payload.id)
      if (index !== -1) {
        state.brands[index] = action.payload
      }
    },
    setWizardProgress: (state, action) => {
      state.wizardProgress = action.payload
    },
    setWizardData: (state, action) => {
      state.wizardData = { ...state.wizardData, ...action.payload }
    },
    resetWizard: (state) => {
      state.wizardProgress = 0
      state.wizardData = {}
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setCurrentBrand,
  setBrands,
  addBrand,
  updateBrand,
  setWizardProgress,
  setWizardData,
  resetWizard,
  setLoading,
  setError,
} = brandSlice.actions

export default brandSlice.reducer