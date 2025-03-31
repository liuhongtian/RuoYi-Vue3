import request from '@/utils/request'

// 查询实验室列表
export function listOmLab(query) {
  return request({
    url: '/obd/OmLab/list',
    method: 'get',
    params: query
  })
}

// 查询实验室列表（不分页）
export function listOmLabAll(query) {
  return request({
    url: '/obd/OmLab/listall',
    method: 'get',
    params: query
  })
}

// 查询实验室详细
export function getOmLab(pkId) {
  return request({
    url: '/obd/OmLab/' + pkId,
    method: 'get'
  })
}

// 新增实验室
export function addOmLab(data) {
  return request({
    url: '/obd/OmLab',
    method: 'post',
    data: data
  })
}

// 修改实验室
export function updateOmLab(data) {
  return request({
    url: '/obd/OmLab',
    method: 'put',
    data: data
  })
}

// 删除实验室
export function delOmLab(pkId) {
  return request({
    url: '/obd/OmLab/' + pkId,
    method: 'delete'
  })
}
