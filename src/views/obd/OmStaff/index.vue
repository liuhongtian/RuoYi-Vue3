<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="人员帐号" prop="staffAccount">
        <el-input
          v-model="queryParams.staffAccount"
          placeholder="请输入人员帐号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="staffName">
        <el-input
          v-model="queryParams.staffName"
          placeholder="请输入姓名"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-select v-model="queryParams.company" placeholder="请选择单位" clearable style="width: 200px">
          <el-option
            v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input
          v-model="queryParams.contact"
          placeholder="请输入联系方式"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动范围" prop="motionRange">
        <el-input
          v-model="queryParams.motionRange"
          placeholder="请输入活动范围"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色" prop="staffRole">
        <el-input
          v-model="queryParams.staffRole"
          placeholder="请输入角色"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否具备组长能力" prop="leaderFlag">
        <el-select v-model="queryParams.leaderFlag" placeholder="请选择是否具备组长能力" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_stuff_as_leader"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="负责地市" prop="manageArea">
        <el-input
          v-model="queryParams.manageArea"
          placeholder="请输入负责地市"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运维水站" prop="manageStation">
        <el-input
          v-model="queryParams.manageStation"
          placeholder="请输入运维水站"
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
          v-hasPermi="['obd:OmStaff:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:OmStaff:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:OmStaff:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:OmStaff:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="OmStaffList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:OmStaff:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:OmStaff:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="人员帐号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="staffAccount" />
      <el-table-column label="姓名" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="staffName" />
      <el-table-column label="单位" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="company">
        <template #default="scope">
          <dict-tag :options="OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID" :value="scope.row.company"/>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="contact" />
      <el-table-column label="活动范围" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="motionRange" />
      <el-table-column label="角色" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="staffRole" />
      <el-table-column label="是否具备组长能力" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="leaderFlag">
        <template #default="scope">
          <dict-tag :options="obd_stuff_as_leader" :value="scope.row.leaderFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="负责地市" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="manageArea" />
      <el-table-column label="运维水站" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="manageStation" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改运维人员对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="OmStaffRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="人员帐号" prop="staffAccount">
          <el-input v-model="form.staffAccount" placeholder="请输入人员帐号" />
        </el-form-item>
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="form.staffName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-select v-model="form.company" placeholder="请选择单位">
            <el-option
              v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="证书编号" prop="licenseNumber">
          <el-input v-model="form.licenseNumber" placeholder="请输入证书编号" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="审核积分" prop="auditPoints">
          <el-input v-model="form.auditPoints" placeholder="请输入审核积分" />
        </el-form-item>
        <el-form-item label="运维积分" prop="omPoints">
          <el-input v-model="form.omPoints" placeholder="请输入运维积分" />
        </el-form-item>
        <el-form-item label="任务" prop="capacity">
          <el-input v-model="form.capacity" placeholder="请输入任务" />
        </el-form-item>
        <el-form-item label="活动范围" prop="motionRange">
          <el-input v-model="form.motionRange" placeholder="请输入活动范围" />
        </el-form-item>
        <el-form-item label="角色" prop="staffRole">
          <el-input v-model="form.staffRole" placeholder="请输入角色" />
        </el-form-item>
        <el-form-item label="是否具备组长能力" prop="leaderFlag">
          <el-radio-group v-model="form.leaderFlag">
            <el-radio
              v-for="dict in obd_stuff_as_leader"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责地市" prop="manageArea">
          <el-input v-model="form.manageArea" placeholder="请输入负责地市" />
        </el-form-item>
        <el-form-item label="运维水站" prop="manageStation">
          <el-input v-model="form.manageStation" placeholder="请输入运维水站" />
        </el-form-item>
        <el-form-item label="手工采样断面" prop="manageSection">
          <el-input v-model="form.manageSection" type="textarea" placeholder="请输入内容" />
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

<script setup name="OmStaff">
import { listOmStaff, getOmStaff, delOmStaff, addOmStaff, updateOmStaff } from "@/api/obd/OmStaff";

import { useRoute } from 'vue-router';
const { query, params } = useRoute();

const { proxy } = getCurrentInstance();
const { obd_stuff_as_leader, OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID } = proxy.useDict('obd_stuff_as_leader', 'OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID');

const OmStaffList = ref([]);
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
    staffAccount: null,
    staffName: null,
    company: query.company,
    contact: null,
    motionRange: null,
    staffRole: null,
    leaderFlag: null,
    manageArea: null,
    manageStation: null,
  },
  rules: {
    pkId: [
      { required: true, message: "主键不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询运维人员列表 */
function getList() {
  loading.value = true;
  listOmStaff(queryParams.value).then(response => {
    OmStaffList.value = response.rows;
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
    staffAccount: null,
    staffName: null,
    company: null,
    gender: null,
    licenseNumber: null,
    contact: null,
    idNumber: null,
    auditPoints: null,
    omPoints: null,
    capacity: null,
    motionRange: null,
    staffRole: null,
    leaderFlag: null,
    manageArea: null,
    manageStation: null,
    manageSection: null
  };
  proxy.resetForm("OmStaffRef");
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
  title.value = "添加运维人员";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getOmStaff(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改运维人员";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["OmStaffRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateOmStaff(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addOmStaff(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除运维人员编号为"' + _pkIds + '"的数据项？').then(function() {
    return delOmStaff(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/OmStaff/export', {
    ...queryParams.value
  }, `OmStaff_${new Date().getTime()}.xlsx`)
}

getList();
</script>
