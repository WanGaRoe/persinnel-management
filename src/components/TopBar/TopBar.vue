<template>
  <div class="top-bar">
    <div class="bar">
      <div class="logo">
        <img src="../../assets/top-logo.png" alt="" style="vertical-align:middle">
      </div>
      <div class="content">今天也要努力呀！</div>
      <div class="menu">
        <el-popover
          placement="bottom"
          width="100"
          trigger="hover">
          <el-button type="text" @click="modifyPwd">修改密码</el-button>
          <div style="line-height:40px" slot="reference">{{name}} |</div>
        </el-popover>
        <div class="exit">
          <div class="menu-item">
            <div @click="exit" style="height:100%">退出系统<img src="../../assets/exit.svg" alt="" style="vertical-align:text-top;margin-left:4px"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" width="25%" :visible.sync="dialogVisible">
      <el-form :model="formData" ref="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="formCol">
            <el-form-item
              label="原密码"
              prop="oldPassword"
            >
              <el-input v-model="formData.oldPassword" placeholder="请输入原密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="formCol">
            <el-form-item
              label="新密码"
              prop="password"
            >
              <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="formCol">
            <el-form-item
              label="确认密码"
              prop="rePassword"
            >
            <el-input v-model="formData.rePassword" type="password" placeholder="请重新输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import loginService from '@/services/login.service'
import accountService from '@/services/account.service'
import { mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else {
        if (this.formData.rePassword !== this.formData.password) {
          callback(new Error('两次密码输入不一致'))
        }
        callback()
      }
    }
    return {
      name: sessionStorage.getItem('loginName'),
      dialogVisible: false,
      activeId: '1',
      formCol: 24,
      formData: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: ['change', 'blur'] }
        ],
        rePassword: [
          { required: true, validator: validatePass }
        ]
      }

    }
  },
  methods: {
    ...mapMutations(['SET_SHOW_PAGE']),
    // 点击上方菜单
    handleClickMenu (menu) {
      this.activeId = menu.id
      this.$router.push(menu.url)
    },
    async exit () {
      let res = await loginService.logout()
      if (res.status === 0) {
        this.SET_SHOW_PAGE(false)
        this.$router.push('/login')
      }
    },
    // 点击修改密码
    modifyPwd () {
      this.dialogVisible = true
    },
    // 确认修改密码
    onSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res = await accountService.changePassword({
            id: sessionStorage.getItem('id'),
            oldPassword: this.formData.oldPassword,
            password: this.formData.password,
            rePassword: this.formData.rePassword
          })
          if (res.status === 0) {
            this.$message.success(res.message)
            this.dialogVisible = false
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  .bar {
    height: 120px;
    line-height: 120px;
    background: rgba(73, 67, 57, 1);
    padding: 0 100px 0 100px;
    display: flex;
    .content {
      font-size: 36px;
      color: #fff;
      margin-left: 30px;
    }
    .menu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 60px;
      font-size: 32px;
      color: #fff;
      .menu-box {
        display: flex;
      }
      .menu-item {
        height: 100%;
        width: 200px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
