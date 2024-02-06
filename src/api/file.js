export const uploadFile = () => {
    const url = '/api/file/upload'
    const method = 'post'
    return request({
      method,
      url,
    })
}