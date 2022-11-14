import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../../api/userApi'

export const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (params, { rejectWithValue }) => {
    try {
      return await userAPI.getAllUser(params)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const result = await userAPI.getUser(id)
      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await userAPI.addUser(data)

      dispatch(getAllUser({ currentPage: 0 }))

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await userAPI.updateUser(data)
      dispatch(getUser(data._id))
      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateUserDashboard = createAsyncThunk(
  'user/updateUserDashboard',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await userAPI.updateUser(data)
      dispatch(getAllUser({ currentPage: 0 }))
      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await userAPI.deleteUser(id)

      dispatch(getAllUser({ currentPage: 0 }))

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const result = await userAPI.forgotPassword(email)

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (params, { rejectWithValue }) => {
    try {
      const result = await userAPI.resetPassword(params)
      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const initialState = {
  users: [],
  totalItems: 0,
  currentPage: 0,
  limit: 10,
  usersLoading: false,
  user: {},
  userLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [getAllUser.pending]: (state) => {
      state.usersLoading = true
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.usersLoading = false
      state.users = action.payload.users
      state.totalItems = action.payload.totalItems
      state.currentPage = action.payload.currentPage
      state.limit = action.payload.limit
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },

    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { setPage } = userSlice.actions
export default userSlice.reducer
