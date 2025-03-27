import request from '@/utils/request'

// 查询水体信息列表
export function listAquaticInfo(query) {
  return request({
    url: '/obd/AquaticInfo/list',
    method: 'get',
    params: query
  })
}

// 查询水体信息列表（不分页）
export function listAquaticInfoAll(query) {
  return request({
    url: '/obd/AquaticInfo/listall',
    method: 'get',
    params: query
  })
}

// 查询水体信息详细
export function getAquaticInfo(pkId) {
  return request({
    url: '/obd/AquaticInfo/' + pkId,
    method: 'get'
  })
}

// 新增水体信息
export function addAquaticInfo(data) {
  return request({
    url: '/obd/AquaticInfo',
    method: 'post',
    data: data
  })
}

// 修改水体信息
export function updateAquaticInfo(data) {
  return request({
    url: '/obd/AquaticInfo',
    method: 'put',
    data: data
  })
}

// 删除水体信息
export function delAquaticInfo(pkId) {
  return request({
    url: '/obd/AquaticInfo/' + pkId,
    method: 'delete'
  })
}
