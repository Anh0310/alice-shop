import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import sizeAPI from '../../api/sizeApi'

export const getAllSize = createAsyncThunk(
  'size/getAllSize',
  async (params, { rejectWithValue }) => {
    try {
      return await sizeAPI.getAllSize(params)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const getSize = createAsyncThunk(
  'size/getSize',
  async (id, { rejectWithValue }) => {
    try {
      return await sizeAPI.getSize(id)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addSize = createAsyncThunk(
  'size/addSize',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await sizeAPI.addSize(data)

      dispatch(getAllSize())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateSize = createAsyncThunk(
  'size/updateSize',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await sizeAPI.updateSize(data)

      dispatch(getAllSize())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const deleteSize = createAsyncThunk(
  'size/deleteSize',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await sizeAPI.deleteSize(id)

      dispatch(getAllSize())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const initialState = {
  sizes: [],
  totalItems: 0,
  currentPage: 0,
  limit: 10,
  sizesLoading: false,
  size: {},
  sizeLoading: false,
}

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [getAllSize.pending]: (state) => {
      state.sizesLoading = true
    },
    [getAllSize.fulfilled]: (state, action) => {
      state.sizesLoading = false
      state.sizes = action.payload.sizes
      state.totalItems = action.payload.totalItems
      state.currentPage = action.payload.currentPage
      state.limit = action.payload.limit
    },
  },
})

export const { setPage } = sizeSlice.actions
export default sizeSlice.reducer
