<template>
  <div class="app-container">
    <!--div class="custom-form">
      <iframe
        src="http://www.liuhongtian.com:3000/d-solo/begdquzzg6vb4b/my-sample-dashboard?orgId=1&from=1727712000000&to=1743523199000&timezone=browser&theme=light&panelId=3&__feature.dashboardSceneSolo"
        width="100%" height="400" frameborder="0">
      </iframe>
    </div-->
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="任务编码" prop="taskCode">
        <el-input v-model="queryParams.taskCode" placeholder="请输入任务编码" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="queryParams.taskName" placeholder="请输入任务名称" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="运维人员" prop="operator">
        <el-input v-model="queryParams.operator" placeholder="请输入运维人员" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="调度时间" prop="scheduleTime">
        <el-date-picker clearable v-model="queryParams.scheduleTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择调度时间" style="width: 200px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker clearable v-model="queryParams.startTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择开始时间" style="width: 200px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="finishTime">
        <el-date-picker clearable v-model="queryParams.finishTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择结束时间" style="width: 200px">
        </el-date-picker>
      </el-form-item>
      <hr/>
      <div style="width: 100%; text-align: right;"><el-form-item>
        <el-button type="primary" icon="Search" style="width: 100px" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" style="width: 100px" @click="resetQuery">重置</el-button>
      </el-form-item></div>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:task:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
          v-hasPermi="['system:task:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['system:task:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          v-hasPermi="['system:task:export']">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <div class="gantt-container">
      <div class="gantt-header">
        <div class="task-info-header">任务信息</div>
        <div class="timeline-header">
          <div v-for="date in timelineDates" :key="date" class="timeline-cell">
            {{ formatDate(date) }}
          </div>
        </div>
      </div>
      
      <div class="gantt-body">
        <div v-for="task in taskList" :key="task.pkId" class="gantt-row">
          <div class="task-info">
            <div class="task-code">{{ task.taskCode }}</div>
            <div class="task-name">{{ task.taskName }}</div>
            <div class="task-operator">{{ task.operator }}</div>
          </div>
          <div class="timeline">
            <div class="task-bar" :style="getTaskBarStyle(task)">
              <div v-for="(segment, index) in getTaskStatusSegments(task)" 
                   :key="index" 
                   class="task-status-segment"
                   :style="segment">
              </div>
            </div>
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

const timelineDates = ref([]);
const statusColors = {
  0: '#e6a23c',  // 已创建 - 橙色
  1: '#409eff',  // 已调度 - 蓝色
  2: '#67c23a',  // 执行中 - 绿色
  3: '#909399'   // 执行结束 - 灰色
};

// 添加状态变更历史的数据结构
const taskStatusHistory = ref({});

function generateTimeline() {
  const dates = [];
  const startDate = new Date();
  // 修改为显示过去30天到未来30天
  for (let i = -30; i <= 30; i++) {
    dates.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
  }
  timelineDates.value = dates;
}

function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

// 计算任务进度条的样式
function getTaskBarStyle(task) {
  const createTime = new Date(task.createTime);
  const endTime = task.finishTime ? new Date(task.finishTime) : new Date();
  
  // 找到时间轴上的起始和结束位置
  const startIndex = timelineDates.value.findIndex(date => 
    date.getTime() >= createTime.getTime());
  const endIndex = timelineDates.value.findIndex(date => 
    date.getTime() >= endTime.getTime());
  
  if (startIndex === -1 || endIndex === -1) return {};
  
  return {
    left: `${(startIndex / timelineDates.value.length) * 100}%`,
    width: `${((endIndex - startIndex) / timelineDates.value.length) * 100}%`
  };
}

// 获取任务状态段的样式
function getTaskStatusSegments(task) {
  const segments = [];
  const createTime = new Date(task.createTime);
  const endTime = task.finishTime ? new Date(task.finishTime) : new Date();
  
  // 定义状态变更点
  const statusChanges = [
    { time: createTime, status: 0 },  // 已创建
    { time: task.scheduleTime ? new Date(task.scheduleTime) : null, status: 1 },  // 已调度
    { time: task.startTime ? new Date(task.startTime) : null, status: 2 },  // 执行中
    { time: task.finishTime ? new Date(task.finishTime) : null, status: 3 }  // 执行结束
  ].filter(change => change.time !== null && change.time <= endTime);  // 过滤掉未发生的时间点和超过结束时间的时间点

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

  // 计算每个状态段的宽度
  for (let i = 0; i < statusChanges.length; i++) {
    const currentChange = statusChanges[i];
    const nextChange = statusChanges[i + 1];
    
    const startIndex = timelineDates.value.findIndex(date => 
      date.getTime() >= currentChange.time.getTime());
    const endIndex = nextChange 
      ? timelineDates.value.findIndex(date => date.getTime() >= nextChange.time.getTime())
      : timelineDates.value.findIndex(date => date.getTime() >= endTime.getTime());
    
    if (startIndex !== -1 && endIndex !== -1) {
      segments.push({
        left: `${(startIndex / timelineDates.value.length) * 100}%`,
        width: `${((endIndex - startIndex) / timelineDates.value.length) * 100}%`,
        backgroundColor: statusColors[currentChange.status] || '#909399'
      });
    }
  }

  return segments;
}

onMounted(() => {
  generateTimeline();
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
    title.value = "修改水样采样任务";
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
}

.gantt-header {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}

.task-info-header {
  width: 300px;
  padding: 12px;
  border-right: 1px solid #dcdfe6;
  font-weight: bold;
}

.timeline-header {
  display: flex;
  flex: 1;
  overflow-x: auto;
}

.timeline-cell {
  min-width: 40px;
  padding: 8px;
  text-align: center;
  border-right: 1px solid #dcdfe6;
}

.gantt-body {
  overflow-y: auto;
  max-height: 600px;
}

.gantt-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
  height: 60px;
}

.task-info {
  width: 300px;
  padding: 12px;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-code {
  font-weight: bold;
  margin-bottom: 4px;
}

.task-name {
  color: #606266;
  margin-bottom: 4px;
}

.task-operator {
  color: #909399;
  font-size: 12px;
}

.timeline {
  flex: 1;
  position: relative;
  overflow-x: auto;
}

.task-bar {
  position: absolute;
  height: 30px;
  top: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
  overflow: hidden;
  display: flex;  /* 添加flex布局 */
}

.task-status-segment {
  height: 100%;
  transition: all 0.3s ease;
}
</style>
