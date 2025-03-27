<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="小组编码" prop="groupCode">
        <el-input
          v-model="queryParams.groupCode"
          placeholder="请输入小组编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办事处" prop="officeCode">
        <el-input
          v-model="queryParams.officeCode"
          placeholder="请输入办事处"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运维公司" prop="companyCode">
        <el-input
          v-model="queryParams.companyCode"
          placeholder="请输入运维公司"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属包件" prop="managePackage">
        <el-input
          v-model="queryParams.managePackage"
          placeholder="请输入所属包件"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组长" prop="teamLeader">
        <el-input
          v-model="queryParams.teamLeader"
          placeholder="请输入组长"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小组类别" prop="teamType">
        <el-select v-model="queryParams.teamType" placeholder="请选择小组类别" clearable style="width: 200px">
          <el-option
            v-for="dict in om_team_type"
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
          v-hasPermi="['obd:OmOperaTeam:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:OmOperaTeam:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:OmOperaTeam:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:OmOperaTeam:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="OmOperaTeamList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:OmOperaTeam:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:OmOperaTeam:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="小组编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="groupCode" />
      <el-table-column label="办事处" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="officeCode" />
      <el-table-column label="运维公司" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="companyCode" />
      <el-table-column label="可前往区域" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="manageArea" />
      <el-table-column label="所属包件" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="managePackage" />
      <el-table-column label="组长" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="teamLeader" />
      <el-table-column label="组员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="teamMembers" />
      <el-table-column label="小组类别" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="teamType">
        <template #default="scope">
          <dict-tag :options="om_team_type" :value="scope.row.teamType"/>
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

    <!-- 添加或修改运维小组对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="OmOperaTeamRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="小组编码" prop="groupCode">
          <el-input v-model="form.groupCode" placeholder="请输入小组编码" />
        </el-form-item>
        <el-form-item label="办事处" prop="officeCode">
          <el-input v-model="form.officeCode" placeholder="请输入办事处" />
        </el-form-item>
        <el-form-item label="运维公司" prop="companyCode">
          <el-input v-model="form.companyCode" placeholder="请输入运维公司" />
        </el-form-item>
        <el-form-item label="可前往区域" prop="manageArea">
          <el-input v-model="form.manageArea" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="所属包件" prop="managePackage">
          <el-input v-model="form.managePackage" placeholder="请输入所属包件" />
        </el-form-item>
        <el-form-item label="组长" prop="teamLeader">
          <el-input v-model="form.teamLeader" placeholder="请输入组长" />
        </el-form-item>
        <el-form-item label="组员" prop="teamMembers">
          <el-input v-model="form.teamMembers" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="小组类别" prop="teamType">
          <el-select v-model="form.teamType" placeholder="请选择小组类别">
            <el-option
              v-for="dict in om_team_type"
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

<script setup name="OmOperaTeam">
import { listOmOperaTeam, getOmOperaTeam, delOmOperaTeam, addOmOperaTeam, updateOmOperaTeam } from "@/api/obd/OmOperaTeam";

const { proxy } = getCurrentInstance();
const { om_team_type } = proxy.useDict('om_team_type');

const OmOperaTeamList = ref([]);
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
    groupCode: null,
    officeCode: null,
    companyCode: null,
    manageArea: null,
    managePackage: null,
    teamLeader: null,
    teamMembers: null,
    teamType: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询运维小组列表 */
function getList() {
  loading.value = true;
  listOmOperaTeam(queryParams.value).then(response => {
    OmOperaTeamList.value = response.rows;
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
    groupCode: null,
    officeCode: null,
    companyCode: null,
    manageArea: null,
    managePackage: null,
    teamLeader: null,
    teamMembers: null,
    teamType: null
  };
  proxy.resetForm("OmOperaTeamRef");
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
  title.value = "添加运维小组";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getOmOperaTeam(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改运维小组";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["OmOperaTeamRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateOmOperaTeam(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addOmOperaTeam(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除运维小组编号为"' + _pkIds + '"的数据项？').then(function() {
    return delOmOperaTeam(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/OmOperaTeam/export', {
    ...queryParams.value
  }, `OmOperaTeam_${new Date().getTime()}.xlsx`)
}

getList();
</script>
