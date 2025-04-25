<!-- 测站地图展示 -->
<template>
  <div class="app-container">
    <div class="map-container">
      <div id="baiduMap" style="width: 100%; height: 800px;"></div>
    </div>
    <div class="marker-selector">
      <el-select v-model="selectedMarker" placeholder="请选择地图显示信息" @change="initBMap">
        <el-option :key="1" label="测站" :value="1"><el-icon>
            <Monitor />
          </el-icon>测站</el-option>
        <el-option :key="2" label="河流断面" :value="2"><el-icon>
            <Switch />
          </el-icon>河流断面</el-option>
        <el-option :key="3" label="国控站点" :value="3"><el-icon>
            <DataAnalysis />
          </el-icon>国控站点</el-option>
      </el-select>
    </div>
    <div id="grafana-panel" style="left: 100px; bottom: 80px;" class="grafana-panel" draggable="true"
      @dragstart="handleDragStart" @drag="handleDrag" @dragend="handleDragEnd"><iframe
        src="http://www.liuhongtian.com:3000/d-solo/cejr9sxk8jpj4a/e9a696-e9a1b5-e79c8b-e69dbf?orgId=1&from=1730419200000&to=1732838400000&timezone=browser&showCategory=Axis&theme=light&panelId=1&__feature.dashboardSceneSolo"
        width="450" height="200" frameborder="0"></iframe></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { listMonitorStationAll } from '@/api/obd/MonitorStation'
import { listRiverSectionAll } from '@/api/obd/RiverSection'
import { listStateControlledStationAll } from '@/api/obd/StateControlledStation'
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

const selectedMarker = ref(1)

const monitorStations = ref([])
const riverSections = ref([])
const stateControlledStations = ref([])
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

  if (selectedMarker.value === 1) {
    // 加载测站数据
    loadMonitorStationMarkers()
  } else if (selectedMarker.value === 2) {
    // 加载河流断面数据
    loadRiverSectionMarkers()
  } else if (selectedMarker.value === 3) {
    // 加载国控站点数据
    loadStateControlledStationMarkers()
  }
}

// 加载测站标记
const loadMonitorStationMarkers = async () => {
  try {
    const res = await listMonitorStationAll()
    if (res.code === 200) {
      monitorStations.value = res.rows
      // 添加站点标记
      monitorStations.value.filter(site => site.longitude && site.latitude).forEach(site => {
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

        // 创建信息窗口
        const infoWindow = new BMap.InfoWindow(`
          <div class="site-info">
            <h4>${site.stationName}</h4>
            <p><span>站点编号：</span>${site.stationCode}</p>
            <p><span>站点名称：</span>${site.stationName}</p>
            <p><span>站点地址：</span>${site.address}</p>
            <p><span>站点状态：</span>${site.status === '1' ? '<span style="color: green;">正常</span>' : '<span style="color: red;">停运</span>'}</p>
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

// 加载河流断面标记
const loadRiverSectionMarkers = async () => {
  try {
    const res = await listRiverSectionAll()
    if (res.code === 200) {
      riverSections.value = res.rows
      // 添加站点标记
      riverSections.value.filter(site => site.longitude && site.latitude).forEach(site => {
        // 创建标记点
        const marker = new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {
          title: site.sectionName, icon: new BMap.Icon(iconUrlGreen, new BMap.Size(23, 25), {
            anchor: new BMap.Size(10, 20)
          })
        })
        map.addOverlay(marker)

        // 创建信息窗口
        const infoWindow = new BMap.InfoWindow(`
          <div class="site-info">
            <h4>${site.sectionName}</h4>
            <p><span>断面编号：</span>${site.sectionCode}</p>
            <p><span>断面名称：</span>${site.sectionName}</p>
            <p><span>所在流域：</span>${site.drainageBasin}</p>
            <p><span>所在水体：</span>${site.waterBody}</p>
          </div>
        `)

        // 点击标记点时打开信息窗口
        marker.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, new BMap.Point(site.longitude, site.latitude))
        })
      })
    }
  } catch (error) {
    console.error('加载河流断面数据失败:', error)
  }
}

// 加载国控站点标记
const loadStateControlledStationMarkers = async () => {
  try {
    const res = await listStateControlledStationAll()
    if (res.code === 200) {
      stateControlledStations.value = res.rows
      // 添加站点标记
      stateControlledStations.value.filter(site => site.longitude && site.latitude).forEach(site => {
        // 创建标记点
        const marker = site.status === 1 ? new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {
          title: site.stationName, icon: new BMap.Icon(iconUrlGreen, new BMap.Size(23, 25), {
            anchor: new BMap.Size(10, 20)
          })
        }) : new BMap.Marker(new BMap.Point(site.longitude, site.latitude), {
          title: site.stationName, icon: new BMap.Icon(iconUrlRed, new BMap.Size(23, 25), {
            anchor: new BMap.Size(10, 20)
          })
        })
        map.addOverlay(marker)

        // 创建信息窗口
        const infoWindow = new BMap.InfoWindow(`
          <div class="site-info">
            <h4>${site.stationName}</h4>
            <p><span>站点编号：</span>${site.stationCode}</p>
            <p><span>站点名称：</span>${site.stationName}</p>
            <p><span>站点地址：</span>${site.address}</p>
            <p><span>站点状态：</span>${site.status === 1 ? '<span style="color: green;">正常</span>' : '<span style="color: red;">停运</span>'}</p>
          </div>
        `)

        // 点击标记点时打开信息窗口
        marker.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, new BMap.Point(site.longitude, site.latitude))
        })
      })
    }
  } catch (error) {
    console.error('加载国控站点数据失败:', error)
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

const dragData = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  element: null,
  isMouseDown: false
})

// 开始拖动
function handleDragStart(e) {
  dragData.value.isDragging = true;
  dragData.value.startLeft = e.clientX;
  dragData.value.startBottom = window.innerHeight - e.clientY;
  dragData.value.element = e.target;
  dragData.value.isMouseDown = true;

  // 设置拖动时的透明度
  e.target.style.opacity = '0.5';
}

// 拖动中
function handleDrag(e) {
  if (!dragData.value.isDragging) return;
  if(e.clientX === 0 || e.class === 0) return;

  const left = e.clientX;
  const bottom = window.innerHeight - e.clientY;

  const deltaLeft = left - dragData.value.startLeft;
  const deltaBottom = bottom - dragData.value.startBottom;

  const element = dragData.value.element;

  // 计算新位置
  const newLeft = parseInt(element.style.left.slice(0, -2)) + deltaLeft;
  const newBottom = parseInt(element.style.bottom.slice(0, -2)) + deltaBottom;

  element.style.left = `${newLeft}px`;
  element.style.bottom = `${newBottom}px`;

  // 更新起始位置
  dragData.value.startLeft = e.clientX;
  dragData.value.startBottom = window.innerHeight - e.clientY;
}

// 拖动结束
function handleDragEnd(e) {
  if (!dragData.value.isDragging) return;

  dragData.value.isDragging = false;
  dragData.value.element.style.opacity = '1';
  dragData.value.element = null;
}
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

  padding: 18px;

  border-radius: 15px;
  background: #c3d697;
  width: 400px;
  height: 125px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #06300b;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #0c6a1f;

    span {
      color: #0c6a1f;
    }
  }
}

.marker-selector {
  position: fixed;
  padding: 10px;
  bottom: 40px;
  right: 100px;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  /* 圆形按钮 */
  background-color: rgba(213, 213, 213, 0.89);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1000;

  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  /* 使背景半透明 */
  backdrop-filter: blur(10px);
  /* 添加毛玻璃效果 */
  flex-direction: column;
  overflow: hidden;
  resize: none;
}

.grafana-panel {
  position: absolute;
  padding: 10px;
  width: 450px;
  height: 200px;
  border-radius: 5px;
  /* 圆形按钮 */
  background-color: rgba(213, 213, 213, 0.89);
  color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  /* 使背景半透明 */
  backdrop-filter: blur(10px);
  /* 添加毛玻璃效果 */
  flex-direction: column;
  overflow: hidden;
  resize: none;

  cursor: move; // 添加可移动光标样式
  user-select: none; // 防止拖动时选中文本
  transition: opacity 0.2s; // 添加透明度过渡效果
}
</style>
