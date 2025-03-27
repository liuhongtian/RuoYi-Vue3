<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="计划编码" prop="planNo">
        <el-input
          v-model="queryParams.planNo"
          placeholder="请输入计划编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="月份" prop="planMonth">
        <el-input
          v-model="queryParams.planMonth"
          placeholder="请输入月份"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="季度" prop="planQuarter">
        <el-select v-model="queryParams.planQuarter" placeholder="请选择季度" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_quarter"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月度标识" prop="monthFlag">
        <el-select v-model="queryParams.monthFlag" placeholder="请选择月度标识" clearable style="width: 200px">
          <el-option
            v-for="dict in month_tag"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="计划来源" prop="planResource">
        <el-select v-model="queryParams.planResource" placeholder="请选择计划来源" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_plan_src"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="断面/站点编码" prop="sectionCode">
        <el-input
          v-model="queryParams.sectionCode"
          placeholder="请输入断面/站点编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="断面/站点名称" prop="sectionName">
        <el-input
          v-model="queryParams.sectionName"
          placeholder="请输入断面/站点名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="确认状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择确认状态" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_confirm_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.startDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="endDate">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.endDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务内容" prop="taskContent">
        <el-input
          v-model="queryParams.taskContent"
          placeholder="请输入任务内容"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生成时间" prop="releaseTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.releaseTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择生成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生成人员" prop="releaseUser">
        <el-input
          v-model="queryParams.releaseUser"
          placeholder="请输入生成人员"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联日任务" prop="taskNo">
        <el-input
          v-model="queryParams.taskNo"
          placeholder="请输入关联日任务"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行情况" prop="executionStatus">
        <el-select v-model="queryParams.executionStatus" placeholder="请选择执行情况" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_plan_proc_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <hr/>
      <div style="width: 100%; text-align: right;"><el-form-item>
        <el-button type="primary" icon="Search" style="width: 100px" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" style="width: 100px" @click="resetQuery">重置</el-button>
      </el-form-item></div>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['obd:ObdMonthPlan:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:ObdMonthPlan:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:ObdMonthPlan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:ObdMonthPlan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ObdMonthPlanList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:ObdMonthPlan:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:ObdMonthPlan:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="计划编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="planNo" />
      <el-table-column label="月份" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="planMonth" />
      <el-table-column label="季度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="planQuarter">
        <template #default="scope">
          <dict-tag :options="ini_quarter" :value="scope.row.planQuarter"/>
        </template>
      </el-table-column>
      <el-table-column label="月度标识" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="monthFlag">
        <template #default="scope">
          <dict-tag :options="month_tag" :value="scope.row.monthFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="计划来源" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="planResource">
        <template #default="scope">
          <dict-tag :options="obd_plan_src" :value="scope.row.planResource"/>
        </template>
      </el-table-column>
      <el-table-column label="断面/站点编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionCode" />
      <el-table-column label="断面/站点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionName" />
      <el-table-column label="确认状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="status">
        <template #default="scope">
          <dict-tag :options="obd_confirm_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="开始日期" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="startDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="endDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务内容" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="taskContent" />
      <el-table-column label="生成时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="releaseTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.releaseTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生成人员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="releaseUser" />
      <el-table-column label="关联日任务" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="taskNo" />
      <el-table-column label="执行情况" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="executionStatus">
        <template #default="scope">
          <dict-tag :options="obd_plan_proc_status" :value="scope.row.executionStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="执行情况说明" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="executionDesc" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改月度计划跟踪对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="ObdMonthPlanRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="计划编码" prop="planNo">
          <el-input v-model="form.planNo" placeholder="请输入计划编码" />
        </el-form-item>
        <el-form-item label="月份" prop="planMonth">
          <el-input v-model="form.planMonth" placeholder="请输入月份" />
        </el-form-item>
        <el-form-item label="季度" prop="planQuarter">
          <el-select v-model="form.planQuarter" placeholder="请选择季度">
            <el-option
              v-for="dict in ini_quarter"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月度标识" prop="monthFlag">
          <el-select v-model="form.monthFlag" placeholder="请选择月度标识">
            <el-option
              v-for="dict in month_tag"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划来源" prop="planResource">
          <el-select v-model="form.planResource" placeholder="请选择计划来源">
            <el-option
              v-for="dict in obd_plan_src"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="断面/站点编码" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入断面/站点编码" />
        </el-form-item>
        <el-form-item label="断面/站点名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入断面/站点名称" />
        </el-form-item>
        <el-form-item label="确认状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in obd_confirm_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker clearable
            v-model="form.startDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker clearable
            v-model="form.endDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务内容" prop="taskContent">
          <el-input v-model="form.taskContent" placeholder="请输入任务内容" />
        </el-form-item>
        <el-form-item label="生成时间" prop="releaseTime">
          <el-date-picker clearable
            v-model="form.releaseTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择生成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生成人员" prop="releaseUser">
          <el-input v-model="form.releaseUser" placeholder="请输入生成人员" />
        </el-form-item>
        <el-form-item label="关联日任务" prop="taskNo">
          <el-input v-model="form.taskNo" placeholder="请输入关联日任务" />
        </el-form-item>
        <el-form-item label="执行情况" prop="executionStatus">
          <el-radio-group v-model="form.executionStatus">
            <el-radio
              v-for="dict in obd_plan_proc_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="执行情况说明" prop="executionDesc">
          <el-input v-model="form.executionDesc" type="textarea" placeholder="请输入内容" />
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

<script setup name="ObdMonthPlan">
import { listObdMonthPlan, getObdMonthPlan, delObdMonthPlan, addObdMonthPlan, updateObdMonthPlan } from "@/api/obd/ObdMonthPlan";

const { proxy } = getCurrentInstance();
const { ini_quarter, month_tag, obd_plan_proc_status, obd_plan_src, obd_confirm_status } = proxy.useDict('ini_quarter', 'month_tag', 'obd_plan_proc_status', 'obd_plan_src', 'obd_confirm_status');

const ObdMonthPlanList = ref([]);
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
    planNo: null,
    planMonth: null,
    planQuarter: null,
    monthFlag: null,
    planResource: null,
    sectionCode: null,
    sectionName: null,
    status: null,
    startDate: null,
    endDate: null,
    taskContent: null,
    releaseTime: null,
    releaseUser: null,
    taskNo: null,
    executionStatus: null,
    executionDesc: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询月度计划跟踪列表 */
function getList() {
  loading.value = true;
  listObdMonthPlan(queryParams.value).then(response => {
    ObdMonthPlanList.value = response.rows;
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
    planNo: null,
    planMonth: null,
    planQuarter: null,
    monthFlag: null,
    planResource: null,
    sectionCode: null,
    sectionName: null,
    status: null,
    startDate: null,
    endDate: null,
    taskContent: null,
    releaseTime: null,
    releaseUser: null,
    taskNo: null,
    executionStatus: null,
    executionDesc: null
  };
  proxy.resetForm("ObdMonthPlanRef");
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

/** 处理排序 */
function handleSortChange(column) {
  queryParams.value.orderByColumn = column.prop; //查询字段是表格中字段名字
  queryParams.value.isAsc = column.order; //动态取值排序顺序
  getList();
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
  title.value = "添加月度计划跟踪";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getObdMonthPlan(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改月度计划跟踪";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["ObdMonthPlanRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateObdMonthPlan(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addObdMonthPlan(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除月度计划跟踪编号为"' + _pkIds + '"的数据项？').then(function() {
    return delObdMonthPlan(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/ObdMonthPlan/export', {
    ...queryParams.value
  }, `ObdMonthPlan_${new Date().getTime()}.xlsx`)
}

getList();
</script>
