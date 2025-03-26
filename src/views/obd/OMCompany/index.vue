<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="公司编码" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在地区">
        <el-cascader v-model="area" :options="areaOptions" :props="areaProps"
          :style="{width: '100%'}" placeholder="请选择所在地区" clearable style="width: 200px"></el-cascader>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入公司地址"
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
          v-hasPermi="['obd:OMCompany:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:OMCompany:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:OMCompany:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:OMCompany:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="OMCompanyList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:OMCompany:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:OMCompany:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="公司编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="companyId" />
      <el-table-column label="公司名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="companyName" />
      <el-table-column label="所在省份" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="province">
        <template #default="scope">
          <dict-tag :options="ini_province" :value="scope.row.province"/>
        </template>
      </el-table-column>
      <el-table-column label="所在地市" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="city">
        <template #default="scope">
          <dict-tag :options="ini_city" :value="scope.row.city"/>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="address" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改运维公司对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="OMCompanyRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司编码" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司编码" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="所在地区">
        <el-cascader v-model="area" :options="areaOptions" :props="areaProps"
          :style="{width: '100%'}" placeholder="请选择所在地区" clearable style="width: 200px"></el-cascader>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入公司地址" />
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

<script setup name="OMCompany">
import { listOMCompany, getOMCompany, delOMCompany, addOMCompany, updateOMCompany } from "@/api/obd/OMCompany";

const { proxy } = getCurrentInstance();
const { ini_province } = proxy.useDict('ini_province');
const { ini_city } = proxy.useDict('ini_city');
const OMCompanyList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const area = ref([1, 2])
const areaOptions = ref([{
  "label": "北京市",
  "value": 10,
  "id": 103,
  "children": [{
    "label": "北京市",
    "value": 10001,
    "id": 106
  }]
}, {
  "label": "辽宁省",
  "value": 15,
  "id": 102,
  "children": [{
    "label": "沈阳市",
    "value": 15001,
    "id": 104
  }, {
    "label": "大连市",
    "value": 15012,
    "id": 105
  }]
}])

// props设置
const areaProps = ref({
  "multiple": false
})

function getAreaOptions() {
  // TODO 发起请求获取数据
  areaOptions.value
}

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    companyId: null,
    companyName: null,
    province: null,
    city: null,
    address: null
  },
  rules: {
    province: [
      { required: true, message: "所在省份不能为空", trigger: "change" }
    ],
    city: [
      { required: true, message: "所在地市不能为空", trigger: "blur" }
    ],
    area: [{
      required: true,
      type: 'array',
      message: '请至少选择一个area',
      trigger: 'change'
    }],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询运维公司列表 */
function getList() {
  loading.value = true;
  listOMCompany(queryParams.value).then(response => {
    OMCompanyList.value = response.rows;
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
    companyId: null,
    companyName: null,
    province: null,
    city: null,
    address: null
  };
  proxy.resetForm("OMCompanyRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.province = area.value[0]
  queryParams.value.city = area.value[1]
  console.log(JSON.stringify(queryParams.value))
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
  title.value = "添加运维公司";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getOMCompany(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改运维公司";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["OMCompanyRef"].validate(valid => {
    if (valid) {
      form.value.province = area.value[0]
      form.value.city = area.value[1]
      console.log(JSON.stringify(form.value))
      if (form.value.pkId != null) {
        updateOMCompany(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addOMCompany(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除运维公司编号为"' + _pkIds + '"的数据项？').then(function() {
    return delOMCompany(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/OMCompany/export', {
    ...queryParams.value
  }, `OMCompany_${new Date().getTime()}.xlsx`)
}

getList();
</script>
