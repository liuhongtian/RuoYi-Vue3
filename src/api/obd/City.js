import request from '@/utils/request'

// 查询城市信息列表
export function listCity(query) {
  return request({
    url: '/obd/City/list',
    method: 'get',
    params: query
  })
}

// 查询城市信息列表（不分页）
export function listCityAll(query) {
  return request({
    url: '/obd/City/listall',
    method: 'get',
    params: query
  })
}

// 查询城市信息详细
export function getCity(pkId) {
  return request({
    url: '/obd/City/' + pkId,
    method: 'get'
  })
}

// 新增城市信息
export function addCity(data) {
  return request({
    url: '/obd/City',
    method: 'post',
    data: data
  })
}

// 修改城市信息
export function updateCity(data) {
  return request({
    url: '/obd/City',
    method: 'put',
    data: data
  })
}

// 删除城市信息
export function delCity(pkId) {
  return request({
    url: '/obd/City/' + pkId,
    method: 'delete'
  })
}
