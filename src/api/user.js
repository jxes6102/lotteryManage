import request from '@/api/index'

export const getUserList = () => {
    const url = '/api/user/list'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const userDetail = (data) => {
    const url = '/api/user/detail'
    const method = 'get'
    return request({
      method,
      url,
      data,
    })
}

export const userCreate = (data) => {
    const url = '/api/user/create'
    const method = 'post'
    return request({
      method,
      url,
      data
    })
}

export const userEdit = (data) => {
    const url = '/api/user/edit'
    const method = 'post'
    return request({
      method,
      url,
      data
    })
}