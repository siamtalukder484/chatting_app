import { configureStore } from '@reduxjs/toolkit'
import userSlices from './slices/userSlices'

export default configureStore({
  reducer: {
    userData: userSlices,
  },
})