<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="站点编码" prop="stationCode">
        <el-input
          v-model="queryParams.stationCode"
          placeholder="请输入站点编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="站点名称" prop="stationName">
        <el-input
          v-model="queryParams.stationName"
          placeholder="请输入站点名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="断面" prop="section">
        <el-select v-model="queryParams.section" placeholder="请选择断面" clearable style="width: 200px">
          <el-option
            v-for="dict in River_SectionTCIDSection_NameTCIDSection_CodeTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
      <el-form-item label="监测项目" prop="monitorItems">
        <el-select v-model="queryParams.monitorItems" placeholder="请选择监测项目" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_mon_item"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="自动采样频率" prop="samplingFrequency">
        <el-input
          v-model="queryParams.samplingFrequency"
          placeholder="请输入自动采样频率"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="水质目标等级" prop="qualityGrade">
        <el-select v-model="queryParams.qualityGrade" placeholder="请选择水质目标等级" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_qa_grade"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="站点地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入站点地址"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="站点状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择站点状态" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_site_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联网情况" prop="onlineStatus">
        <el-select v-model="queryParams.onlineStatus" placeholder="请选择联网情况" clearable style="width: 200px">
          <el-option
            v-for="dict in site_online_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="一站一策浊度上阈值" prop="higherThreshold">
        <el-input
          v-model="queryParams.higherThreshold"
          placeholder="请输入一站一策浊度上阈值"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="一站一策浊度下阈值" prop="lowerThreshold">
        <el-input
          v-model="queryParams.lowerThreshold"
          placeholder="请输入一站一策浊度下阈值"
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
          v-hasPermi="['obd:StateControlledStation:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:StateControlledStation:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:StateControlledStation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:StateControlledStation:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="StateControlledStationList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:StateControlledStation:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:StateControlledStation:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="站点编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="stationCode" />
      <el-table-column label="站点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="stationName" />
      <el-table-column label="断面" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="section">
        <template #default="scope">
          <dict-tag :options="River_SectionTCIDSection_NameTCIDSection_CodeTCIDPK_ID" :value="scope.row.section"/>
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="longitude" />
      <el-table-column label="纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="latitude" />
      <el-table-column label="监测项目" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="monitorItems">
        <template #default="scope">
          <dict-tag :options="obd_mon_item" :value="scope.row.monitorItems"/>
        </template>
      </el-table-column>
      <el-table-column label="自动采样频率" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="samplingFrequency" />
      <el-table-column label="水质目标等级" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="qualityGrade">
        <template #default="scope">
          <dict-tag :options="obd_qa_grade" :value="scope.row.qualityGrade"/>
        </template>
      </el-table-column>
      <el-table-column label="站点地址" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="address" />
      <el-table-column label="站点状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="status">
        <template #default="scope">
          <dict-tag :options="obd_site_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="联网情况" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="onlineStatus">
        <template #default="scope">
          <dict-tag :options="site_online_status" :value="scope.row.onlineStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="一站一策浊度上阈值" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="higherThreshold" />
      <el-table-column label="一站一策浊度下阈值" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="lowerThreshold" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改国控站点对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="StateControlledStationRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="站点编码" prop="stationCode">
          <el-input v-model="form.stationCode" placeholder="请输入站点编码" />
        </el-form-item>
        <el-form-item label="站点名称" prop="stationName">
          <el-input v-model="form.stationName" placeholder="请输入站点名称" />
        </el-form-item>
        <el-form-item label="断面" prop="section">
          <el-select v-model="form.section" placeholder="请选择断面">
            <el-option
              v-for="dict in River_SectionTCIDSection_NameTCIDSection_CodeTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="监测项目" prop="monitorItems">
          <el-select v-model="form.monitorItems" placeholder="请选择监测项目">
            <el-option
              v-for="dict in obd_mon_item"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动采样频率" prop="samplingFrequency">
          <el-input v-model="form.samplingFrequency" placeholder="请输入自动采样频率" />
        </el-form-item>
        <el-form-item label="水质目标等级" prop="qualityGrade">
          <el-select v-model="form.qualityGrade" placeholder="请选择水质目标等级">
            <el-option
              v-for="dict in obd_qa_grade"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入站点地址" />
        </el-form-item>
        <el-form-item label="站点状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in obd_site_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联网情况" prop="onlineStatus">
          <el-radio-group v-model="form.onlineStatus">
            <el-radio
              v-for="dict in site_online_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="一站一策浊度上阈值" prop="higherThreshold">
          <el-input v-model="form.higherThreshold" placeholder="请输入一站一策浊度上阈值" />
        </el-form-item>
        <el-form-item label="一站一策浊度下阈值" prop="lowerThreshold">
          <el-input v-model="form.lowerThreshold" placeholder="请输入一站一策浊度下阈值" />
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

<script setup name="StateControlledStation">
import { listStateControlledStation, getStateControlledStation, delStateControlledStation, addStateControlledStation, updateStateControlledStation } from "@/api/obd/StateControlledStation";

const { proxy } = getCurrentInstance();
const { obd_mon_item, site_online_status, obd_qa_grade, River_SectionTCIDSection_NameTCIDSection_CodeTCIDPK_ID, obd_site_status } = proxy.useDict('obd_mon_item', 'site_online_status', 'obd_qa_grade', 'River_SectionTCIDSection_NameTCIDSection_CodeTCIDPK_ID', 'obd_site_status');

const StateControlledStationList = ref([]);
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
    stationCode: null,
    stationName: null,
    section: null,
    longitude: null,
    latitude: null,
    monitorItems: null,
    samplingFrequency: null,
    qualityGrade: null,
    address: null,
    status: null,
    onlineStatus: null,
    higherThreshold: null,
    lowerThreshold: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询国控站点列表 */
function getList() {
  loading.value = true;
  listStateControlledStation(queryParams.value).then(response => {
    StateControlledStationList.value = response.rows;
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
    stationCode: null,
    stationName: null,
    section: null,
    longitude: null,
    latitude: null,
    monitorItems: null,
    samplingFrequency: null,
    qualityGrade: null,
    address: null,
    status: null,
    onlineStatus: null,
    higherThreshold: null,
    lowerThreshold: null
  };
  proxy.resetForm("StateControlledStationRef");
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
  title.value = "添加国控站点";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getStateControlledStation(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改国控站点";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["StateControlledStationRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateStateControlledStation(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addStateControlledStation(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除国控站点编号为"' + _pkIds + '"的数据项？').then(function() {
    return delStateControlledStation(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/StateControlledStation/export', {
    ...queryParams.value
  }, `StateControlledStation_${new Date().getTime()}.xlsx`)
}

getList();
</script>
