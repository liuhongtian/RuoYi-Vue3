import request from '@/utils/request'

// 查询断面列表
export function listRiverSection(query) {
  return request({
    url: '/obd/RiverSection/list',
    method: 'get',
    params: query
  })
}

// 查询断面列表（不分页）
export function listRiverSectionAll(query) {
  return request({
    url: '/obd/RiverSection/listall',
    method: 'get',
    params: query
  })
}

// 查询断面详细
export function getRiverSection(pkId) {
  return request({
    url: '/obd/RiverSection/' + pkId,
    method: 'get'
  })
}

// 新增断面
export function addRiverSection(data) {
  return request({
    url: '/obd/RiverSection',
    method: 'post',
    data: data
  })
}

// 修改断面
export function updateRiverSection(data) {
  return request({
    url: '/obd/RiverSection',
    method: 'put',
    data: data
  })
}

// 删除断面
export function delRiverSection(pkId) {
  return request({
    url: '/obd/RiverSection/' + pkId,
    method: 'delete'
  })
}
