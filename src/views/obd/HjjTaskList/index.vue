<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="任务编号" prop="taskNo">
        <el-input
          v-model="queryParams.taskNo"
          placeholder="请输入任务编号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="taskDate">
        <el-input
          v-model="queryParams.taskDate"
          placeholder="请输入日期"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="断面/站点编码" prop="sectionCode">
        <el-input
          v-model="queryParams.sectionCode"
          placeholder="请输入断面/站点编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="断面/站点名称" prop="sectionName">
        <el-input
          v-model="queryParams.sectionName"
          placeholder="请输入断面/站点名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="Status">
        <el-select v-model="queryParams.Status" placeholder="请选择状态" clearable style="width: 200px">
          <el-option
            v-for="dict in sys_job_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运维公司" prop="companyCode">
        <el-input
          v-model="queryParams.companyCode"
          placeholder="请输入运维公司"
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
      <el-form-item label="采样车辆牌照" prop="vehicleLicence">
        <el-input
          v-model="queryParams.vehicleLicence"
          placeholder="请输入采样车辆牌照"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出发地点" prop="cfPlace">
        <el-input
          v-model="queryParams.cfPlace"
          placeholder="请输入出发地点"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出发时间" prop="cfTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.cfTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择出发时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到达距离" prop="arrivalDistance">
        <el-input
          v-model="queryParams.arrivalDistance"
          placeholder="请输入到达距离"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划路途时长" prop="plannedTravelDuration">
        <el-input
          v-model="queryParams.plannedTravelDuration"
          placeholder="请输入计划路途时长"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计完成作业时间" prop="plannedEndTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.plannedEndTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择预计完成作业时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="送样交接地点" prop="syPlace">
        <el-input
          v-model="queryParams.syPlace"
          placeholder="请输入送样交接地点"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计送样交接时间" prop="plannedSyTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.plannedSyTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择预计送样交接时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="排程时间" prop="apsTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.apsTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择排程时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="确认时间" prop="confirmTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.confirmTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择确认时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="确认人员" prop="confirmUser">
        <el-input
          v-model="queryParams.confirmUser"
          placeholder="请输入确认人员"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.auditTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择审核时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核人员" prop="auditUser">
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审核人员"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下达时间" prop="releaseTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.releaseTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择下达时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下达人员" prop="releaseUser">
        <el-input
          v-model="queryParams.releaseUser"
          placeholder="请输入下达人员"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="送样测站" prop="testStation">
        <el-input
          v-model="queryParams.testStation"
          placeholder="请输入送样测站"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采样打卡时间" prop="clockIn">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.clockIn"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择采样打卡时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="采样工单编号" prop="cyTaskNo">
        <el-input
          v-model="queryParams.cyTaskNo"
          placeholder="请输入采样工单编号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="样品封箱时间" prop="ypfxTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.ypfxTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择样品封箱时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际送样交接时间" prop="actualSyTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.actualSyTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择实际送样交接时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="运输车辆牌照" prop="transportLicence">
        <el-input
          v-model="queryParams.transportLicence"
          placeholder="请输入运输车辆牌照"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运输工单编号" prop="transportTaskNo">
        <el-input
          v-model="queryParams.transportTaskNo"
          placeholder="请输入运输工单编号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计到达测站时间" prop="plannedTestStationTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.plannedTestStationTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择预计到达测站时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际到达测站时间" prop="actualTestStationTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.actualTestStationTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择实际到达测站时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="样品测试结束时间" prop="testResultTime">
        <el-date-picker clearable style="width: 200px"
          v-model="queryParams.testResultTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择样品测试结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="测站工单编号" prop="testTaskNo">
        <el-input
          v-model="queryParams.testTaskNo"
          placeholder="请输入测站工单编号"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作流" prop="docId">
        <el-input
          v-model="queryParams.docId"
          placeholder="请输入工作流"
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
          v-hasPermi="['obd:HjjTaskList:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:HjjTaskList:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:HjjTaskList:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:HjjTaskList:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="HjjTaskListList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:HjjTaskList:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:HjjTaskList:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="taskNo" />
      <el-table-column label="日期" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="taskDate" />
      <el-table-column label="断面/站点编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionCode" />
      <el-table-column label="断面/站点名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionName" />
      <el-table-column label="状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="Status">
        <template #default="scope">
          <dict-tag :options="sys_job_status" :value="scope.row.Status"/>
        </template>
      </el-table-column>
      <el-table-column label="运维公司" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="companyCode" />
      <el-table-column label="组长" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="teamLeader" />
      <el-table-column label="组员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="teamMembers" />
      <el-table-column label="采样车辆牌照" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="vehicleLicence" />
      <el-table-column label="出发地点" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="cfPlace" />
      <el-table-column label="出发时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="cfTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.cfTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达距离" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="arrivalDistance" />
      <el-table-column label="计划路途时长" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedTravelDuration" />
      <el-table-column label="计划作业时长" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedWorkDuration" />
      <el-table-column label="预计开始作业时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedStartTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.plannedStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计完成作业时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedEndTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.plannedEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送样交接地点" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="syPlace" />
      <el-table-column label="预计送样交接时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedSyTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.plannedSyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排程时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="apsTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.apsTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="confirmTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.confirmTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认人员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="confirmUser" />
      <el-table-column label="审核时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="auditTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="auditUser" />
      <el-table-column label="下达时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="releaseTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.releaseTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下达人员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="releaseUser" />
      <el-table-column label="送样测站" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="testStation" />
      <el-table-column label="采样打卡时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="clockIn" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.clockIn, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采样工单编号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="cyTaskNo" />
      <el-table-column label="样品封箱时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="ypfxTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.ypfxTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际送样交接时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="actualSyTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.actualSyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运输人员" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="transportUser" />
      <el-table-column label="运输车辆牌照" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="transportLicence" />
      <el-table-column label="运输工单编号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="transportTaskNo" />
      <el-table-column label="预计到达测站时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="plannedTestStationTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.plannedTestStationTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际到达测站时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="actualTestStationTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.actualTestStationTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="样品测试结束时间" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="testResultTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.testResultTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测站工单编号" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="testTaskNo" />
      <el-table-column label="测样结果" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="testResult" />
      <el-table-column label="任务状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="cyTaskStatus" />
      <el-table-column label="工作流" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="docId" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改水样采样跟踪对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="HjjTaskListRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务编号" prop="taskNo">
          <el-input v-model="form.taskNo" placeholder="请输入任务编号" />
        </el-form-item>
        <el-form-item label="日期" prop="taskDate">
          <el-input v-model="form.taskDate" placeholder="请输入日期" />
        </el-form-item>
        <el-form-item label="断面/站点编码" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入断面/站点编码" />
        </el-form-item>
        <el-form-item label="断面/站点名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入断面/站点名称" />
        </el-form-item>
        <el-form-item label="状态" prop="Status">
          <el-radio-group v-model="form.Status">
            <el-radio
              v-for="dict in sys_job_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务内容">
          <editor v-model="form.taskContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="运维公司" prop="companyCode">
          <el-input v-model="form.companyCode" placeholder="请输入运维公司" />
        </el-form-item>
        <el-form-item label="组长" prop="teamLeader">
          <el-input v-model="form.teamLeader" placeholder="请输入组长" />
        </el-form-item>
        <el-form-item label="组员" prop="teamMembers">
          <el-input v-model="form.teamMembers" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="采样车辆牌照" prop="vehicleLicence">
          <el-input v-model="form.vehicleLicence" placeholder="请输入采样车辆牌照" />
        </el-form-item>
        <el-form-item label="出发地点" prop="cfPlace">
          <el-input v-model="form.cfPlace" placeholder="请输入出发地点" />
        </el-form-item>
        <el-form-item label="出发时间" prop="cfTime">
          <el-date-picker clearable
            v-model="form.cfTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择出发时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到达距离" prop="arrivalDistance">
          <el-input v-model="form.arrivalDistance" placeholder="请输入到达距离" />
        </el-form-item>
        <el-form-item label="计划路途时长" prop="plannedTravelDuration">
          <el-input v-model="form.plannedTravelDuration" placeholder="请输入计划路途时长" />
        </el-form-item>
        <el-form-item label="计划作业时长" prop="plannedWorkDuration">
          <el-input v-model="form.plannedWorkDuration" placeholder="请输入计划作业时长" />
        </el-form-item>
        <el-form-item label="预计开始作业时间" prop="plannedStartTime">
          <el-date-picker clearable
            v-model="form.plannedStartTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择预计开始作业时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计完成作业时间" prop="plannedEndTime">
          <el-date-picker clearable
            v-model="form.plannedEndTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择预计完成作业时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="送样交接地点" prop="syPlace">
          <el-input v-model="form.syPlace" placeholder="请输入送样交接地点" />
        </el-form-item>
        <el-form-item label="预计送样交接时间" prop="plannedSyTime">
          <el-date-picker clearable
            v-model="form.plannedSyTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择预计送样交接时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="送样测站" prop="testStation">
          <el-input v-model="form.testStation" placeholder="请输入送样测站" />
        </el-form-item>
        <el-form-item label="采样打卡时间" prop="clockIn">
          <el-date-picker clearable
            v-model="form.clockIn"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择采样打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采样工单编号" prop="cyTaskNo">
          <el-input v-model="form.cyTaskNo" placeholder="请输入采样工单编号" />
        </el-form-item>
        <el-form-item label="样品封箱时间" prop="ypfxTime">
          <el-date-picker clearable
            v-model="form.ypfxTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择样品封箱时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际送样交接时间" prop="actualSyTime">
          <el-date-picker clearable
            v-model="form.actualSyTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择实际送样交接时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="运输人员" prop="transportUser">
          <el-input v-model="form.transportUser" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="运输车辆牌照" prop="transportLicence">
          <el-input v-model="form.transportLicence" placeholder="请输入运输车辆牌照" />
        </el-form-item>
        <el-form-item label="运输工单编号" prop="transportTaskNo">
          <el-input v-model="form.transportTaskNo" placeholder="请输入运输工单编号" />
        </el-form-item>
        <el-form-item label="预计到达测站时间" prop="plannedTestStationTime">
          <el-date-picker clearable
            v-model="form.plannedTestStationTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择预计到达测站时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际到达测站时间" prop="actualTestStationTime">
          <el-date-picker clearable
            v-model="form.actualTestStationTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择实际到达测站时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="样品测试结束时间" prop="testResultTime">
          <el-date-picker clearable
            v-model="form.testResultTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择样品测试结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="测站工单编号" prop="testTaskNo">
          <el-input v-model="form.testTaskNo" placeholder="请输入测站工单编号" />
        </el-form-item>
        <el-form-item label="测样结果" prop="testResult">
          <el-input v-model="form.testResult" type="textarea" placeholder="请输入内容" />
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

<script setup name="HjjTaskList">
import { listHjjTaskList, getHjjTaskList, delHjjTaskList, addHjjTaskList, updateHjjTaskList } from "@/api/obd/HjjTaskList";

const { proxy } = getCurrentInstance();
const { sys_job_status } = proxy.useDict('sys_job_status');

const HjjTaskListList = ref([]);
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
    taskNo: null,
    taskDate: null,
    sectionCode: null,
    sectionName: null,
    Status: null,
    companyCode: null,
    teamLeader: null,
    teamMembers: null,
    vehicleLicence: null,
    cfPlace: null,
    cfTime: null,
    arrivalDistance: null,
    plannedTravelDuration: null,
    plannedEndTime: null,
    syPlace: null,
    plannedSyTime: null,
    apsTime: null,
    confirmTime: null,
    confirmUser: null,
    auditTime: null,
    auditUser: null,
    releaseTime: null,
    releaseUser: null,
    testStation: null,
    clockIn: null,
    cyTaskNo: null,
    ypfxTime: null,
    actualSyTime: null,
    transportUser: null,
    transportLicence: null,
    transportTaskNo: null,
    plannedTestStationTime: null,
    actualTestStationTime: null,
    testResultTime: null,
    testTaskNo: null,
    testResult: null,
    cyTaskStatus: null,
    docId: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询水样采样跟踪列表 */
function getList() {
  loading.value = true;
  listHjjTaskList(queryParams.value).then(response => {
    HjjTaskListList.value = response.rows;
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
    taskNo: null,
    taskDate: null,
    sectionCode: null,
    sectionName: null,
    Status: null,
    taskContent: null,
    companyCode: null,
    teamLeader: null,
    teamMembers: null,
    vehicleLicence: null,
    cfPlace: null,
    cfTime: null,
    arrivalDistance: null,
    plannedTravelDuration: null,
    plannedWorkDuration: null,
    plannedStartTime: null,
    plannedEndTime: null,
    syPlace: null,
    plannedSyTime: null,
    apsTime: null,
    confirmTime: null,
    confirmUser: null,
    auditTime: null,
    auditUser: null,
    releaseTime: null,
    releaseUser: null,
    testStation: null,
    clockIn: null,
    cyTaskNo: null,
    ypfxTime: null,
    actualSyTime: null,
    transportUser: null,
    transportLicence: null,
    transportTaskNo: null,
    plannedTestStationTime: null,
    actualTestStationTime: null,
    testResultTime: null,
    testTaskNo: null,
    testResult: null,
    cyTaskStatus: null,
    docId: null
  };
  proxy.resetForm("HjjTaskListRef");
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
  title.value = "添加水样采样跟踪";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getHjjTaskList(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改水样采样跟踪";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["HjjTaskListRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateHjjTaskList(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addHjjTaskList(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除水样采样跟踪编号为"' + _pkIds + '"的数据项？').then(function() {
    return delHjjTaskList(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/HjjTaskList/export', {
    ...queryParams.value
  }, `HjjTaskList_${new Date().getTime()}.xlsx`)
}

getList();
</script>
