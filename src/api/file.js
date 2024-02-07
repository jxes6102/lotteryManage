import request from '@/api/index'
export const uploadFile = (data) => {
    const url = '/api/file/upload'
    const method = 'post'
    return request({
      method,
      url,
      data
    })
}