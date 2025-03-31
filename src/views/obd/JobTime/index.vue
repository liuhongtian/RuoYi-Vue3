<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="断面/站点" prop="addressCode">
        <el-select v-model="queryParams.addressCode" placeholder="请选择断面/站点" clearable style="width: 200px">
          <el-option
            v-for="dict in station_and_sectionTCIDdict_labelTCIDdict_value"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称" prop="jobName">
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入任务名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计作业时间" prop="estimateDuration">
        <el-input
          v-model="queryParams.estimateDuration"
          placeholder="请输入预计作业时间"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维护人" prop="maintainer">
        <el-input
          v-model="queryParams.maintainer"
          placeholder="请输入维护人"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维护时间" prop="maintainTime">
        <el-input
          v-model="queryParams.maintainTime"
          placeholder="请输入维护时间"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
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
          v-hasPermi="['obd:JobTime:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:JobTime:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:JobTime:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:JobTime:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="JobTimeList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:JobTime:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:JobTime:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="断面/站点" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="addressCode">
        <template #default="scope">
          <dict-tag :options="station_and_sectionTCIDdict_labelTCIDdict_value" :value="scope.row.addressCode"/>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="jobName" />
      <el-table-column label="预计作业时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="estimateDuration" />
      <el-table-column label="维护人" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="maintainer" />
      <el-table-column label="维护时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="maintainTime" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改单项任务作业时间对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="JobTimeRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="断面/站点" prop="addressCode">
          <el-select v-model="form.addressCode" placeholder="请选择断面/站点">
            <el-option
              v-for="dict in station_and_sectionTCIDdict_labelTCIDdict_value"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="form.jobName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="预计作业时间" prop="estimateDuration">
          <el-input v-model="form.estimateDuration" placeholder="请输入预计作业时间" />
        </el-form-item>
        <el-form-item label="维护人" prop="maintainer">
          <el-input v-model="form.maintainer" placeholder="请输入维护人" />
        </el-form-item>
        <el-form-item label="维护时间" prop="maintainTime">
          <el-input v-model="form.maintainTime" placeholder="请输入维护时间" />
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

<script setup name="JobTime">
import { listJobTime, getJobTime, delJobTime, addJobTime, updateJobTime } from "@/api/obd/JobTime";

const { proxy } = getCurrentInstance();
const { station_and_sectionTCIDdict_labelTCIDdict_value } = proxy.useDict('station_and_sectionTCIDdict_labelTCIDdict_value');

const JobTimeList = ref([]);
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
    addressCode: null,
    jobName: null,
    estimateDuration: null,
    maintainer: null,
    maintainTime: null
  },
  rules: {
    estimateDuration: [
      { required: true, message: "预计作业时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询单项任务作业时间列表 */
function getList() {
  loading.value = true;
  listJobTime(queryParams.value).then(response => {
    JobTimeList.value = response.rows;
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
    addressCode: null,
    jobName: null,
    estimateDuration: null,
    maintainer: null,
    maintainTime: null
  };
  proxy.resetForm("JobTimeRef");
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
  title.value = "添加单项任务作业时间";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getJobTime(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改单项任务作业时间";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["JobTimeRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateJobTime(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addJobTime(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除单项任务作业时间编号为"' + _pkIds + '"的数据项？').then(function() {
    return delJobTime(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/JobTime/export', {
    ...queryParams.value
  }, `JobTime_${new Date().getTime()}.xlsx`)
}

getList();
</script>
