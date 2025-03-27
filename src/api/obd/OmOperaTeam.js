import request from '@/utils/request'

// 查询运维小组列表
export function listOmOperaTeam(query) {
  return request({
    url: '/obd/OmOperaTeam/list',
    method: 'get',
    params: query
  })
}

// 查询运维小组列表（不分页）
export function listOmOperaTeamAll(query) {
  return request({
    url: '/obd/OmOperaTeam/listall',
    method: 'get',
    params: query
  })
}

// 查询运维小组详细
export function getOmOperaTeam(pkId) {
  return request({
    url: '/obd/OmOperaTeam/' + pkId,
    method: 'get'
  })
}

// 新增运维小组
export function addOmOperaTeam(data) {
  return request({
    url: '/obd/OmOperaTeam',
    method: 'post',
    data: data
  })
}

// 修改运维小组
export function updateOmOperaTeam(data) {
  return request({
    url: '/obd/OmOperaTeam',
    method: 'put',
    data: data
  })
}

// 删除运维小组
export function delOmOperaTeam(pkId) {
  return request({
    url: '/obd/OmOperaTeam/' + pkId,
    method: 'delete'
  })
}
