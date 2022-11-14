import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productAPI from '../../api/productApi'
import uploadAPI from '../../api/uploadApi'

export const getAllProduct = createAsyncThunk(
  'product/getAllProduct',
  async (params, { rejectWithValue }) => {
    try {
      return await productAPI.getAllProduct(params)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id, { rejectWithValue }) => {
    try {
      return await productAPI.getProduct(id)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await productAPI.addProduct(data)

      dispatch(getAllProduct())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await productAPI.updateProduct(data)

      dispatch(getAllProduct())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await productAPI.deleteProduct(id)

      dispatch(getAllProduct())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const upload = createAsyncThunk('product/upload', async (files) => {
  return await uploadAPI.upload(files)
})

const initialState = {
  products: [],
  totalItems: 0,
  currentPage: 0,
  limit: 10,
  productsLoading: false,
  product: {},
  productLoading: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.productsLoading = true
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.productsLoading = false
      state.products = action.payload.products
      state.totalItems = action.payload.totalItems
      state.currentPage = action.payload.currentPage
      state.limit = action.payload.limit
    },
    [getProduct.pending]: (state) => {
      state.productLoading = true
    },
    [getProduct.fulfilled]: (state, action) => {
      state.productLoading = false
      state.product = action.payload.product
    },
  },
})

export const { setPage } = productSlice.actions
export default productSlice.reducer
