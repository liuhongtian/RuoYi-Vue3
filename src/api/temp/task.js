import request from '@/utils/request'

// 查询水样采样任务列表
export function listTask(query) {
  return request({
    url: '/system/task/list',
    method: 'get',
    params: query
  })
}

// 查询水样采样任务详细
export function getTask(pkId) {
  return request({
    url: '/system/task/' + pkId,
    method: 'get'
  })
}

// 新增水样采样任务
export function addTask(data) {
  return request({
    url: '/system/task',
    method: 'post',
    data: data
  })
}

// 修改水样采样任务
export function updateTask(data) {
  return request({
    url: '/system/task',
    method: 'put',
    data: data
  })
}

// 删除水样采样任务
export function delTask(pkId) {
  return request({
    url: '/system/task/' + pkId,
    method: 'delete'
  })
}
