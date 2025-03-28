<template>
  <div class="app-container">
    <!--div class="custom-form">
      <iframe
        src="http://www.liuhongtian.com:3000/d-solo/begdquzzg6vb4b/my-sample-dashboard?orgId=1&from=1727712000000&to=1743523199000&timezone=browser&theme=light&panelId=3&__feature.dashboardSceneSolo"
        width="100%" height="400" frameborder="0">
      </iframe>
    </div-->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务编码" prop="taskCode">
        <el-input v-model="queryParams.taskCode" placeholder="请输入任务编码" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="queryParams.taskName" placeholder="请输入任务名称" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="运维人员" prop="operator">
        <el-input v-model="queryParams.operator" placeholder="请输入运维人员" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:task:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="['system:task:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:task:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:task:export']">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 甘特图容器 -->
    <div class="gantt-container">
      <!-- 时间轴头部 -->
      <div class="gantt-header">
        <div class="task-info-header">
          <span>任务信息</span>
        </div>
        <div class="timeline-header" ref="timelineHeader">
          <div class="timeline-scroll-container">
            <div v-for="(date, index) in timelineDates" 
                 :key="index" 
                 class="timeline-cell"
                 :style="{ minWidth: cellWidth + 'px' }">
              {{ formatDate(date) }}
            </div>
          </div>
          <div class="timeline-scrollbar" 
               ref="scrollbar"
               @mousedown="startDragging"
               :style="{ left: scrollbarPosition + '%' }">
          </div>
        </div>
      </div>

      <!-- 任务列表和时间轴 -->
      <div class="gantt-body" ref="ganttBody">
        <div v-for="task in taskList" 
             :key="task.pkId" 
             class="gantt-row"
             @click="handleUpdate(task)">
          <!-- 任务信息列 -->
          <div class="task-info">
            <div class="task-name">{{ task.taskName }}</div>
            <div class="task-code">{{ task.taskCode }}</div>
            <div class="task-operator">{{ task.operator }}</div>
          </div>

          <!-- 时间轴和任务进度条 -->
          <div class="timeline">
            <el-tooltip
              :content="`任务名称：${task.taskName}\n任务编码：${task.taskCode}`"
              placement="top"
              :show-after="200"
              :hide-after="0"
            >
              <div class="task-bar" :style="getTaskBarStyle(task)">
                <div v-for="(segment, index) in getTaskStatusSegments(task)"
                     :key="index"
                     class="task-status-segment"
                     :style="segment">
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
      @pagination="getList" />

    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="taskRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务编码" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入任务编码" />
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="运维人员" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入运维人员" />
        </el-form-item>
        <el-form-item label="调度时间" prop="scheduleTime">
          <el-date-picker clearable v-model="form.scheduleTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择调度时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable v-model="form.startTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishTime">
          <el-date-picker clearable v-model="form.finishTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Task">
import { listTask, getTask, delTask, addTask, updateTask } from "@/api/system/task";
import { ref, reactive, toRefs, onMounted, nextTick } from 'vue';

const { proxy } = getCurrentInstance();

const taskList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

// 甘特图相关
const timelineDates = ref([]);
const cellWidth = ref(40); // 每个时间单元格的宽度
const timelineHeader = ref(null);
const ganttBody = ref(null);

// 添加拖动相关的变量
const scrollbar = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollbarPosition = ref(0);
const timelineContainer = ref(null);

const statusColors = {
  0: '#e6a23c',  // 已创建 - 橙色
  1: '#409eff',  // 已调度 - 蓝色
  2: '#67c23a',  // 执行中 - 绿色
  3: '#909399'   // 执行结束 - 灰色
};

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    taskCode: null,
    taskName: null,
    operator: null,
    scheduleTime: null,
    startTime: null,
    finishTime: null,
    taskStatus: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

// 生成时间轴
function generateTimeline() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 显示过去30天到未来30天
  for (let i = -30; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  timelineDates.value = dates;
}

// 格式化日期显示
function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

// 计算任务进度条的样式
function getTaskBarStyle(task) {
  const createTime = new Date(task.createTime);
  createTime.setHours(0, 0, 0, 0);
  const endTime = task.finishTime ? new Date(task.finishTime) : new Date();
  endTime.setHours(0, 0, 0, 0);
  
  const startIndex = timelineDates.value.findIndex(date => 
    date.getTime() >= createTime.getTime());
  const endIndex = timelineDates.value.findIndex(date => 
    date.getTime() >= endTime.getTime());
  
  if (startIndex === -1 || endIndex === -1) return {};
  
  const totalDays = timelineDates.value.length;
  const startPosition = (startIndex / totalDays) * 100;
  const width = ((endIndex - startIndex) / totalDays) * 100;
  
  // 添加transform属性来跟随滚动
  return {
    left: `${startPosition}%`,
    width: `${width}%`,
    transform: `translateX(${timelineHeader.value ? -timelineHeader.value.scrollLeft : 0}px)`
  };
}

// 获取任务状态段的样式
function getTaskStatusSegments(task) {
  const segments = [];
  const createTime = new Date(task.createTime);
  createTime.setHours(0, 0, 0, 0);
  const endTime = task.finishTime ? new Date(task.finishTime) : new Date();
  endTime.setHours(0, 0, 0, 0);
  
  // 定义状态变更点
  const statusChanges = [
    { time: createTime, status: 0 },  // 已创建
    { time: task.scheduleTime ? new Date(task.scheduleTime) : null, status: 1 },  // 已调度
    { time: task.startTime ? new Date(task.startTime) : null, status: 2 },  // 执行中
    { time: task.finishTime ? new Date(task.finishTime) : null, status: 3 }  // 执行结束
  ].filter(change => {
    if (!change.time) return false;
    const changeDate = new Date(change.time);
    changeDate.setHours(0, 0, 0, 0);
    return changeDate <= endTime;
  });

  // 按时间排序状态变更点
  statusChanges.sort((a, b) => a.time - b.time);

  // 如果没有状态变更点，显示单一状态
  if (statusChanges.length === 0) {
    return [{
      left: '0%',
      width: '100%',
      backgroundColor: statusColors[0] || '#909399'
    }];
  }

  const totalDays = timelineDates.value.length;

  // 计算每个状态段的宽度
  for (let i = 0; i < statusChanges.length; i++) {
    const currentChange = statusChanges[i];
    const nextChange = statusChanges[i + 1];
    
    const currentDate = new Date(currentChange.time);
    currentDate.setHours(0, 0, 0, 0);
    
    const nextDate = nextChange ? new Date(nextChange.time) : endTime;
    nextDate.setHours(0, 0, 0, 0);
    
    const startIndex = timelineDates.value.findIndex(date => 
      date.getTime() >= currentDate.getTime());
    const endIndex = timelineDates.value.findIndex(date => 
      date.getTime() >= nextDate.getTime());
    
    if (startIndex !== -1 && endIndex !== -1) {
      const startPosition = (startIndex / totalDays) * 100;
      const width = ((endIndex - startIndex) / totalDays) * 100;
      
      segments.push({
        left: `${startPosition}%`,
        width: `${width}%`,
        backgroundColor: statusColors[currentChange.status] || '#909399'
      });
    }
  }

  return segments;
}

// 同步滚动
function syncScroll(e) {
  if (e.target === timelineHeader.value) {
    ganttBody.value.scrollLeft = e.target.scrollLeft;
  } else {
    timelineHeader.value.scrollLeft = e.target.scrollLeft;
  }
}

// 开始拖动
function startDragging(e) {
  isDragging.value = true;
  startX.value = e.clientX;
  
  // 添加全局鼠标事件监听
  document.addEventListener('mousemove', handleDragging);
  document.addEventListener('mouseup', stopDragging);
}

// 处理拖动
function handleDragging(e) {
  if (!isDragging.value) return;
  
  const deltaX = e.clientX - startX.value;
  const containerWidth = timelineHeader.value.offsetWidth;
  const scrollWidth = timelineHeader.value.scrollWidth;
  
  // 计算新的滚动位置
  const scrollRatio = deltaX / containerWidth;
  const newScrollLeft = timelineHeader.value.scrollLeft + (scrollWidth * scrollRatio);
  
  // 更新滚动位置
  timelineHeader.value.scrollLeft = newScrollLeft;
  ganttBody.value.scrollLeft = newScrollLeft;
  
  // 更新拖动条位置
  updateScrollbarPosition();
  
  startX.value = e.clientX;
}

// 停止拖动
function stopDragging() {
  isDragging.value = false;
  
  // 移除全局鼠标事件监听
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', stopDragging);
}

// 更新拖动条位置
function updateScrollbarPosition() {
  const containerWidth = timelineHeader.value.offsetWidth;
  const scrollWidth = timelineHeader.value.scrollWidth;
  const scrollLeft = timelineHeader.value.scrollLeft;
  
  // 计算拖动条位置百分比
  const position = (scrollLeft / (scrollWidth - containerWidth)) * 100;
  scrollbarPosition.value = Math.max(0, Math.min(100, position));
}

// 监听滚动事件
function handleScroll() {
  updateScrollbarPosition();
}

onMounted(() => {
  generateTimeline();
  getList();
  
  // 添加滚动同步和滚动条更新
  nextTick(() => {
    if (timelineHeader.value && ganttBody.value) {
      timelineHeader.value.addEventListener('scroll', syncScroll);
      timelineHeader.value.addEventListener('scroll', handleScroll);
      ganttBody.value.addEventListener('scroll', syncScroll);
    }
  });
});

/** 查询水样采样任务列表 */
function getList() {
  loading.value = true;
  listTask(queryParams.value).then(response => {
    taskList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    pkId: null,
    taskCode: null,
    taskName: null,
    operator: null,
    createTime: null,
    scheduleTime: null,
    startTime: null,
    finishTime: null,
    taskStatus: null
  };
  proxy.resetForm("taskRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.pkId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加水样采样任务";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getTask(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "任务详情";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["taskRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateTask(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTask(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _pkIds = row.pkId || ids.value;
  proxy.$modal.confirm('是否确认删除水样采样任务编号为"' + _pkIds + '"的数据项？').then(function () {
    return delTask(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => { });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/task/export', {
    ...queryParams.value
  }, `task_${new Date().getTime()}.xlsx`)
}

getList();
</script>

<style scoped>
.gantt-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
}

.gantt-header {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  position: sticky;
  top: 0;
  z-index: 1;
}

.task-info-header {
  width: 300px;
  padding: 12px;
  border-right: 1px solid #dcdfe6;
  font-weight: bold;
  flex-shrink: 0;
}

.timeline-header {
  display: flex;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.timeline-header::-webkit-scrollbar {
  display: none;
}

.timeline-scroll-container {
  display: flex;
  flex: 1;
}

.timeline-scrollbar {
  position: absolute;
  bottom: 0;
  height: 8px;
  width: 100px;
  background-color: #c0c4cc;
  border-radius: 4px;
  cursor: ew-resize;
  z-index: 2;
}

.timeline-scrollbar:hover {
  background-color: #909399;
}

.timeline-cell {
  min-width: 40px;
  padding: 8px;
  text-align: center;
  border-right: 1px solid #dcdfe6;
  flex-shrink: 0;
}

.gantt-body {
  overflow-y: auto;
  max-height: 600px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gantt-body::-webkit-scrollbar {
  display: none;
}

.gantt-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
  height: 60px;
  cursor: pointer;
}

.gantt-row:hover {
  background-color: #f5f7fa;
}

.task-info {
  width: 300px;
  padding: 12px;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}

.task-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.task-code {
  color: #606266;
  margin-bottom: 4px;
  font-size: 12px;
}

.task-operator {
  color: #909399;
  font-size: 12px;
}

.timeline {
  flex: 1;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.timeline::-webkit-scrollbar {
  display: none;
}

.task-bar {
  position: absolute;
  height: 30px;
  top: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  will-change: transform;
  cursor: pointer;
}

.task-bar:hover {
  filter: brightness(0.95);
}

.task-status-segment {
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
}
</style>
