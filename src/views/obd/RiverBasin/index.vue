<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="流域编码" prop="riverBasinCode">
        <el-input
          v-model="queryParams.riverBasinCode"
          placeholder="请输入流域编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流域名称" prop="riverBasinName">
        <el-input
          v-model="queryParams.riverBasinName"
          placeholder="请输入流域名称"
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
          v-hasPermi="['obd:RiverBasin:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:RiverBasin:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:RiverBasin:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:RiverBasin:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="RiverBasinList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:RiverBasin:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:RiverBasin:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="流域编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="riverBasinCode" />
      <el-table-column label="流域名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="riverBasinName" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改流域信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="RiverBasinRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="流域编码" prop="riverBasinCode">
          <el-input v-model="form.riverBasinCode" placeholder="请输入流域编码" />
        </el-form-item>
        <el-form-item label="流域名称" prop="riverBasinName">
          <el-input v-model="form.riverBasinName" placeholder="请输入流域名称" />
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

<script setup name="RiverBasin">
import { listRiverBasin, getRiverBasin, delRiverBasin, addRiverBasin, updateRiverBasin } from "@/api/obd/RiverBasin";

const { proxy } = getCurrentInstance();

const RiverBasinList = ref([]);
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
    riverBasinCode: null,
    riverBasinName: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询流域信息列表 */
function getList() {
  loading.value = true;
  listRiverBasin(queryParams.value).then(response => {
    RiverBasinList.value = response.rows;
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
    riverBasinCode: null,
    riverBasinName: null
  };
  proxy.resetForm("RiverBasinRef");
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
  title.value = "添加流域信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getRiverBasin(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改流域信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["RiverBasinRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateRiverBasin(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addRiverBasin(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除流域信息编号为"' + _pkIds + '"的数据项？').then(function() {
    return delRiverBasin(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/RiverBasin/export', {
    ...queryParams.value
  }, `RiverBasin_${new Date().getTime()}.xlsx`)
}

getList();
</script>
