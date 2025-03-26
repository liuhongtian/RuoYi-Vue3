import request from '@/utils/request'

// 查询省份信息列表
export function listProvince(query) {
  return request({
    url: '/obd/Province/list',
    method: 'get',
    params: query
  })
}

// 查询省份信息列表（不分页）
export function listProvinceAll(query) {
  return request({
    url: '/obd/Province/listall',
    method: 'get',
    params: query
  })
}

// 查询省份信息详细
export function getProvince(pkId) {
  return request({
    url: '/obd/Province/' + pkId,
    method: 'get'
  })
}

// 新增省份信息
export function addProvince(data) {
  return request({
    url: '/obd/Province',
    method: 'post',
    data: data
  })
}

// 修改省份信息
export function updateProvince(data) {
  return request({
    url: '/obd/Province',
    method: 'put',
    data: data
  })
}

// 删除省份信息
export function delProvince(pkId) {
  return request({
    url: '/obd/Province/' + pkId,
    method: 'delete'
  })
}
