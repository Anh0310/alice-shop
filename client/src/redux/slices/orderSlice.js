import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderAPI from '../../api/orderApi'

export const getAllOrder = createAsyncThunk(
  'order/getAllCategory',
  async ({ userId, ...params }, { rejectWithValue }) => {
    try {
      return await orderAPI.getAllOrder(userId, params)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrder(id)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await orderAPI.addOrder(data)

      dispatch(getAllOrder())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await orderAPI.updateOrder(data)

      dispatch(getAllOrder({ currentPage: 0 }))

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await orderAPI.deleteOrder(id)

      dispatch(getAllOrder())

      return result
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const initialState = {
  orders: [],
  totalItems: 0,
  currentPage: 0,
  limit: 10,
  ordersLoading: false,
  order: {},
  orderLoading: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [getAllOrder.pending]: (state) => {
      state.ordersLoading = true
    },
    [getAllOrder.fulfilled]: (state, action) => {
      state.ordersLoading = false
      state.orders = action.payload.orders
      state.totalItems = action.payload.totalItems
      state.currentPage = action.payload.currentPage
      state.limit = action.payload.limit
    },
  },
})

export const { setPage } = orderSlice.actions
export default orderSlice.reducer
