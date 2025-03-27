import request from '@/utils/request'

// 查询流域信息列表
export function listRiverBasin(query) {
  return request({
    url: '/obd/RiverBasin/list',
    method: 'get',
    params: query
  })
}

// 查询流域信息列表（不分页）
export function listRiverBasinAll(query) {
  return request({
    url: '/obd/RiverBasin/listall',
    method: 'get',
    params: query
  })
}

// 查询流域信息详细
export function getRiverBasin(pkId) {
  return request({
    url: '/obd/RiverBasin/' + pkId,
    method: 'get'
  })
}

// 新增流域信息
export function addRiverBasin(data) {
  return request({
    url: '/obd/RiverBasin',
    method: 'post',
    data: data
  })
}

// 修改流域信息
export function updateRiverBasin(data) {
  return request({
    url: '/obd/RiverBasin',
    method: 'put',
    data: data
  })
}

// 删除流域信息
export function delRiverBasin(pkId) {
  return request({
    url: '/obd/RiverBasin/' + pkId,
    method: 'delete'
  })
}
