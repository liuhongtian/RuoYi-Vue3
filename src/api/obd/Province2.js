import request from '@/utils/request'

// 查询省份信息列表
export function listProvince2(query) {
  return request({
    url: '/obd/Province2/list',
    method: 'get',
    params: query
  })
}

// 查询省份信息列表（不分页）
export function listProvince2All(query) {
  return request({
    url: '/obd/Province2/listall',
    method: 'get',
    params: query
  })
}

// 查询省份信息详细
export function getProvince2(pkId) {
  return request({
    url: '/obd/Province2/' + pkId,
    method: 'get'
  })
}

// 新增省份信息
export function addProvince2(data) {
  return request({
    url: '/obd/Province2',
    method: 'post',
    data: data
  })
}

// 修改省份信息
export function updateProvince2(data) {
  return request({
    url: '/obd/Province2',
    method: 'put',
    data: data
  })
}

// 删除省份信息
export function delProvince2(pkId) {
  return request({
    url: '/obd/Province2/' + pkId,
    method: 'delete'
  })
}
