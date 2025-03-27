import request from '@/utils/request'

// 查询车辆信息列表
export function listVehicle(query) {
  return request({
    url: '/obd/Vehicle/list',
    method: 'get',
    params: query
  })
}

// 查询车辆信息列表（不分页）
export function listVehicleAll(query) {
  return request({
    url: '/obd/Vehicle/listall',
    method: 'get',
    params: query
  })
}

// 查询车辆信息详细
export function getVehicle(pkId) {
  return request({
    url: '/obd/Vehicle/' + pkId,
    method: 'get'
  })
}

// 新增车辆信息
export function addVehicle(data) {
  return request({
    url: '/obd/Vehicle',
    method: 'post',
    data: data
  })
}

// 修改车辆信息
export function updateVehicle(data) {
  return request({
    url: '/obd/Vehicle',
    method: 'put',
    data: data
  })
}

// 删除车辆信息
export function delVehicle(pkId) {
  return request({
    url: '/obd/Vehicle/' + pkId,
    method: 'delete'
  })
}
