<template>
  <div class="left-bar">
    <div><img src="../../assets/head.png" alt=""></div>
    <div class="name" v-if="!isEdit">{{userName}}<i @click="toggleEdit" class="el-icon-edit-outline" style="margin-left: 10px;cursor:pointer"></i></div>
    <div class="name" v-else><el-input v-model="userName" style="width:80%"></el-input><i @click="toggleEdit" class="el-icon-circle-check" style="margin-left: 10px;cursor:pointer"></i></div>
    <div :class="{'other':true, 'active': otherActive}" @click="handleOther">其它</div>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
  data () {
    return {
      userName: '郝科长', // 用户名
      isEdit: false, // 用户名是否为编辑状态
      otherActive: false // 控制其他选中
    }
  },
  methods: {
    // 编辑姓名
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    handleOther () {
      this.otherActive = true
    }
  }
}
</script>

<style lang="less" scoped>
.left-bar {
  width: 330px;
  height: 100%;
  background-color: #F9F9F9;
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    font-size: 26px;
  }
  .other {
    margin-top: 200px;
    font-size: 28px;
    color: #999;
    text-align: center;
    height: 60px;
    width: 100%;
    line-height: 60px;
    cursor: pointer;
    &.active {
      color: #000;
      border: 1px solid #000;
      border-right: none;
    }
  }
}
</style>
