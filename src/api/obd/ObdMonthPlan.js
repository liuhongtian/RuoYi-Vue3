import request from '@/utils/request'

// 查询月度计划跟踪列表
export function listObdMonthPlan(query) {
  return request({
    url: '/obd/ObdMonthPlan/list',
    method: 'get',
    params: query
  })
}

// 查询月度计划跟踪列表（不分页）
export function listObdMonthPlanAll(query) {
  return request({
    url: '/obd/ObdMonthPlan/listall',
    method: 'get',
    params: query
  })
}

// 查询月度计划跟踪详细
export function getObdMonthPlan(pkId) {
  return request({
    url: '/obd/ObdMonthPlan/' + pkId,
    method: 'get'
  })
}

// 新增月度计划跟踪
export function addObdMonthPlan(data) {
  return request({
    url: '/obd/ObdMonthPlan',
    method: 'post',
    data: data
  })
}

// 修改月度计划跟踪
export function updateObdMonthPlan(data) {
  return request({
    url: '/obd/ObdMonthPlan',
    method: 'put',
    data: data
  })
}

// 删除月度计划跟踪
export function delObdMonthPlan(pkId) {
  return request({
    url: '/obd/ObdMonthPlan/' + pkId,
    method: 'delete'
  })
}
