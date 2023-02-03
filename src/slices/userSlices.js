import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    friendrequest:localStorage.getItem("friendrequest") ? JSON.parse(localStorage.getItem("friendrequest")) : null,
  },
  reducers: {
    activeUser: (state,action) => {
     
      state = {...state, userInfo: action.payload}
    },
    friendr: (state,action) => {
      console.log(action.payload)
      state = {...state, friendrequest: action.payload}
    } 
  },
})

// Action creators are generated for each case reducer function
export const { activeUser,friendr } = userSlice.actions

export default userSlice.reducer