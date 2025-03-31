<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="断面编码" prop="sectionCode">
        <el-input
          v-model="queryParams.sectionCode"
          placeholder="请输入断面编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="断面名称" prop="sectionName">
        <el-input
          v-model="queryParams.sectionName"
          placeholder="请输入断面名称"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在流域" prop="drainageBasin">
        <el-select v-model="queryParams.drainageBasin" placeholder="请选择所在流域" clearable style="width: 200px">
          <el-option
            v-for="dict in River_BasinTCIDRiver_Basin_NameTCIDRiver_Basin_CodeTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在水体" prop="waterBody">
        <el-select v-model="queryParams.waterBody" placeholder="请选择所在水体" clearable style="width: 200px">
          <el-option
            v-for="dict in Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="汇入水体" prop="importWb">
        <el-select v-model="queryParams.importWb" placeholder="请选择汇入水体" clearable style="width: 200px">
          <el-option
            v-for="dict in Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="断面类型" prop="wbType">
        <el-select v-model="queryParams.wbType" placeholder="请选择断面类型" clearable style="width: 200px">
          <el-option
            v-for="dict in section_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="特殊属性" prop="specialProperty">
        <el-input
          v-model="queryParams.specialProperty"
          placeholder="请输入特殊属性"
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
      <el-form-item label="考核省" prop="assessProvince">
        <el-select v-model="queryParams.assessProvince" placeholder="请选择考核省" clearable style="width: 200px">
          <el-option
            v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考核地市" prop="assessCity">
        <el-select v-model="queryParams.assessCity" placeholder="请选择考核地市" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_city"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在省" prop="locationProvince">
        <el-select v-model="queryParams.locationProvince" placeholder="请选择所在省" clearable style="width: 200px">
          <el-option
            v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在地市" prop="locationCity">
        <el-select v-model="queryParams.locationCity" placeholder="请选择所在地市" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_city"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否建有自动站" prop="hasAutoSite">
        <el-select v-model="queryParams.hasAutoSite" placeholder="请选择是否建有自动站" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_true_or_false"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="自动站编码" prop="autoSiteCode">
        <el-input
          v-model="queryParams.autoSiteCode"
          placeholder="请输入自动站编码"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否需要盐度指标" prop="hasSalinityIndicator">
        <el-select v-model="queryParams.hasSalinityIndicator" placeholder="请选择是否需要盐度指标" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_true_or_false"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="采样点数" prop="sampledPoints">
        <el-input
          v-model="queryParams.sampledPoints"
          placeholder="请输入采样点数"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采样方式" prop="sampledMethod">
        <el-select v-model="queryParams.sampledMethod" placeholder="请选择采样方式" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_sample_method"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否自采自测" prop="isSelfSampling">
        <el-select v-model="queryParams.isSelfSampling" placeholder="请选择是否自采自测" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_true_or_false"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="水样送达时限" prop="sampleAvaliableLimit">
        <el-input
          v-model="queryParams.sampleAvaliableLimit"
          placeholder="请输入水样送达时限"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评估采样时" prop="sampleAssessTime">
        <el-input
          v-model="queryParams.sampleAssessTime"
          placeholder="请输入评估采样时"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采样时间波动系数" prop="samplingTimeFc">
        <el-input
          v-model="queryParams.samplingTimeFc"
          placeholder="请输入采样时间波动系数"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="估计采样成本" prop="estimateSamplingCosts">
        <el-input
          v-model="queryParams.estimateSamplingCosts"
          placeholder="请输入估计采样成本"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采样成本波动系数" prop="samplingCostsFc">
        <el-input
          v-model="queryParams.samplingCostsFc"
          placeholder="请输入采样成本波动系数"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否感潮断面" prop="isSectionSt">
        <el-select v-model="queryParams.isSectionSt" placeholder="请选择是否感潮断面" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_true_or_false"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="包件" prop="packageCode">
        <el-input
          v-model="queryParams.packageCode"
          placeholder="请输入包件"
          clearable style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="sectionStatus">
        <el-select v-model="queryParams.sectionStatus" placeholder="请选择状态" clearable style="width: 200px">
          <el-option
            v-for="dict in obd_site_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否不间断" prop="isUninterrupted">
        <el-select v-model="queryParams.isUninterrupted" placeholder="请选择是否不间断" clearable style="width: 200px">
          <el-option
            v-for="dict in ini_true_or_false"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运维公司" prop="omCompanyId">
        <el-select v-model="queryParams.omCompanyId" placeholder="请选择运维公司" clearable style="width: 200px">
          <el-option
            v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="waterCode">
        <el-input
          v-model="queryParams.waterCode"
          placeholder="请输入"
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
          v-hasPermi="['obd:RiverSection:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['obd:RiverSection:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['obd:RiverSection:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['obd:RiverSection:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="RiverSectionList" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="left">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['obd:RiverSection:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['obd:RiverSection:remove']">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="断面编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionCode" />
      <el-table-column label="断面名称" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionName" />
      <el-table-column label="所在流域" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="drainageBasin">
        <template #default="scope">
          <dict-tag :options="River_BasinTCIDRiver_Basin_NameTCIDRiver_Basin_CodeTCIDPK_ID" :value="scope.row.drainageBasin"/>
        </template>
      </el-table-column>
      <el-table-column label="所在水体" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="waterBody">
        <template #default="scope">
          <dict-tag :options="Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID" :value="scope.row.waterBody"/>
        </template>
      </el-table-column>
      <el-table-column label="汇入水体" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="importWb">
        <template #default="scope">
          <dict-tag :options="Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID" :value="scope.row.importWb"/>
        </template>
      </el-table-column>
      <el-table-column label="断面类型" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="wbType">
        <template #default="scope">
          <dict-tag :options="section_type" :value="scope.row.wbType"/>
        </template>
      </el-table-column>
      <el-table-column label="特殊属性" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="specialProperty" />
      <el-table-column label="经度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="longitude" />
      <el-table-column label="纬度" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="latitude" />
      <el-table-column label="考核省" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="assessProvince">
        <template #default="scope">
          <dict-tag :options="Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No" :value="scope.row.assessProvince"/>
        </template>
      </el-table-column>
      <el-table-column label="考核地市" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="assessCity">
        <template #default="scope">
          <dict-tag :options="ini_city" :value="scope.row.assessCity"/>
        </template>
      </el-table-column>
      <el-table-column label="所在省" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="locationProvince">
        <template #default="scope">
          <dict-tag :options="Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No" :value="scope.row.locationProvince"/>
        </template>
      </el-table-column>
      <el-table-column label="所在地市" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="locationCity">
        <template #default="scope">
          <dict-tag :options="ini_city" :value="scope.row.locationCity"/>
        </template>
      </el-table-column>
      <el-table-column label="是否建有自动站" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="hasAutoSite">
        <template #default="scope">
          <dict-tag :options="ini_true_or_false" :value="scope.row.hasAutoSite"/>
        </template>
      </el-table-column>
      <el-table-column label="自动站编码" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="autoSiteCode" />
      <el-table-column label="是否需要盐度指标" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="hasSalinityIndicator">
        <template #default="scope">
          <dict-tag :options="ini_true_or_false" :value="scope.row.hasSalinityIndicator"/>
        </template>
      </el-table-column>
      <el-table-column label="采样点数" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sampledPoints" />
      <el-table-column label="采样方式" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sampledMethod">
        <template #default="scope">
          <dict-tag :options="obd_sample_method" :value="scope.row.sampledMethod"/>
        </template>
      </el-table-column>
      <el-table-column label="是否自采自测" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="isSelfSampling">
        <template #default="scope">
          <dict-tag :options="ini_true_or_false" :value="scope.row.isSelfSampling"/>
        </template>
      </el-table-column>
      <el-table-column label="水样送达时限" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sampleAvaliableLimit" />
      <el-table-column label="评估采样时" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sampleAssessTime" />
      <el-table-column label="采样时间波动系数" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="samplingTimeFc" />
      <el-table-column label="估计采样成本" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="estimateSamplingCosts" />
      <el-table-column label="采样成本波动系数" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="samplingCostsFc" />
      <el-table-column label="是否感潮断面" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="isSectionSt">
        <template #default="scope">
          <dict-tag :options="ini_true_or_false" :value="scope.row.isSectionSt"/>
        </template>
      </el-table-column>
      <el-table-column label="包件" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="packageCode" />
      <el-table-column label="状态" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionStatus">
        <template #default="scope">
          <dict-tag :options="obd_site_status" :value="scope.row.sectionStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="是否不间断" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="isUninterrupted">
        <template #default="scope">
          <dict-tag :options="ini_true_or_false" :value="scope.row.isUninterrupted"/>
        </template>
      </el-table-column>
      <el-table-column label="运维公司" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="omCompanyId">
        <template #default="scope">
          <dict-tag :options="OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID" :value="scope.row.omCompanyId"/>
        </template>
      </el-table-column>
      <el-table-column label="断面属性" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="sectionProperty" />
      <el-table-column label="" align="center" :sort-orders="['descending', 'ascending']" sortable="custom" prop="waterCode" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改断面对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="RiverSectionRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="断面编码" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入断面编码" />
        </el-form-item>
        <el-form-item label="断面名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入断面名称" />
        </el-form-item>
        <el-form-item label="所在流域" prop="drainageBasin">
          <el-select v-model="form.drainageBasin" placeholder="请选择所在流域">
            <el-option
              v-for="dict in River_BasinTCIDRiver_Basin_NameTCIDRiver_Basin_CodeTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在水体" prop="waterBody">
          <el-select v-model="form.waterBody" placeholder="请选择所在水体">
            <el-option
              v-for="dict in Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汇入水体" prop="importWb">
          <el-select v-model="form.importWb" placeholder="请选择汇入水体">
            <el-option
              v-for="dict in Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="断面类型" prop="wbType">
          <el-select v-model="form.wbType" placeholder="请选择断面类型">
            <el-option
              v-for="dict in section_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊属性" prop="specialProperty">
          <el-input v-model="form.specialProperty" placeholder="请输入特殊属性" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="考核省" prop="assessProvince">
          <el-select v-model="form.assessProvince" placeholder="请选择考核省">
            <el-option
              v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核地市" prop="assessCity">
          <el-select v-model="form.assessCity" placeholder="请选择考核地市">
            <el-option
              v-for="dict in ini_city"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在省" prop="locationProvince">
          <el-select v-model="form.locationProvince" placeholder="请选择所在省">
            <el-option
              v-for="dict in Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地市" prop="locationCity">
          <el-select v-model="form.locationCity" placeholder="请选择所在地市">
            <el-option
              v-for="dict in ini_city"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否建有自动站" prop="hasAutoSite">
          <el-radio-group v-model="form.hasAutoSite">
            <el-radio
              v-for="dict in ini_true_or_false"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动站编码" prop="autoSiteCode">
          <el-input v-model="form.autoSiteCode" placeholder="请输入自动站编码" />
        </el-form-item>
        <el-form-item label="是否需要盐度指标" prop="hasSalinityIndicator">
          <el-radio-group v-model="form.hasSalinityIndicator">
            <el-radio
              v-for="dict in ini_true_or_false"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="采样点数" prop="sampledPoints">
          <el-input v-model="form.sampledPoints" placeholder="请输入采样点数" />
        </el-form-item>
        <el-form-item label="采样方式" prop="sampledMethod">
          <el-select v-model="form.sampledMethod" placeholder="请选择采样方式">
            <el-option
              v-for="dict in obd_sample_method"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否自采自测" prop="isSelfSampling">
          <el-radio-group v-model="form.isSelfSampling">
            <el-radio
              v-for="dict in ini_true_or_false"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="水样送达时限" prop="sampleAvaliableLimit">
          <el-input v-model="form.sampleAvaliableLimit" placeholder="请输入水样送达时限" />
        </el-form-item>
        <el-form-item label="评估采样时" prop="sampleAssessTime">
          <el-input v-model="form.sampleAssessTime" placeholder="请输入评估采样时" />
        </el-form-item>
        <el-form-item label="采样时间波动系数" prop="samplingTimeFc">
          <el-input v-model="form.samplingTimeFc" placeholder="请输入采样时间波动系数" />
        </el-form-item>
        <el-form-item label="估计采样成本" prop="estimateSamplingCosts">
          <el-input v-model="form.estimateSamplingCosts" placeholder="请输入估计采样成本" />
        </el-form-item>
        <el-form-item label="采样成本波动系数" prop="samplingCostsFc">
          <el-input v-model="form.samplingCostsFc" placeholder="请输入采样成本波动系数" />
        </el-form-item>
        <el-form-item label="是否感潮断面" prop="isSectionSt">
          <el-radio-group v-model="form.isSectionSt">
            <el-radio
              v-for="dict in ini_true_or_false"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包件" prop="packageCode">
          <el-input v-model="form.packageCode" placeholder="请输入包件" />
        </el-form-item>
        <el-form-item label="状态" prop="sectionStatus">
          <el-radio-group v-model="form.sectionStatus">
            <el-radio
              v-for="dict in obd_site_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否不间断" prop="isUninterrupted">
          <el-radio-group v-model="form.isUninterrupted">
            <el-radio
              v-for="dict in ini_true_or_false"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运维公司" prop="omCompanyId">
          <el-select v-model="form.omCompanyId" placeholder="请选择运维公司">
            <el-option
              v-for="dict in OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="断面属性" prop="sectionProperty">
          <el-input v-model="form.sectionProperty" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="" prop="waterCode">
          <el-input v-model="form.waterCode" placeholder="请输入" />
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

<script setup name="RiverSection">
import { listRiverSection, getRiverSection, delRiverSection, addRiverSection, updateRiverSection } from "@/api/obd/RiverSection";

const { proxy } = getCurrentInstance();
const { section_type, Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID, Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No, River_BasinTCIDRiver_Basin_NameTCIDRiver_Basin_CodeTCIDPK_ID, ini_true_or_false, ini_city, obd_sample_method, obd_site_status, OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID } = proxy.useDict('section_type', 'Aquatic_InfoTCIDAquatic_NameTCIDAquatic_CodeTCIDPK_ID', 'Ini_ProvinceTCIDProvince_NameTCIDProvince_IDTCIDSeq_No', 'River_BasinTCIDRiver_Basin_NameTCIDRiver_Basin_CodeTCIDPK_ID', 'ini_true_or_false', 'ini_city', 'obd_sample_method', 'obd_site_status', 'OM_CompanyTCIDCompany_NameTCIDcompany_idTCIDPK_ID');

const RiverSectionList = ref([]);
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
    sectionCode: null,
    sectionName: null,
    drainageBasin: null,
    waterBody: null,
    importWb: null,
    wbType: null,
    specialProperty: null,
    longitude: null,
    latitude: null,
    assessProvince: null,
    assessCity: null,
    locationProvince: null,
    locationCity: null,
    hasAutoSite: null,
    autoSiteCode: null,
    hasSalinityIndicator: null,
    sampledPoints: null,
    sampledMethod: null,
    isSelfSampling: null,
    sampleAvaliableLimit: null,
    sampleAssessTime: null,
    samplingTimeFc: null,
    estimateSamplingCosts: null,
    samplingCostsFc: null,
    isSectionSt: null,
    packageCode: null,
    sectionStatus: null,
    isUninterrupted: null,
    omCompanyId: null,
    sectionProperty: null,
    waterCode: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询断面列表 */
function getList() {
  loading.value = true;
  listRiverSection(queryParams.value).then(response => {
    RiverSectionList.value = response.rows;
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
    sectionCode: null,
    sectionName: null,
    drainageBasin: null,
    waterBody: null,
    importWb: null,
    wbType: null,
    specialProperty: null,
    longitude: null,
    latitude: null,
    assessProvince: null,
    assessCity: null,
    locationProvince: null,
    locationCity: null,
    hasAutoSite: null,
    autoSiteCode: null,
    hasSalinityIndicator: null,
    sampledPoints: null,
    sampledMethod: null,
    isSelfSampling: null,
    sampleAvaliableLimit: null,
    sampleAssessTime: null,
    samplingTimeFc: null,
    estimateSamplingCosts: null,
    samplingCostsFc: null,
    isSectionSt: null,
    packageCode: null,
    sectionStatus: null,
    isUninterrupted: null,
    omCompanyId: null,
    sectionProperty: null,
    waterCode: null
  };
  proxy.resetForm("RiverSectionRef");
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
  title.value = "添加断面";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _pkId = row.pkId || ids.value
  getRiverSection(_pkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改断面";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["RiverSectionRef"].validate(valid => {
    if (valid) {
      if (form.value.pkId != null) {
        updateRiverSection(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addRiverSection(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除断面编号为"' + _pkIds + '"的数据项？').then(function() {
    return delRiverSection(_pkIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('obd/RiverSection/export', {
    ...queryParams.value
  }, `RiverSection_${new Date().getTime()}.xlsx`)
}

getList();
</script>
