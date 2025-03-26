import request from '@/utils/request'

// 获取省份列表
export function getProvinceList() {
  return request({
    url: '/tool/province/list',
    method: 'get'
  })
}

// 获取城市列表
export function getCityList(provinceId) {
  return request({
    url: '/tool/city/list/' + provinceId,
    method: 'get'
  })
}
