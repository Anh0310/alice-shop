import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryAPI from '../../api/categoryApi'

export const getAllCategory = createAsyncThunk(
  'category/getAllCategory',
  async (params, { rejectWithValue }) => {
    try {
      return await categoryAPI.getAllCategory(params)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (id, { rejectWithValue }) => {
    try {
      return await categoryAPI.getCategory(id)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await categoryAPI.addCategory(data)

      dispatch(getAllCategory())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await categoryAPI.updateCategory(data)

      dispatch(getAllCategory())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await categoryAPI.deleteCategory(id)

      dispatch(getAllCategory())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const initialState = {
  categories: [],
  totalItems: 0,
  currentPage: 0,
  limit: 10,
  categoriesLoading: false,
  category: {},
  categoryLoading: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [getAllCategory.pending]: (state) => {
      state.categoriesLoading = true
    },
    [getAllCategory.fulfilled]: (state, action) => {
      state.categoriesLoading = false
      state.categories = action.payload.categories
      state.totalItems = action.payload.totalItems
      state.currentPage = action.payload.currentPage
      state.limit = action.payload.limit
    },
  },
})

export const { setPage } = categorySlice.actions
export default categorySlice.reducer
