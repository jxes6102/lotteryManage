import request from '@/api/index'
export const getAdvertise = () => {
    const url = '/api/advertising/front'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const advertiseList = () => {
    const url = '/api/advertising/list'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const advertiseDetail = (data) => {
    const url = '/api/advertising/detail'
    const method = 'get'
    return request({
      method,
      url,
      data
    })
}

export const advertiseCreate = (data) => {
    const url = '/api/advertising/create'
    const method = 'post'
    return request({
      method,
      url,
      data
    })
}

export const advertiseEdit = (data) => {
    const url = '/api/advertising/edit'
    const method = 'post'
    return request({
      method,
      url,
      data
    })
}