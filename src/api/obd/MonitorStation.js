import request from '@/utils/request'

// 查询测站列表
export function listMonitorStation(query) {
  return request({
    url: '/obd/MonitorStation/list',
    method: 'get',
    params: query
  })
}

// 查询测站列表（不分页）
export function listMonitorStationAll(query) {
  return request({
    url: '/obd/MonitorStation/listall',
    method: 'get',
    params: query
  })
}

// 查询测站详细
export function getMonitorStation(pkId) {
  return request({
    url: '/obd/MonitorStation/' + pkId,
    method: 'get'
  })
}

// 新增测站
export function addMonitorStation(data) {
  return request({
    url: '/obd/MonitorStation',
    method: 'post',
    data: data
  })
}

// 修改测站
export function updateMonitorStation(data) {
  return request({
    url: '/obd/MonitorStation',
    method: 'put',
    data: data
  })
}

// 删除测站
export function delMonitorStation(pkId) {
  return request({
    url: '/obd/MonitorStation/' + pkId,
    method: 'delete'
  })
}
