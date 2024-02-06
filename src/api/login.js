import request from '@/api/index'

export const doLogin = (data) => {
  const url = '/api/auth/login'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const loginInformation = () => {
    const url = '/api/auth/me'
    const method = 'post'
    return request({
      method,
      url,
    })
}

export const doLoginOut = () => {
    const url = '/api/auth/logout'
    const method = 'post'
    return request({
      method,
      url,
    })
}

const addToUrl = (payload) => {
    let str = '?'
    for(let key in payload){
        str += key + '=' + payload[key] + '&'
    }
    str = str.substring(0,str.length-1)
    return str
}