import request from '@/utils/request'

// 查询国控站点列表
export function listStateControlledStation(query) {
  return request({
    url: '/obd/StateControlledStation/list',
    method: 'get',
    params: query
  })
}

// 查询国控站点列表（不分页）
export function listStateControlledStationAll(query) {
  return request({
    url: '/obd/StateControlledStation/listall',
    method: 'get',
    params: query
  })
}

// 查询国控站点详细
export function getStateControlledStation(pkId) {
  return request({
    url: '/obd/StateControlledStation/' + pkId,
    method: 'get'
  })
}

// 新增国控站点
export function addStateControlledStation(data) {
  return request({
    url: '/obd/StateControlledStation',
    method: 'post',
    data: data
  })
}

// 修改国控站点
export function updateStateControlledStation(data) {
  return request({
    url: '/obd/StateControlledStation',
    method: 'put',
    data: data
  })
}

// 删除国控站点
export function delStateControlledStation(pkId) {
  return request({
    url: '/obd/StateControlledStation/' + pkId,
    method: 'delete'
  })
}
