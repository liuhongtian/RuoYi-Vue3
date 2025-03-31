<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="办事处编码" prop="officeCode">
        <el-input
          v-model="queryParams.officeCode"
          placeholder="请输入办事处编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办事处名称" prop="officeName">
        <el-input
          v-model="queryParams.officeName"
          placeholder="请输入办事处名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属省份" prop="province">
        <el-select v-model="queryParams.province" placeholder="请选择所属省份" clearable style="width: 200px">
          <el-option
            v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属地市" prop="city">
        <el-select v-model="queryParams.city" placeholder="请选择所属地市" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_city"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入详细地址"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          v-model="queryParams.longitude"
          placeholder="请输入经度"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          v-model="queryParams.latitude"
          placeholder="请输入纬度"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属公司" prop="company">
        <el-select v-model="queryParams.company" placeholder="请选择所属公司" clearable style="width: 200px">
          <el-option
            v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
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
          v-hasPermi="['obd:OmOffice:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:OmOffice:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:OmOffice:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:OmOffice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="OmOfficeList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:OmOffice:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:OmOffice:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="办事处编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="officeCode" />
      <el-table-column label="办事处名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="officeName" />
      <el-table-column label="所属省份" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="province">
        <template #default="scope">
          <dict-tag :options="Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No" :value="scope.row.province"/>
        </template>
      </el-table-column>
      <el-table-column label="所属地市" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="city">
        <template #default="scope">
          <dict-tag :options="ini_city" :value="scope.row.city"/>
        </template>
      </el-table-column>
      <el-table-column label="详细地址" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="address" />
      <el-table-column label="经度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="longitude" />
      <el-table-column label="纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="latitude" />
      <el-table-column label="所属公司" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="company">
        <template #default="scope">
          <dict-tag :options="OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID" :value="scope.row.company"/>
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

    <!-- 添加或修改办事处对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="OmOfficeRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="办事处编码" prop="officeCode">
          <el-input v-model="form.officeCode" placeholder="请输入办事处编码" />
        </el-form-item>
        <el-form-item label="办事处名称" prop="officeName">
          <el-input v-model="form.officeName" placeholder="请输入办事处名称" />
        </el-form-item>
        <el-form-item label="所属省份" prop="province">
          <el-select v-model="form.province" placeholder="请选择所属省份">
            <el-option
              v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地市" prop="city">
          <el-select v-model="form.city" placeholder="请选择所属地市">
            <el-option
              v-for="dict in ini_city"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-select v-model="form.company" placeholder="请选择所属公司">
            <el-option
              v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="OmOffice">
import { listOmOffice, getOmOffice, delOmOffice, addOmOffice, updateOmOffice } from "@/api/obd/OmOffice";

import { useRoute } from 'vue-router';
const { query, params } = useRoute();

const { proxy } = getCurrentInstance();
const { Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No, ini_city, OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID } = proxy.useDict('Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No', 'ini_city', 'OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID');

const OmOfficeList = ref([]);
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
    officeCode: null,
    officeName: null,
    province: null,
    city: null,
    address: null,
    longitude: null,
    latitude: null,
    company: query.company
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询办事处列表 */
function getList() {
  loading.value = true;
  listOmOffice(queryParams.value).then(response => {
    OmOfficeList.value = response.rows;
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
    officeCode: null,
    officeName: null,
    province: null,
    city: null,
    officeRole: null,
    address: null,
    longitude: null,
    latitude: null,
    company: null
  };
  proxy.resetForm("OmOfficeRef");
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
  title.value = "添加办事处";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getOmOffice(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改办事处";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["OmOfficeRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateOmOffice(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addOmOffice(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除办事处编号为"' + _pkIds + '"的数据项？').then(function() {
    return delOmOffice(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/OmOffice/export', {
    ...queryParams.value
  }, `OmOffice_${new Date().getTime()}.xlsx`)
}

getList();
</script>
