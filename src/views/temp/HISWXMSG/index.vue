<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="消息接收人" prop="recvUser">
        <el-input
          v-model="queryParams.recvUser"
          placeholder="请输入消息接收人"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接收人系统帐号" prop="ruoyiUser">
        <el-input
          v-model="queryParams.ruoyiUser"
          placeholder="请输入接收人系统帐号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.sendTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择发送时间">
        </el-date-picker>
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
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['temp:HISWXMSG:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['temp:HISWXMSG:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="HISWXMSGList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['temp:HISWXMSG:edit']">查看</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['temp:HISWXMSG:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="主键" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="pkId" />
      <el-table-column label="消息接收人" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="recvUser" />
      <el-table-column label="接收人系统帐号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="ruoyiUser" />
      <el-table-column label="消息内容" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="messageContent" />
      <el-table-column label="创建时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sendTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.sendTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="operateStatus" />
      <el-table-column label="发送状" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="errcode" />
      <el-table-column label="错误信息" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="errmsg" />
      <el-table-column label="消息ID" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="msgid" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改消息历史对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="HISWXMSGRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="消息接收人" prop="recvUser">
          <el-input v-model="form.recvUser" placeholder="请输入消息接收人" />
        </el-form-item>
        <el-form-item label="消息内容">
          <editor v-model="form.messageContent" :min-height="192"/>
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

<script setup name="HISWXMSG">
import { listHISWXMSG, getHISWXMSG, delHISWXMSG, addHISWXMSG, updateHISWXMSG } from "@/api/temp/HISWXMSG";

const { proxy } = getCurrentInstance();

const HISWXMSGList = ref([]);
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
    recvUser: null,
    ruoyiUser: null,
    createTime: null,
    sendTime: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询消息历史列表 */
function getList() {
  loading.value = true;
  listHISWXMSG(queryParams.value).then(response => {
    HISWXMSGList.value = response.rows;
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
    recvUser: null,
    ruoyiUser: null,
    messageContent: null,
    messageType: null,
    createTime: null,
    sendTime: null,
    operateStatus: null,
    errcode: null,
    errmsg: null,
    msgid: null
  };
  proxy.resetForm("HISWXMSGRef");
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
  title.value = "添加消息历史";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getHISWXMSG(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改消息历史";
  });
}

/** 提交按钮 */
function submitForm() {
  open.value = false;
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _pkIds = row.pkId || ids.value;
  proxy.$modal.confirm('是否确认删除消息历史编号为"' + _pkIds + '"的数据项？').then(function() {
    return delHISWXMSG(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('temp/HISWXMSG/export', {
    ...queryParams.value
  }, `HISWXMSG_${new Date().getTime()}.xlsx`)
}

getList();
</script>
