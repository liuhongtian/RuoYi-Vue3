import request from '@/utils/request'

// 查询办事处列表
export function listOmOffice(query) {
  return request({
    url: '/obd/OmOffice/list',
    method: 'get',
    params: query
  })
}

// 查询办事处列表（不分页）
export function listOmOfficeAll(query) {
  return request({
    url: '/obd/OmOffice/listall',
    method: 'get',
    params: query
  })
}

// 查询办事处详细
export function getOmOffice(pkId) {
  return request({
    url: '/obd/OmOffice/' + pkId,
    method: 'get'
  })
}

// 新增办事处
export function addOmOffice(data) {
  return request({
    url: '/obd/OmOffice',
    method: 'post',
    data: data
  })
}

// 修改办事处
export function updateOmOffice(data) {
  return request({
    url: '/obd/OmOffice',
    method: 'put',
    data: data
  })
}

// 删除办事处
export function delOmOffice(pkId) {
  return request({
    url: '/obd/OmOffice/' + pkId,
    method: 'delete'
  })
}
