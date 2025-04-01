<template>
  <div>
    <el-form label-width="80px" size="small" @submit.prevent>
      <el-form-item label="跳过表达式">
        <el-input
          v-model:value="bpmnFormData.skipExpression"
          @change="updateElementTask('skipExpression')"
        />
      </el-form-item>
      <el-form-item label="是否为补偿">
        <el-input
          v-model:value="bpmnFormData.isForCompensation"
          @change="updateElementTask('isForCompensation')"
        />
      </el-form-item>
      <el-form-item label="服务任务可触发">
        <el-input
          v-model:value="bpmnFormData.triggerable"
          @change="updateElementTask('triggerable')"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { StrUtil } from '@/utils/StrUtil'
export default {
  name: 'OtherPanel',
  /** 组件传值  */
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      bpmnFormData: {},
    }
  },

  /** 传值监听 */
  watch: {
    id: {
      deep: true,

      handler(newVal) {
        if (StrUtil.isNotBlank(newVal)) {
          this.resetTaskForm()
        }
      },

      // 立即生效
      immediate: true,
    },
  },
  created() {},
  methods: {
    // 方法区
    resetFlowForm() {
      this.bpmnFormData = JSON.parse(
        JSON.stringify(this.modelerStore.element.businessObject)
      )
    },

    updateElementTask(key) {
      const taskAttr = Object.create(null)
      taskAttr[key] = this.bpmnFormData[key] || null
      this.modelerStore.modeling.updateProperties(
        this.modelerStore.element,
        taskAttr
      )
    },
  },
}
</script>
