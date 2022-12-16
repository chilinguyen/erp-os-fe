import axios from 'axios'
import { nextConfig } from '../common-value'

const axiosInstance = axios.create({
  baseURL: nextConfig.apiBaseUrl,
})

axiosInstance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      pathName: window?.location?.pathname,
    },
  }
})

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) return Promise.reject(error.response)
    return null
  }
)

export default axiosInstance
