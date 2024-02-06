export const userList = () => {
    const url = '/api/user/list'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const userDetail = () => {
    const url = '/api/user/detail'
    const method = 'get'
    return request({
      method,
      url,
    })
}

export const userCreate = () => {
    const url = '/api/user/create'
    const method = 'post'
    return request({
      method,
      url,
    })
}

export const userEdit = () => {
    const url = '/api/user/edit'
    const method = 'post'
    return request({
      method,
      url,
    })
}