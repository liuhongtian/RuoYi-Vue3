<template>
  <div class="app-container">
    <el-dialog v-model="dialogVisible" @open="onOpen" @close="onClose" title="Dialog Titile">
      <el-form ref="formRef" :model="formData" :rules="rules" size="default" label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable
            prefix-icon='Cellphone' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="多行文本" prop="field101">
          <el-input v-model="formData.field101" type="textarea" placeholder="请输入多行文本"
            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="计数器" prop="field102">
          <el-input-number v-model="formData.field102" placeholder="计数器"></el-input-number>
        </el-form-item>
        <el-form-item label="密码" prop="field103">
          <el-input v-model="formData.field103" type="password" placeholder="请输入密码" clearable show-password
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="开关" prop="field104" required>
          <el-switch v-model="formData.field104"></el-switch>
        </el-form-item>
        <el-form-item label="单选框组" prop="field105">
          <el-radio-group v-model="formData.field105" size="default">
            <el-radio v-for="(item, index) in field105Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期范围" prop="field106">
          <el-date-picker type="daterange" v-model="formData.field106" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" :style="{width: '100%'}" start-placeholder="开始日期" end-placeholder="结束日期"
            range-separator="至" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="日期选择" prop="field107">
          <el-date-picker v-model="formData.field107" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="按钮" prop="field108">
          <el-button type="primary" icon="Search" size="default"> 主要按钮 </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
const {
  proxy
} = getCurrentInstance()
const formRef = ref()
const data = reactive({
  formData: {
    mobile: '',
    field101: undefined,
    field102: undefined,
    field103: undefined,
    field104: false,
    field105: 0,
    field106: null,
    field107: null,
    field108: undefined,
  },
  rules: {
    mobile: [{
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    }, {
      pattern: new RegExp(/^1(3|4|5|7|8|9)\d{9}$/),
      message: '手机号格式错误',
      trigger: 'blur'
    }],
    field101: [{
      required: true,
      message: '请输入多行文本',
      trigger: 'blur'
    }],
    field102: [{
      required: true,
      message: '计数器',
      trigger: 'blur'
    }],
    field103: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }],
    field105: [{
      required: true,
      message: '单选框组不能为空',
      trigger: 'change'
    }],
    field106: [{
      required: true,
      message: '日期范围不能为空',
      trigger: 'change'
    }],
    field107: [{
      required: true,
      message: '请选择日期选择',
      trigger: 'change'
    }],
  }
})
const {
  formData,
  rules
} = toRefs(data)
const field105Options = ref([{
  "label": "选项一",
  "value": 1
}, {
  "label": "选项二",
  "value": 2
}])
// 弹窗设置
const dialogVisible = defineModel('visible')
// 弹窗确认回调
const emit = defineEmits(['confirm'])
/**
 * @name: 弹窗打开后执行
 * @description: 弹窗打开后执行方法
 * @return {*}
 */
function onOpen() {}
/**
 * @name: 弹窗关闭时执行
 * @description: 弹窗关闭方法，重置表单
 * @return {*}
 */
function onClose() {
  formRef.value.resetFields()
}
/**
 * @name: 弹窗取消
 * @description: 弹窗取消方法
 * @return {*}
 */
function close() {
  dialogVisible.value = false
}
/**
 * @name: 弹窗表单提交
 * @description: 弹窗表单提交方法
 * @return {*}
 */
function handelConfirm() {
  formRef.value.validate((valid) => {
    if (!valid) return
    // TODO 提交表单
    close()
    // 回调父级组件
    emit('confirm')
  })
}

</script>
<style>
</style>
