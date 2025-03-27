<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="日期" prop="weatherDate">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.weatherDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="区县" prop="County">
        <el-input
          v-model="queryParams.County"
          placeholder="请输入区县"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="天气" prop="Weather">
        <el-input
          v-model="queryParams.Weather"
          placeholder="请输入天气"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昨天天气" prop="weatherPrevday">
        <el-input
          v-model="queryParams.weatherPrevday"
          placeholder="请输入昨天天气"
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
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:WeatherInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="WeatherInfoList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column label="日期" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="weatherDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.weatherDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区县" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="County" />
      <el-table-column label="天气" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Weather" />
      <el-table-column label="昨天天气" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="weatherPrevday" />
      <el-table-column label="降雨量" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Rainfall" />
      <el-table-column label="风力" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Wind" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改气象信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="WeatherInfoRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="weatherDate">
          <el-date-picker clearable
            v-model="form.weatherDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="区县" prop="County">
          <el-input v-model="form.County" placeholder="请输入区县" />
        </el-form-item>
        <el-form-item label="天气" prop="Weather">
          <el-input v-model="form.Weather" placeholder="请输入天气" />
        </el-form-item>
        <el-form-item label="昨天天气" prop="weatherPrevday">
          <el-input v-model="form.weatherPrevday" placeholder="请输入昨天天气" />
        </el-form-item>
        <el-form-item label="降雨量" prop="Rainfall">
          <el-input v-model="form.Rainfall" placeholder="请输入降雨量" />
        </el-form-item>
        <el-form-item label="风力" prop="Wind">
          <el-input v-model="form.Wind" placeholder="请输入风力" />
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

<script setup name="WeatherInfo">
import { listWeatherInfo, getWeatherInfo, delWeatherInfo, addWeatherInfo, updateWeatherInfo } from "@/api/obd/WeatherInfo";

const { proxy } = getCurrentInstance();

const WeatherInfoList = ref([]);
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
    weatherDate: null,
    County: null,
    Weather: null,
    weatherPrevday: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询气象信息列表 */
function getList() {
  loading.value = true;
  listWeatherInfo(queryParams.value).then(response => {
    WeatherInfoList.value = response.rows;
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
    weatherDate: null,
    County: null,
    Weather: null,
    weatherPrevday: null,
    Rainfall: null,
    Wind: null
  };
  proxy.resetForm("WeatherInfoRef");
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
  title.value = "添加气象信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getWeatherInfo(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改气象信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["WeatherInfoRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateWeatherInfo(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addWeatherInfo(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除气象信息编号为"' + _pkIds + '"的数据项？').then(function() {
    return delWeatherInfo(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/WeatherInfo/export', {
    ...queryParams.value
  }, `WeatherInfo_${new Date().getTime()}.xlsx`)
}

getList();
</script>
