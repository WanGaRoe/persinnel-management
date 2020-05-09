<template>
  <div class="delete-dialog">
    <el-dialog :title="title" :visible.sync="deleteVisible" width="30%" @close="dialogClose">
      <span>删除后不可恢复，是否删除</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="deleteOk">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '提示'
    },
    deleteVisible: {
      default: false
    }
  },
  name: 'DeleteDialog',
  data () {
    return {
      dialogVisible: this.deleteVisible
    }
  },
  methods: {
    dialogClose () {
      this.dialogVisible = false
    },
    // 确认删除
    deleteOk () {
      this.$emit('deleteOk')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
