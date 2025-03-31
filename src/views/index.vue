<!-- 监测站点地图展示 -->
<template>
  <div class="app-container">
    <div class="map-container">
      <div id="baiduMap" style="width: 100%; height: 800px;"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { listMonitorStationAll } from '@/api/obd/MonitorStation'
import iconUrlGreen from '@/assets/icons/32_1743400759.png'
import iconUrlRed from '@/assets/icons/32_1743400919.png'

import Cookies from "js-cookie";

const aipartner = () => {
  // URL中的API服务器地址与端口，不设置的话，缺省值为空字符串，则页面与API服务位于同一服务器
  //const apibase = "http://localhost:8080";
  const apibase = "http://www.liuhongtian.com:8080";

  // 聊天组件
  let chatWidget;

  // 初始化聊天组件
  // 如果已存在聊天组件，先移除
  if (chatWidget) {
    document.querySelector('.chat-widget-button-tag')?.remove();
    document.querySelector('.chat-window')?.remove();
  }

  // 创建新的聊天组件实例，传入配置对象
  chatWidget = new ChatWidget({
    workspace: 'wokflow',
    username: Cookies.get('username'),
    apibase: apibase
  });
}

const sites = ref([])
let map = null

// 初始化百度地图
const initBMap = () => {
  // 创建地图实例
  map = new BMap.Map("baiduMap")

  // 创建中心点坐标(默认中国中心点)
  const point = new BMap.Point(104.07, 35.65)


  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 5)

  // 开启鼠标滚轮缩放
  map.enableScrollWheelZoom(true)

  // 添加地图控件
  map.addControl(new BMap.NavigationControl())     // 添加平移缩放控件
  map.addControl(new BMap.ScaleControl())          // 添加比例尺控件
  map.addControl(new BMap.OverviewMapControl())    // 添加缩略地图控件
  map.addControl(new BMap.MapTypeControl())        // 添加地图类型控件

  // 加载监测站点数据
  loadSiteMarkers()
}

// 加载监测站点标记
const loadSiteMarkers = async () => {
  try {
    const res = await listMonitorStationAll()
    if (res.code === 200) {
      sites.value = res.rows
      // 添加站点标记
      sites.value.filter(site => site.longitude && site.latitude).forEach(site => {
        console.log(site)
        // 创建标记点
        const marker = site.status === '1' ? new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {
          title: site.stationName, icon: new BMap.Icon(iconUrlGreen, new BMap.Size(23, 25), {
            anchor: new BMap.Size(10, 20)
          })
        }) : new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {
          title: site.stationName, icon: new BMap.Icon(iconUrlRed, new BMap.Size(23, 25), {
            anchor: new BMap.Size(10, 20)
          })
        })
        map.addOverlay(marker)

        console.log("pointer added: ", site.longitude, site.latitude)

        // 创建信息窗口
        const infoWindow = new BMap.InfoWindow(`
          <div class="site-info">
            <h4>${site.stationName}</h4>
            <p><span>站点编号：</span>${site.stationCode}</p>
            <p><span>站点名称：</span>${site.stationName}</p>
            <p><span>站点地址：</span>${site.address}</p>
          </div>
        `)

        // 点击标记点时打开信息窗口
        marker.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, new BMap.Point(site.longitude, site.latitude))
        })
      })
    }
  } catch (error) {
    console.error('加载测站数据失败:', error)
  }
}

onMounted(() => {
  // 初始化AI伙伴
  aipartner()

  // 动态加载百度地图脚本
  const script = document.createElement('script')
  script.src = `https://api.map.baidu.com/api?v=3.0&ak=DX5ZSCKg0eWklnHygDR0bKq6WvM9lcUC&callback=initBMapCallback`
  script.async = true
  document.head.appendChild(script)

  // 定义回调函数
  window.initBMapCallback = () => {
    initBMap()
  }
})
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #fff;

  .map-container {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
  }
}

:deep(.site-info) {
  padding: 10px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #303133;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #606266;

    span {
      color: #909399;
    }
  }
}
</style>
