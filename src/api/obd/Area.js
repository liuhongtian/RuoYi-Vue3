import request from '@/utils/request'

// 查询地区信息列表
export function listArea(query) {
  return request({
    url: '/obd/Area/list',
    method: 'get',
    params: query
  })
}

// 查询地区信息列表（不分页）
export function listAreaAll(query) {
  return request({
    url: '/obd/Area/listall',
    method: 'get',
    params: query
  })
}

// 查询地区信息详细
export function getArea(pkId) {
  return request({
    url: '/obd/Area/' + pkId,
    method: 'get'
  })
}

// 新增地区信息
export function addArea(data) {
  return request({
    url: '/obd/Area',
    method: 'post',
    data: data
  })
}

// 修改地区信息
export function updateArea(data) {
  return request({
    url: '/obd/Area',
    method: 'put',
    data: data
  })
}

// 删除地区信息
export function delArea(pkId) {
  return request({
    url: '/obd/Area/' + pkId,
    method: 'delete'
  })
}
