import axios from "axios"
import * as Cookie from "js-cookie"

axios.interceptors.request.use(function (config) {
  const tokenCookie: string | undefined =
    localStorage.getItem('ccmsRequestCredential') ||
    Cookie.get('ccmsRequestCredential');
  if (tokenCookie) {
    const token = JSON.parse(decodeURIComponent(tokenCookie));
    const access_token = token.access_token;
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + access_token
    }
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});