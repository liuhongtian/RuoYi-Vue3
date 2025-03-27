<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="交接点编码" prop="placeCode">
        <el-input
          v-model="queryParams.placeCode"
          placeholder="请输入交接点编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交接点名称" prop="placeName">
        <el-input
          v-model="queryParams.placeName"
          placeholder="请输入交接点名称"
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
          v-hasPermi="['obd:SampleConnectPlace:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:SampleConnectPlace:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:SampleConnectPlace:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:SampleConnectPlace:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="SampleConnectPlaceList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:SampleConnectPlace:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:SampleConnectPlace:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="交接点编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="placeCode" />
      <el-table-column label="交接点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="placeName" />
      <el-table-column label="经度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="longitude" />
      <el-table-column label="纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="latitude" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改样品交接点对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="SampleConnectPlaceRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="交接点编码" prop="placeCode">
          <el-input v-model="form.placeCode" placeholder="请输入交接点编码" />
        </el-form-item>
        <el-form-item label="交接点名称" prop="placeName">
          <el-input v-model="form.placeName" placeholder="请输入交接点名称" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
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

<script setup name="SampleConnectPlace">
import { listSampleConnectPlace, getSampleConnectPlace, delSampleConnectPlace, addSampleConnectPlace, updateSampleConnectPlace } from "@/api/obd/SampleConnectPlace";

const { proxy } = getCurrentInstance();

const SampleConnectPlaceList = ref([]);
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
    placeCode: null,
    placeName: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询样品交接点列表 */
function getList() {
  loading.value = true;
  listSampleConnectPlace(queryParams.value).then(response => {
    SampleConnectPlaceList.value = response.rows;
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
    placeCode: null,
    placeName: null,
    longitude: null,
    latitude: null
  };
  proxy.resetForm("SampleConnectPlaceRef");
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
  title.value = "添加样品交接点";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getSampleConnectPlace(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改样品交接点";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["SampleConnectPlaceRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateSampleConnectPlace(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addSampleConnectPlace(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除样品交接点编号为"' + _pkIds + '"的数据项？').then(function() {
    return delSampleConnectPlace(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/SampleConnectPlace/export', {
    ...queryParams.value
  }, `SampleConnectPlace_${new Date().getTime()}.xlsx`)
}

getList();
</script>
