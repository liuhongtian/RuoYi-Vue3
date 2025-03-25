import request from '@/utils/request'

// 查询临时监测用户信息列表
export function listTempuser(query) {
  return request({
    url: '/temp/tempuser/list',
    method: 'get',
    params: query
  })
}

// 查询临时监测用户信息列表（不分页）
export function listTempuserAll(query) {
  return request({
    url: '/temp/tempuser/listall',
    method: 'get',
    params: query
  })
}

// 查询临时监测用户信息详细
export function getTempuser(userId) {
  return request({
    url: '/temp/tempuser/' + userId,
    method: 'get'
  })
}

// 新增临时监测用户信息
export function addTempuser(data) {
  return request({
    url: '/temp/tempuser',
    method: 'post',
    data: data
  })
}

// 修改临时监测用户信息
export function updateTempuser(data) {
  return request({
    url: '/temp/tempuser',
    method: 'put',
    data: data
  })
}

// 删除临时监测用户信息
export function delTempuser(userId) {
  return request({
    url: '/temp/tempuser/' + userId,
    method: 'delete'
  })
}
