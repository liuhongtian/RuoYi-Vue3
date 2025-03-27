import request from '@/utils/request'

// 查询样品交接点列表
export function listSampleConnectPlace(query) {
  return request({
    url: '/obd/SampleConnectPlace/list',
    method: 'get',
    params: query
  })
}

// 查询样品交接点列表（不分页）
export function listSampleConnectPlaceAll(query) {
  return request({
    url: '/obd/SampleConnectPlace/listall',
    method: 'get',
    params: query
  })
}

// 查询样品交接点详细
export function getSampleConnectPlace(pkId) {
  return request({
    url: '/obd/SampleConnectPlace/' + pkId,
    method: 'get'
  })
}

// 新增样品交接点
export function addSampleConnectPlace(data) {
  return request({
    url: '/obd/SampleConnectPlace',
    method: 'post',
    data: data
  })
}

// 修改样品交接点
export function updateSampleConnectPlace(data) {
  return request({
    url: '/obd/SampleConnectPlace',
    method: 'put',
    data: data
  })
}

// 删除样品交接点
export function delSampleConnectPlace(pkId) {
  return request({
    url: '/obd/SampleConnectPlace/' + pkId,
    method: 'delete'
  })
}
