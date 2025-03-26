import request from '@/utils/request'

// 查询运维公司列表
export function listOMCompany(query) {
  return request({
    url: '/obd/OMCompany/list',
    method: 'get',
    params: query
  })
}

// 查询运维公司列表（不分页）
export function listOMCompanyAll(query) {
  return request({
    url: '/obd/OMCompany/listall',
    method: 'get',
    params: query
  })
}

// 查询运维公司详细
export function getOMCompany(pkId) {
  return request({
    url: '/obd/OMCompany/' + pkId,
    method: 'get'
  })
}

// 新增运维公司
export function addOMCompany(data) {
  return request({
    url: '/obd/OMCompany',
    method: 'post',
    data: data
  })
}

// 修改运维公司
export function updateOMCompany(data) {
  return request({
    url: '/obd/OMCompany',
    method: 'put',
    data: data
  })
}

// 删除运维公司
export function delOMCompany(pkId) {
  return request({
    url: '/obd/OMCompany/' + pkId,
    method: 'delete'
  })
}
