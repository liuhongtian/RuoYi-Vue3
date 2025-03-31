import request from '@/utils/request'

// 查询距离时间列表
export function listDistanceTime(query) {
  return request({
    url: '/obd/DistanceTime/list',
    method: 'get',
    params: query
  })
}

// 查询距离时间列表（不分页）
export function listDistanceTimeAll(query) {
  return request({
    url: '/obd/DistanceTime/listall',
    method: 'get',
    params: query
  })
}

// 查询距离时间详细
export function getDistanceTime(pkId) {
  return request({
    url: '/obd/DistanceTime/' + pkId,
    method: 'get'
  })
}

// 新增距离时间
export function addDistanceTime(data) {
  return request({
    url: '/obd/DistanceTime',
    method: 'post',
    data: data
  })
}

// 修改距离时间
export function updateDistanceTime(data) {
  return request({
    url: '/obd/DistanceTime',
    method: 'put',
    data: data
  })
}

// 删除距离时间
export function delDistanceTime(pkId) {
  return request({
    url: '/obd/DistanceTime/' + pkId,
    method: 'delete'
  })
}
