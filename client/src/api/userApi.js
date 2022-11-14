import axiosClient from './axiosClient'

const userAPI = {
  getAllUser: async (params) => {
    const url = '/users'
    return await axiosClient.get(url, {
      params: params ? new URLSearchParams(params) : undefined,
    })
  },

  addUser: async (data) => {
    const url = '/users'
    return await axiosClient.post(url, data)
  },

  updateUser: async (data) => {
    const url = `/users/${data._id}`
    return await axiosClient.put(url, data)
  },

  getUser: async (id) => {
    const url = `/users/${id}`
    return await axiosClient.get(url)
  },

  deleteUser: async (id) => {
    const url = `/users/${id}`
    return await axiosClient.delete(url)
  },

  forgotPassword: async (email) => {
  	const url = '/users/forgot-password'
  	return await axiosClient.post(url, { email })
  },
  resetPassword: async (params) => {
  	const url = `/users/reset-password`
  	return await axiosClient.post(url, params)
  },
}

export default userAPI
