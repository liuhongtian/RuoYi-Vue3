<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['kanbanview:webhooklogview:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="webhooklogviewList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column width="100px" label="日志ID" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="id" />
      <el-table-column width="100px" label="处理状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="status">
        <template #default="scope">
          <dict-tag :options="wekan_webhook_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column style="text-align: left;" label="通知内容" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="payload" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script setup name="Webhooklogview">
import { listWebhooklogview, getWebhooklogview, delWebhooklogview, addWebhooklogview, updateWebhooklogview } from "@/api/kanbanview/webhooklogview";

const { proxy } = getCurrentInstance();
const { wekan_webhook_status } = proxy.useDict('wekan_webhook_status');

const webhooklogviewList = ref([]);
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
    type: null,
    payload: null,
    status: null,
    errorMsg: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询Wekan WebHook日志查看列表 */
function getList() {
  loading.value = true;
  listWebhooklogview(queryParams.value).then(response => {
    webhooklogviewList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 处理排序 */
function handleSortChange(column) {
  queryParams.value.orderByColumn = column.prop; //查询字段是表格中字段名字
  queryParams.value.isAsc = column.order; //动态取值排序顺序
  getList();
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('kanbanview/webhooklogview/export', {
    ...queryParams.value
  }, `webhooklogview_${new Date().getTime()}.xlsx`)
}

getList();
</script>
