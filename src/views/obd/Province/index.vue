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
      <el-form-item label="省份编码" prop="provinceId">
        <el-input
          v-model="queryParams.provinceId"
          placeholder="请输入省份编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省份名称" prop="provinceName">
        <el-input
          v-model="queryParams.provinceName"
          placeholder="请输入省份名称"
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
          v-hasPermi="['obd:Province:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:Province:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:Province:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:Province:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ProvinceList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:Province:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:Province:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="主键" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="pkId" />
      <el-table-column label="序号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="seqNo" />
      <el-table-column label="省份编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="provinceId" />
      <el-table-column label="省份名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="provinceName" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改省份信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="ProvinceRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="序号" prop="seqNo">
          <el-input v-model="form.seqNo" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="省份编码" prop="provinceId">
          <el-input v-model="form.provinceId" placeholder="请输入省份编码" />
        </el-form-item>
        <el-form-item label="省份名称" prop="provinceName">
          <el-input v-model="form.provinceName" placeholder="请输入省份名称" />
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

<script setup name="Province">
import { listProvince, getProvince, delProvince, addProvince, updateProvince } from "@/api/obd/Province";

const { proxy } = getCurrentInstance();

const ProvinceList = ref([]);
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
    provinceId: null,
    provinceName: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询省份信息列表 */
function getList() {
  loading.value = true;
  listProvince(queryParams.value).then(response => {
    ProvinceList.value = response.rows;
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
    countryId: null,
    provinceId: null,
    provinceName: null
  };
  proxy.resetForm("ProvinceRef");
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
  title.value = "添加省份信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getProvince(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改省份信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["ProvinceRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateProvince(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addProvince(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除省份信息编号为"' + _pkIds + '"的数据项？').then(function() {
    return delProvince(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/Province/export', {
    ...queryParams.value
  }, `Province_${new Date().getTime()}.xlsx`)
}

getList();
</script>
