import request from '@/utils/request'

// 查询dynamicDictTest列表
export function listDynamicDictTest(query) {
  return request({
    url: '/temp/dynamicDictTest/list',
    method: 'get',
    params: query
  })
}

// 查询dynamicDictTest列表（不分页）
export function listDynamicDictTestAll(query) {
  return request({
    url: '/temp/dynamicDictTest/listall',
    method: 'get',
    params: query
  })
}

// 查询dynamicDictTest详细
export function getDynamicDictTest(pkId) {
  return request({
    url: '/temp/dynamicDictTest/' + pkId,
    method: 'get'
  })
}

// 新增dynamicDictTest
export function addDynamicDictTest(data) {
  return request({
    url: '/temp/dynamicDictTest',
    method: 'post',
    data: data
  })
}

// 修改dynamicDictTest
export function updateDynamicDictTest(data) {
  return request({
    url: '/temp/dynamicDictTest',
    method: 'put',
    data: data
  })
}

// 删除dynamicDictTest
export function delDynamicDictTest(pkId) {
  return request({
    url: '/temp/dynamicDictTest/' + pkId,
    method: 'delete'
  })
}
