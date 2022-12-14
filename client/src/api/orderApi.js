import axiosClient from './axiosClient'

const orderAPI = {
  getAllOrder: async (userId, params) => {
    const url = '/orders'

    if (userId) {
      return await axiosClient.get(url, {
        params: new URLSearchParams({ userId }),
      })
    } else {
      return await axiosClient.get(url, {
        params: params ? new URLSearchParams(params) : undefined,
      })
    }
  },

  addOrder: async (data) => {
    const url = '/orders'
    return await axiosClient.post(url, { data })
  },

  updateOrder: async (data) => {
    const url = `/orders/${data.id}`
    return await axiosClient.put(url, { data })
  },

  getOrder: async (id) => {
    const url = `/orders/${id}`
    return await axiosClient.get(url)
  },

  deleteOrder: async (id) => {
    const url = `/orders/${id}`
    return await axiosClient.delete(url)
  },
}

export default orderAPI
