<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="车牌号" prop="licenseNumber">
        <el-input
          v-model="queryParams.licenseNumber"
          placeholder="请输入车牌号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车辆类型" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车辆类型" clearable style="width: 200px">
          <el-option
            v-for="dict in vehicle_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属公司" prop="Firm">
        <el-input
          v-model="queryParams.Firm"
          placeholder="请输入所属公司"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="驻地位置" prop="Station">
        <el-input
          v-model="queryParams.Station"
          placeholder="请输入驻地位置"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属办事处" prop="officeCode">
        <el-input
          v-model="queryParams.officeCode"
          placeholder="请输入所属办事处"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车辆状态" prop="vehicleStatus">
        <el-select v-model="queryParams.vehicleStatus" placeholder="请选择车辆状态" clearable style="width: 200px">
          <el-option
            v-for="dict in vehicle_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="使用年限" prop="serviceLife">
        <el-input
          v-model="queryParams.serviceLife"
          placeholder="请输入使用年限"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="容量" prop="capacity">
        <el-input
          v-model="queryParams.capacity"
          placeholder="请输入容量"
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
          v-hasPermi="['obd:Vehicle:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:Vehicle:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:Vehicle:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:Vehicle:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="VehicleList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:Vehicle:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:Vehicle:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="车牌号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="licenseNumber" />
      <el-table-column label="车辆类型" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="vehicleType">
        <template #default="scope">
          <dict-tag :options="vehicle_type" :value="scope.row.vehicleType"/>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Firm" />
      <el-table-column label="驻地位置" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Station" />
      <el-table-column label="所属办事处" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="officeCode" />
      <el-table-column label="车辆状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="vehicleStatus">
        <template #default="scope">
          <dict-tag :options="vehicle_status" :value="scope.row.vehicleStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="使用年限" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="serviceLife" />
      <el-table-column label="容量" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="capacity" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改车辆信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="VehicleRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="车牌号" prop="licenseNumber">
          <el-input v-model="form.licenseNumber" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车辆类型" prop="vehicleType">
          <el-select v-model="form.vehicleType" placeholder="请选择车辆类型">
            <el-option
              v-for="dict in vehicle_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司" prop="Firm">
          <el-input v-model="form.Firm" placeholder="请输入所属公司" />
        </el-form-item>
        <el-form-item label="驻地位置" prop="Station">
          <el-input v-model="form.Station" placeholder="请输入驻地位置" />
        </el-form-item>
        <el-form-item label="所属办事处" prop="officeCode">
          <el-input v-model="form.officeCode" placeholder="请输入所属办事处" />
        </el-form-item>
        <el-form-item label="车辆状态" prop="vehicleStatus">
          <el-radio-group v-model="form.vehicleStatus">
            <el-radio
              v-for="dict in vehicle_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用年限" prop="serviceLife">
          <el-input v-model="form.serviceLife" placeholder="请输入使用年限" />
        </el-form-item>
        <el-form-item label="容量" prop="capacity">
          <el-input v-model="form.capacity" placeholder="请输入容量" />
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

<script setup name="Vehicle">
import { listVehicle, getVehicle, delVehicle, addVehicle, updateVehicle } from "@/api/obd/Vehicle";

const { proxy } = getCurrentInstance();
const { vehicle_status, vehicle_type } = proxy.useDict('vehicle_status', 'vehicle_type');

const VehicleList = ref([]);
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
    licenseNumber: null,
    vehicleType: null,
    Firm: null,
    Station: null,
    officeCode: null,
    vehicleStatus: null,
    serviceLife: null,
    capacity: null
  },
  rules: {
    vehicleStatus: [
      { required: true, message: "车辆状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询车辆信息列表 */
function getList() {
  loading.value = true;
  listVehicle(queryParams.value).then(response => {
    VehicleList.value = response.rows;
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
    licenseNumber: null,
    vehicleType: null,
    Firm: null,
    Station: null,
    officeCode: null,
    vehicleStatus: null,
    serviceLife: null,
    capacity: null
  };
  proxy.resetForm("VehicleRef");
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
  title.value = "添加车辆信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getVehicle(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改车辆信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["VehicleRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateVehicle(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addVehicle(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除车辆信息编号为"' + _pkIds + '"的数据项？').then(function() {
    return delVehicle(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/Vehicle/export', {
    ...queryParams.value
  }, `Vehicle_${new Date().getTime()}.xlsx`)
}

getList();
</script>
