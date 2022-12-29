import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  response: {},
  user: {},
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.response = action.payload
      state.user = action.payload.user
      sessionStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    logoutSuccess: (state) => {
      sessionStorage.removeItem("user")
      state.response = {}
    },
    registerSuccess: (state, action) => {
      state.isLoading = false
      state.response = action.payload
    },
    requestFail: (state, action) => {
      state.isLoading = false
      state.response = action.payload
    },
  },
})

const { reducer, actions } = authSlice

export const { requestPending, loginSuccess, registerSuccess, requestFail } =
  actions

export default reducer
