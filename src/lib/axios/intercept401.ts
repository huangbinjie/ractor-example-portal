import axios from "axios"
import environment from "@environment";

axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    location.href = environment.loginUrl
  }
  return response.data.data
}, function (error) {
  return Promise.reject(error)
})