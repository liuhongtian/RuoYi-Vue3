<template>
  <div>
    <v-form-designer ref="vfDesigner" :designer-config="designerConfig">
      <!-- 保存按钮 -->
      <el-button type="text" @click="saveFormJson"><i class="el-icon-s-promotion" />保存</el-button>
      <template>
      </template>

    </v-form-designer>

    <!--系统表单信息-->
    <el-dialog :title="formTitle" v-model="formOpen" width="500px" append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="表单名称" prop="formName">
          <el-input v-model="form.formName" placeholder="请输入表单名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="flowFormDesigner">
import { addForm, getForm, updateForm } from '@/api/flowable/form'
import { StrUtil } from '@/utils/StrUtil'

const { proxy } = getCurrentInstance();

const formOpen = ref(false)

const data = reactive({
  formTitle: '',
  // 表单校验
  rules: {
    formName: [
      { required: true, message: '表单名称不能为空', trigger: 'blur' },
    ],
  },
  // 表单参数
  form: {
    formId: null,
    formName: null,
    formContent: null,
    remark: null,
  },

  designerConfig: {
    generateSFCButston: true,
    exportCodeButton: false, //是否显示导出代码按钮
    toolbarMaxWidth: 450,
    toolbarMinWidth: 300, //设计器工具按钮栏最小宽度（单位像素）
    formHeader: false,
  }

})

const { formTitle, rules, form, designerConfig } = toRefs(data);

// 保存表单数据
function saveFormJson() {
  let formJson = proxy.$refs.vfDesigner.getFormJson()
  form.formContent = JSON.stringify(formJson)
  formOpen.value = true
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['formRef'].validate((valid) => {
    if (valid) {
      let formName = '';
      let remark = '';
      proxy.$refs['formRef'].fields.forEach(field => {
        if (field.prop === 'formName') {
          formName = field.fieldValue
        } else if (field.prop === 'remark') {
          remark = field.fieldValue
        }
      })
      form.formName = formName
      form.remark = remark
      if (form.formId != null) {
        updateForm(form).then((response) => {
          proxy.$modal.msgSuccess('修改成功')
          formOpen.value = false
        })
      } else {
        addForm(form).then((response) => {
          proxy.$modal.msgSuccess('新增成功')
          formOpen.value = false
        })
      }
      // 关闭当前标签页并返回上个页面
      const obj = { path: '/flowable/form', query: { t: Date.now() } }
      proxy.$tab.closeOpenPage(obj)
    }
  })
}

// 取消按钮
function cancel() {
  formOpen.value = false
}

onMounted(() => {
  form.formId = proxy.$route.query && proxy.$route.query.formId
  if (StrUtil.isNotBlank(form.formId)) {
    getForm(form.formId).then((res) => {
      proxy.$nextTick(() => {
        // 加载表单json数据
        proxy.$refs.vfDesigner.setFormJson(JSON.parse(res.data.formContent))
      })
      proxy.form = res.data
    })
  } else {
    proxy.$nextTick(() => {
      // 加载表单json数据
      proxy.$refs.vfDesigner.setFormJson({
        widgetList: [],
        formConfig: {
          modelName: 'formData',
          refName: 'vForm',
          rulesName: 'rules',
          labelWidth: 80,
          labelPosition: 'left',
          size: '',
          labelAlign: 'label-left-align',
          cssCode: '',
          customClass: '',
          functions: '',
          layoutType: 'PC',
          onFormCreated: '',
          onFormMounted: '',
          onFormDataChange: '',
          onFormValidate: '',
        },
      })
    })
  }
})

</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.el-container.main-container {
  background: #fff;
  margin-left: 0 !important;
}
</style>
