import request from '@/utils/request'

// 查询运维人员列表
export function listOmStaff(query) {
  return request({
    url: '/obd/OmStaff/list',
    method: 'get',
    params: query
  })
}

// 查询运维人员列表（不分页）
export function listOmStaffAll(query) {
  return request({
    url: '/obd/OmStaff/listall',
    method: 'get',
    params: query
  })
}

// 查询运维人员详细
export function getOmStaff(pkId) {
  return request({
    url: '/obd/OmStaff/' + pkId,
    method: 'get'
  })
}

// 新增运维人员
export function addOmStaff(data) {
  return request({
    url: '/obd/OmStaff',
    method: 'post',
    data: data
  })
}

// 修改运维人员
export function updateOmStaff(data) {
  return request({
    url: '/obd/OmStaff',
    method: 'put',
    data: data
  })
}

// 删除运维人员
export function delOmStaff(pkId) {
  return request({
    url: '/obd/OmStaff/' + pkId,
    method: 'delete'
  })
}
