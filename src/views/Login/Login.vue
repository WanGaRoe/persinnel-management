<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo" style="width: 400px">
      </div>
      <div class="form">
        <div class="form-title">
          <div class="title">{{ loginTitle }}</div>
          <div class="content">一天的开始</div>
        </div>
        <div class="form-input">
          <!-- 登录 -->
          <el-form :model="form" ref="loginForm" :rules="loginRules" v-if="formIndex === 1">
            <el-form-item prop="email">
              <i class="el-icon-user form-icon"></i>
              <el-input type="text" placeholder="请输入邮箱" :value="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请输入密码" :value="form.password"></el-input>
            </el-form-item>
            <div style="padding:0 40px;display:flex;justify-content:space-between">
              <el-checkbox :vlue="rememberPwd">记住密码</el-checkbox>
              <div style="font-size:14px;cursor:pointer" @click="forgetPwd">忘记密码</div>
            </div>
          </el-form>
          <!-- 忘记密码 -->
          <el-form :model="findForm" ref="loginForm" :rules="findRules" v-if="formIndex === 2">
            <el-form-item prop="email">
              <i class="el-icon-user form-icon"></i>
              <el-input type="text" placeholder="请输入邮箱" :value="findForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="text" placeholder="请输入验证码" :value="findForm.code" style="width:45%;margin-right:20px"></el-input>
              <el-button type="text" :disabled="getCodeDisabled" @click="resend">{{getCodeText}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 重新设置密码 -->
          <el-form :model="resetForm" ref="loginForm" :rules="resetRules" v-if="formIndex === 3">
            <el-form-item prop="email">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请输入密码" :value="resetForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请重新输入密码" :value="resetForm.rePassword"></el-input>
            </el-form-item>
          </el-form>
          <div v-if="formIndex === 4" class="find-content">找回密码成功</div>
          <div style="text-align:center;padding-top:20px">
            <el-button v-if="formIndex === 1" type="primary" style="width:80%" @click="login">登录</el-button>
            <el-button v-else type="primary" style="width:80%" @click="next">{{forgetBtn}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formIndex: 1, // 控制表单切换
      forgetBtn: '下一步', // 找回密码按钮显示文字
      loginTitle: '用户登录', // 登录标题
      rememberPwd: false, // 是否记住密码
      getCodeDisabled: false, // 倒计时时禁用
      getCodeText: '获取验证码', // 后去验证码
      // 表单控件
      form: {
        email: '',
        password: ''
      },
      findForm: {
        email: '',
        code: ''
      },
      resetForm: {
        password: '',
        rePassword: ''
      },
      // 登录表单验证：element-ui
      loginRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'change' },
          { pattern: /^[A-Za-zd0-9] ([-_.][A-Za-zd] )*@([A-Za-zd] [-.]) [A-Za-zd]{2,5}$/, message: '邮箱格式不正确' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      findRules: {

      },
      resetRules: {

      }
    }
  },
  methods: {
    // 登录
    login () {
      console.log('login')
      this.$router.push('/home')
    },

    // 获取验证码
    resend () {
      this.getCodeDisabled = true
      let num = 60
      this.getCodeText = num + '秒后重新获取'
      let timer = setInterval(() => {
        num--
        this.getCodeText = num + '秒后重新获取'
        if (num === 0) {
          clearInterval(timer)
          this.getCodeText = '获取验证码'
          this.getCodeDisabled = false
        }
      }, 1000)
    },

    // 点击找回密码
    forgetPwd () {
      this.loginTitle = '找回密码'
      this.formIndex = 2
    },

    // 找回密码 下一步
    next () {
      switch (this.formIndex) {
        case 2:
          // 获取验证码校验
          this.forgetBtn = '下一步'
          this.formIndex++
          break
        case 3:
          // 设置密码
          this.forgetBtn = '去登录'
          this.formIndex++
          break
        case 4:
          // 设置成功页面
          this.forgetBtn = '下一步'
          this.loginTitle = '用户登录'
          this.formIndex = 1
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background:  url('../../assets/login-bg.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 800px;
    height: 400px;
    display: flex;
    .logo {
      background: #fff;
      display: flex;
      align-items: center;
    }
    .form {
      width: 100%;
      border-left: 1px solid #333;
      background: #fff;
      .form-title {
        height: 80px;
        text-align: center;
        padding: 10px 50px;
        position: relative;
        .title {
          line-height: 80px;
          color:#7F7F7F;
          font-size:36px;
          border-bottom: 1px solid #7f7f77;
        }
        .content {
          width: 110px;
          text-align: center;
          background: #fff;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%)
        }
      }
      .form-input {
        padding: 40px 20px;
        .el-input {
          width: 80%;
        }
        .form-icon {
          font-size:28px;
          margin-right:10px;
          vertical-align:middle
        }
        .find-content {
          height: 122px;
          line-height: 122px;
          text-align: center;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
