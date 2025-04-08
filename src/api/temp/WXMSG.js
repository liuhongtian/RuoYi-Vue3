import request from '@/utils/request'

// 查询待发送消息列表
export function listWXMSG(query) {
  return request({
    url: '/temp/WXMSG/list',
    method: 'get',
    params: query
  })
}

// 查询待发送消息列表（不分页）
export function listWXMSGAll(query) {
  return request({
    url: '/temp/WXMSG/listall',
    method: 'get',
    params: query
  })
}

// 查询待发送消息详细
export function getWXMSG(pkId) {
  return request({
    url: '/temp/WXMSG/' + pkId,
    method: 'get'
  })
}

// 新增待发送消息
export function addWXMSG(data) {
  return request({
    url: '/temp/WXMSG',
    method: 'post',
    data: data
  })
}

// 修改待发送消息
export function updateWXMSG(data) {
  return request({
    url: '/temp/WXMSG',
    method: 'put',
    data: data
  })
}

// 删除待发送消息
export function delWXMSG(pkId) {
  return request({
    url: '/temp/WXMSG/' + pkId,
    method: 'delete'
  })
}
