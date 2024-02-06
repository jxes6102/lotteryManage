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

export const advertiseDetail = () => {
    const url = '/api/advertising/detail'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const advertiseCreate = () => {
    const url = '/api/advertising/create'
    const method = 'post'
    return request({
      method,
      url,
    })
}

export const advertiseEdit = () => {
    const url = '/api/advertising/edit'
    const method = 'post'
    return request({
      method,
      url,
    })
}