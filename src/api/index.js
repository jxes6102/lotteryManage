import axios from 'axios'
import { useLoginStore,useUserStore } from '@/stores/index'

export const TIMEOUT = 10000

// const DEFAULT_CACHE_EXPIRY_TIME = 3000
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-391D3550-2FAB-43F0-AA4D-06929689EB22

const CONFIG = {
  // baseURL: 'https://cet.bryte.com.tw/api/v2',
  baseURL: 'https://ttlinblog.com/apiv2/',
  timeout: TIMEOUT,
  // headers: { Authorization: `Bearer ${token}` }
}
const instance = axios.create(CONFIG)

instance.interceptors.request.use(
  config => {
    // before request is sent

    config.headers['ngrok-skip-browser-warning'] = 69420
    const token = localStorage.getItem('lotteryToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` 
    }

    // console.log('interceptors.request config',config)
    return config
  },
  error => {
    // console.log('interceptors.request error',error)
    // request error
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    // Do something with response data
    // console.log('interceptors.response response',response)
    // console.log('response',response)
    // console.log('X-Refresh-Token:',response)
    // console.log('response',response)
    // console.log('X-Refresh-Token',response.headers.get("x-auth-token"));
    // console.log('content-type',response.headers["content-type"])
    // console.log('X-Refresh-Token',response.headers["x-auth-token"])
    // console.log('X-Refresh-Token',response.headers["X-Refresh-Token"])
    // console.log('response',response)
    return response;
  },
  error => {
    // console.log('interceptors.response error',error)
    if(error.response?.status == 401){
      const loginStore = useLoginStore()
      const userStore = useUserStore()
      loginStore.clearToken()
      userStore.clearUserInformation()
      let returnUrl = '#/loginView'
      window.location.replace((window.location.origin + window.location.pathname+returnUrl))
    }

    // const loginStore = useLoginStore()
    // const userStore = useUserStore()
    // loginStore.clearToken()
    // userStore.clearUserInformation()
    // let returnUrl = '#/loginView'
    // window.location.replace((window.location.origin + window.location.pathname+returnUrl))

    return Promise.reject(error);
  }
);

/**
 * @param {string} method http的request methods
 * @param {string} url 同axios的url
 * @param {object} data axios收的params或data(依method決定)
 * @param {number} timeout(optional) 同axios config中的timeout
 * @param {number} noCache(optional) method為get 且傳入true時 不使用既有的快取
 */
export default async function ({
  method = '',
  url = '',
  data,
  timeout,
  noCache,
}) {
  // console.log('b')
  const config = {
    timeout,
    noCache,
  }
  method = method.toLowerCase()
  switch (method) {
    case 'get':
      // cache機制 檢查是否取出
      return instance.get(url, { params: data }, config)
    case 'post':
      return instance.post(url, data, config)
    case 'delete':
      config.params = data
      return instance.delete(url, config)
    case 'put':
      return instance.put(url, data, config)
    case 'patch':
      return instance.patch(url, data, config)
    default:
      // TODO: 這邊設計未知method的錯誤
      return Promise.reject()
  }
}
