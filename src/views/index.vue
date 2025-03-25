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
import { listSiteAll } from '@/api/system/site'
import iconUrl from '@/assets/icons/1742870828-48.png'

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
    const res = await listSiteAll()
    if (res.code === 200) {
      sites.value = res.rows
      // 添加站点标记
      sites.value.filter(site => site.longitude && site.latitude).forEach(site => {
        console.log(site)
        // 创建标记点
        const marker = new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {title: site.siteName, icon: new BMap.Icon(iconUrl, new BMap.Size(23, 25), {
          anchor: new BMap.Size(10, 20)
        })})
        map.addOverlay(marker)

        console.log("pointer added: ",site.longitude,site.latitude)
        
        // 创建信息窗口
        const infoWindow = new BMap.InfoWindow(`
          <div class="site-info">
            <h4>${site.siteName}</h4>
            <p><span>站点编号：</span>${site.siteCode}</p>
            <p><span>站点地址：</span>${site.address}</p>
            <p><span>负责人：</span>${site.manager}</p>
            <p><span>联系电话：</span>${site.phone}</p>
            <p><span>创建时间：</span>${site.createTime}</p>
          </div>
        `)
        
        // 点击标记点时打开信息窗口
        marker.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, new BMap.Point(site.longitude, site.latitude))
        })
      })
    }
  } catch (error) {
    console.error('加载监测站点数据失败:', error)
  }
}

onMounted(() => {
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

