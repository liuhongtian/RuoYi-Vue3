import request from '@/utils/request'

// 查询消息历史列表
export function listHISWXMSG(query) {
  return request({
    url: '/temp/HISWXMSG/list',
    method: 'get',
    params: query
  })
}

// 查询消息历史列表（不分页）
export function listHISWXMSGAll(query) {
  return request({
    url: '/temp/HISWXMSG/listall',
    method: 'get',
    params: query
  })
}

// 查询消息历史详细
export function getHISWXMSG(pkId) {
  return request({
    url: '/temp/HISWXMSG/' + pkId,
    method: 'get'
  })
}

// 新增消息历史
export function addHISWXMSG(data) {
  return request({
    url: '/temp/HISWXMSG',
    method: 'post',
    data: data
  })
}

// 修改消息历史
export function updateHISWXMSG(data) {
  return request({
    url: '/temp/HISWXMSG',
    method: 'put',
    data: data
  })
}

// 删除消息历史
export function delHISWXMSG(pkId) {
  return request({
    url: '/temp/HISWXMSG/' + pkId,
    method: 'delete'
  })
}
