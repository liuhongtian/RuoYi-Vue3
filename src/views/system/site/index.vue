<template>
  <div class="app-container">
    <TestDialog v-model:visible="dialogVisible"></TestDialog>
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="监测站名称" prop="siteName">
        <el-input
          v-model="queryParams.siteName"
          placeholder="请输入监测站名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监测站类型" prop="siteType">
        <el-select v-model="queryParams.siteType" placeholder="请选择监测站类型" clearable style="width: 200px">
          <el-option
            v-for="dict in msite_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 200px">
          <el-option
            v-for="dict in msite_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="openDialog">自定义表单样例</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:site:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:site:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:site:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:site:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="siteList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="siteId" :sort-orders="['descending', 'ascending']" sortable="custom"/>
      <el-table-column label="监测站名称" align="center" prop="siteName" :sort-orders="['descending', 'ascending']" sortable="custom"/>
      <el-table-column label="监测站类型" align="center" prop="siteType" :sort-orders="['descending', 'ascending']" sortable="custom">
        <template #default="scope">
          <dict-tag :options="msite_type" :value="scope.row.siteType"/>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" :sort-orders="['descending', 'ascending']" sortable="custom">
        <template #default="scope">
          <dict-tag :options="msite_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :sort-orders="['descending', 'ascending']" sortable="custom">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:site:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:site:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改监测站点对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="siteRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="监测站名称" prop="siteName">
          <el-input v-model="form.siteName" placeholder="请输入监测站名称" />
        </el-form-item>
        <el-form-item label="监测站类型" prop="siteType">
          <el-select v-model="form.siteType" placeholder="请选择监测站类型">
            <el-option
              v-for="dict in msite_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in msite_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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

<script setup name="Site">
import { listSite, getSite, delSite, addSite, updateSite } from "@/api/system/site";

import TestDialog from "./testDialog.vue";

const { proxy } = getCurrentInstance();
const { msite_status, msite_type } = proxy.useDict('msite_status', 'msite_type');

const siteList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const dialogVisible = ref(false);  // 是否显示弹窗

function openDialog() {
  dialogVisible.value = true;
}

watch(() => dialogVisible.value, (val) => {
console.log("监听dialogVisible值的变化:", val);
});

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    siteName: null,
    siteType: null,
    status: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

// TODO 处理排序
function handleSortChange(column) {
  queryParams.value.orderByColumn = column.prop; //查询字段是表格中字段名字
  queryParams.value.isAsc = column.order; //动态取值排序顺序
  getList();
}

/** 查询监测站点列表 */
function getList() {
  loading.value = true;
  listSite(queryParams.value).then(response => {
    siteList.value = response.rows;
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
    siteId: null,
    siteName: null,
    siteType: null,
    status: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("siteRef");
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
  ids.value = selection.map(item => item.siteId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加监测站点";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _siteId = row.siteId || ids.value
  getSite(_siteId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改监测站点";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["siteRef"].validate(valid => {
    if (valid) {
      if (form.value.siteId != null) {
        updateSite(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addSite(form.value).then(response => {
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
  const _siteIds = row.siteId || ids.value;
  proxy.$modal.confirm('是否确认删除监测站点编号为"' + _siteIds + '"的数据项？').then(function() {
    return delSite(_siteIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/site/export', {
    ...queryParams.value
  }, `site_${new Date().getTime()}.xlsx`)
}

getList();
</script>
