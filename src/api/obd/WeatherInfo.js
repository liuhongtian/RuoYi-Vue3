import request from '@/utils/request'

// 查询气象信息列表
export function listWeatherInfo(query) {
  return request({
    url: '/obd/WeatherInfo/list',
    method: 'get',
    params: query
  })
}

// 查询气象信息列表（不分页）
export function listWeatherInfoAll(query) {
  return request({
    url: '/obd/WeatherInfo/listall',
    method: 'get',
    params: query
  })
}

// 查询气象信息详细
export function getWeatherInfo(pkId) {
  return request({
    url: '/obd/WeatherInfo/' + pkId,
    method: 'get'
  })
}

// 新增气象信息
export function addWeatherInfo(data) {
  return request({
    url: '/obd/WeatherInfo',
    method: 'post',
    data: data
  })
}

// 修改气象信息
export function updateWeatherInfo(data) {
  return request({
    url: '/obd/WeatherInfo',
    method: 'put',
    data: data
  })
}

// 删除气象信息
export function delWeatherInfo(pkId) {
  return request({
    url: '/obd/WeatherInfo/' + pkId,
    method: 'delete'
  })
}
