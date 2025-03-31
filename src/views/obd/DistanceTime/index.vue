<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="出发点名称" prop="departureName">
        <el-input
          v-model="queryParams.departureName"
          placeholder="请输入出发点名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出发点经纬度" prop="departureLatiLong">
        <el-input
          v-model="queryParams.departureLatiLong"
          placeholder="请输入出发点经纬度"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出发点属性" prop="departureType">
        <el-select v-model="queryParams.departureType" placeholder="请选择出发点属性" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_place_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="到达点名称" prop="arriveName">
        <el-input
          v-model="queryParams.arriveName"
          placeholder="请输入到达点名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到达点经纬度" prop="arriveLatiLong">
        <el-input
          v-model="queryParams.arriveLatiLong"
          placeholder="请输入到达点经纬度"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到达点属性" prop="arriveType">
        <el-select v-model="queryParams.arriveType" placeholder="请选择到达点属性" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_place_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="距离" prop="distance">
        <el-input
          v-model="queryParams.distance"
          placeholder="请输入距离"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所需时间" prop="timeRequired">
        <el-input
          v-model="queryParams.timeRequired"
          placeholder="请输入所需时间"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据获取时间" prop="dataTime">
        <el-input
          v-model="queryParams.dataTime"
          placeholder="请输入数据获取时间"
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
          v-hasPermi="['obd:DistanceTime:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:DistanceTime:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:DistanceTime:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:DistanceTime:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="DistanceTimeList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:DistanceTime:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:DistanceTime:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="出发点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="departureName" />
      <el-table-column label="出发点经纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="departureLatiLong" />
      <el-table-column label="出发点属性" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="departureType">
        <template #default="scope">
          <dict-tag :options="obd_place_type" :value="scope.row.departureType"/>
        </template>
      </el-table-column>
      <el-table-column label="到达点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="arriveName" />
      <el-table-column label="到达点经纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="arriveLatiLong" />
      <el-table-column label="到达点属性" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="arriveType">
        <template #default="scope">
          <dict-tag :options="obd_place_type" :value="scope.row.arriveType"/>
        </template>
      </el-table-column>
      <el-table-column label="距离" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="distance" />
      <el-table-column label="所需时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="timeRequired" />
      <el-table-column label="数据获取时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="dataTime" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改距离时间对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="DistanceTimeRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="出发点名称" prop="departureName">
          <el-input v-model="form.departureName" placeholder="请输入出发点名称" />
        </el-form-item>
        <el-form-item label="出发点经纬度" prop="departureLatiLong">
          <el-input v-model="form.departureLatiLong" placeholder="请输入出发点经纬度" />
        </el-form-item>
        <el-form-item label="出发点属性" prop="departureType">
          <el-select v-model="form.departureType" placeholder="请选择出发点属性">
            <el-option
              v-for="dict in obd_place_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到达点名称" prop="arriveName">
          <el-input v-model="form.arriveName" placeholder="请输入到达点名称" />
        </el-form-item>
        <el-form-item label="到达点经纬度" prop="arriveLatiLong">
          <el-input v-model="form.arriveLatiLong" placeholder="请输入到达点经纬度" />
        </el-form-item>
        <el-form-item label="到达点属性" prop="arriveType">
          <el-select v-model="form.arriveType" placeholder="请选择到达点属性">
            <el-option
              v-for="dict in obd_place_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="距离" prop="distance">
          <el-input v-model="form.distance" placeholder="请输入距离" />
        </el-form-item>
        <el-form-item label="所需时间" prop="timeRequired">
          <el-input v-model="form.timeRequired" placeholder="请输入所需时间" />
        </el-form-item>
        <el-form-item label="数据获取时间" prop="dataTime">
          <el-input v-model="form.dataTime" placeholder="请输入数据获取时间" />
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

<script setup name="DistanceTime">
import { listDistanceTime, getDistanceTime, delDistanceTime, addDistanceTime, updateDistanceTime } from "@/api/obd/DistanceTime";

const { proxy } = getCurrentInstance();
const { obd_place_type } = proxy.useDict('obd_place_type');

const DistanceTimeList = ref([]);
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
    departureName: null,
    departureLatiLong: null,
    departureType: null,
    arriveName: null,
    arriveLatiLong: null,
    arriveType: null,
    distance: null,
    timeRequired: null,
    dataTime: null
  },
  rules: {
    distance: [
      { required: true, message: "距离不能为空", trigger: "blur" }
    ],
    timeRequired: [
      { required: true, message: "所需时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询距离时间列表 */
function getList() {
  loading.value = true;
  listDistanceTime(queryParams.value).then(response => {
    DistanceTimeList.value = response.rows;
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
    departureName: null,
    departureLatiLong: null,
    departureType: null,
    arriveName: null,
    arriveLatiLong: null,
    arriveType: null,
    distance: null,
    timeRequired: null,
    dataTime: null
  };
  proxy.resetForm("DistanceTimeRef");
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
  title.value = "添加距离时间";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getDistanceTime(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改距离时间";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["DistanceTimeRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateDistanceTime(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addDistanceTime(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除距离时间编号为"' + _pkIds + '"的数据项？').then(function() {
    return delDistanceTime(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/DistanceTime/export', {
    ...queryParams.value
  }, `DistanceTime_${new Date().getTime()}.xlsx`)
}

getList();
</script>
