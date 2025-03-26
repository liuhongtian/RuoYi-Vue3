<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="序号" prop="seqNo">
        <el-input
          v-model="queryParams.seqNo"
          placeholder="请输入序号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地区编码" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入地区编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地区名称" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入地区名称"
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
          v-hasPermi="['obd:Area:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:Area:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:Area:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:Area:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="AreaList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:Area:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:Area:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="主键" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="pkId" />
      <el-table-column label="序号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="seqNo" />
      <el-table-column label="地区编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="areaId" />
      <el-table-column label="地区名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="areaName" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改地区信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="AreaRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="序号" prop="seqNo">
          <el-input v-model="form.seqNo" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="地区编码" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入地区编码" />
        </el-form-item>
        <el-form-item label="地区名称" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入地区名称" />
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

<script setup name="Area">
import { listArea, getArea, delArea, addArea, updateArea } from "@/api/obd/Area";

const { proxy } = getCurrentInstance();

const AreaList = ref([]);
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
    seqNo: null,
    areaId: null,
    areaName: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询地区信息列表 */
function getList() {
  loading.value = true;
  listArea(queryParams.value).then(response => {
    AreaList.value = response.rows;
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
    seqNo: null,
    areaId: null,
    areaName: null
  };
  proxy.resetForm("AreaRef");
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
  title.value = "添加地区信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getArea(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改地区信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["AreaRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateArea(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addArea(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除地区信息编号为"' + _pkIds + '"的数据项？').then(function() {
    return delArea(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/Area/export', {
    ...queryParams.value
  }, `Area_${new Date().getTime()}.xlsx`)
}

getList();
</script>
