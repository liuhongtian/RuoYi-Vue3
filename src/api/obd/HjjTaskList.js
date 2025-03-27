import request from '@/utils/request'

// 查询水样采样跟踪列表
export function listHjjTaskList(query) {
  return request({
    url: '/obd/HjjTaskList/list',
    method: 'get',
    params: query
  })
}

// 查询水样采样跟踪列表（不分页）
export function listHjjTaskListAll(query) {
  return request({
    url: '/obd/HjjTaskList/listall',
    method: 'get',
    params: query
  })
}

// 查询水样采样跟踪详细
export function getHjjTaskList(pkId) {
  return request({
    url: '/obd/HjjTaskList/' + pkId,
    method: 'get'
  })
}

// 新增水样采样跟踪
export function addHjjTaskList(data) {
  return request({
    url: '/obd/HjjTaskList',
    method: 'post',
    data: data
  })
}

// 修改水样采样跟踪
export function updateHjjTaskList(data) {
  return request({
    url: '/obd/HjjTaskList',
    method: 'put',
    data: data
  })
}

// 删除水样采样跟踪
export function delHjjTaskList(pkId) {
  return request({
    url: '/obd/HjjTaskList/' + pkId,
    method: 'delete'
  })
}
