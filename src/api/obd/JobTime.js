import request from '@/utils/request'

// 查询单项任务作业时间列表
export function listJobTime(query) {
  return request({
    url: '/obd/JobTime/list',
    method: 'get',
    params: query
  })
}

// 查询单项任务作业时间列表（不分页）
export function listJobTimeAll(query) {
  return request({
    url: '/obd/JobTime/listall',
    method: 'get',
    params: query
  })
}

// 查询单项任务作业时间详细
export function getJobTime(pkId) {
  return request({
    url: '/obd/JobTime/' + pkId,
    method: 'get'
  })
}

// 新增单项任务作业时间
export function addJobTime(data) {
  return request({
    url: '/obd/JobTime',
    method: 'post',
    data: data
  })
}

// 修改单项任务作业时间
export function updateJobTime(data) {
  return request({
    url: '/obd/JobTime',
    method: 'put',
    data: data
  })
}

// 删除单项任务作业时间
export function delJobTime(pkId) {
  return request({
    url: '/obd/JobTime/' + pkId,
    method: 'delete'
  })
}
