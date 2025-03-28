import request from '@/utils/request'

// 查询Wekan WebHook日志查看列表
export function listWebhooklogview(query) {
  return request({
    url: '/kanbanview/webhooklogview/list',
    method: 'get',
    params: query
  })
}

// 查询Wekan WebHook日志查看列表（不分页）
export function listWebhooklogviewAll(query) {
  return request({
    url: '/kanbanview/webhooklogview/listall',
    method: 'get',
    params: query
  })
}

// 查询Wekan WebHook日志查看详细
export function getWebhooklogview(id) {
  return request({
    url: '/kanbanview/webhooklogview/' + id,
    method: 'get'
  })
}

// 新增Wekan WebHook日志查看
export function addWebhooklogview(data) {
  return request({
    url: '/kanbanview/webhooklogview',
    method: 'post',
    data: data
  })
}

// 修改Wekan WebHook日志查看
export function updateWebhooklogview(data) {
  return request({
    url: '/kanbanview/webhooklogview',
    method: 'put',
    data: data
  })
}

// 删除Wekan WebHook日志查看
export function delWebhooklogview(id) {
  return request({
    url: '/kanbanview/webhooklogview/' + id,
    method: 'delete'
  })
}
