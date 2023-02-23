import { configureStore } from '@reduxjs/toolkit'
import userSlices from './slices/userSlices'
import { activeUserSlice } from './slices/activeChatSlices'

export default configureStore({
  reducer: {
    userData: userSlices,
    activeChatUser: activeUserSlice,
  },
})