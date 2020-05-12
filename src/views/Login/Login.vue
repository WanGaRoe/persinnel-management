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
          <el-form :model="form" ref="loginForm" :rules="loginRules" v-show="formIndex === 1">
            <el-form-item prop="userName">
              <i class="el-icon-user form-icon"></i>
              <el-input type="text" placeholder="请输入账号" v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请输入密码" v-model="form.password" @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请输入验证码" v-model="form.code" @keyup.enter.native="login" style="width:150px"></el-input>
              <Identify :identifyCode="identifyCode" @click.native="randomStr"/>
            </el-form-item>
            <div style="padding:0 40px;display:flex;justify-content:space-between">
              <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
              <div style="font-size:14px;cursor:pointer" @click="forgetPwd">忘记密码</div>
            </div>
          </el-form>
          <!-- 忘记密码 -->
          <el-form :model="findForm" ref="findForm" :rules="findRules" v-show="formIndex === 2">
            <el-form-item prop="userName">
              <i class="el-icon-user form-icon"></i>
              <el-input type="text" placeholder="请输入账号" v-model="findForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <i class="el-icon-phone form-icon"></i>
              <el-input type="text" placeholder="请输入手机号" v-model="findForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="text" placeholder="请输入手机验证码" v-model="findForm.code" style="width:45%;margin-right:20px"></el-input>
              <el-button type="text" :disabled="getCodeDisabled" @click="resend">{{getCodeText}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 重新设置密码 -->
          <el-form :model="resetForm" ref="resetForm" :rules="resetRules" v-show="formIndex === 3">
            <el-form-item prop="password">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请输入密码" v-model="resetForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
              <i class="el-icon-lock form-icon"></i>
              <el-input type="password" placeholder="请重新输入密码" v-model="resetForm.rePassword"></el-input>
            </el-form-item>
          </el-form>
          <div v-show="formIndex === 4" class="find-content">找回密码成功</div>
          <div style="text-align:center;padding-top:20px">
            <el-button v-if="formIndex === 1" type="primary" style="width:80%" @click="login">登录</el-button>
            <div v-else>
              <el-button style="width:40%" @click="formIndex--">上一步</el-button>
              <el-button type="primary" style="width:40%" @click="next">{{forgetBtn}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginService from '@/services/login.service'
import Identify from '@/components/Identify'
// import axios from 'axios'
export default {
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.resetForm.password !== this.resetForm.rePassword) {
          callback(new Error('两次密码输入不一致'))
        }
        callback()
      }
    }
    return {
      loginService,
      formIndex: 1, // 控制表单切换
      forgetBtn: '下一步', // 找回密码按钮显示文字
      loginTitle: '用户登录', // 登录标题
      rememberPwd: false, // 是否记住密码
      getCodeDisabled: false, // 倒计时时禁用
      getCodeText: '获取验证码', // 后去验证码
      identifyCode: '',
      imgCaptcha: '',
      // 表单控件
      form: {
        userName: '',
        password: ''
      },
      findForm: {
        userName: '',
        phone: '',
        code: ''
      },
      resetForm: {
        password: '',
        rePassword: ''
      },
      // 登录表单验证：element-ui
      loginRules: {
        userName: [
          { required: true, message: '请输入帐号', trigger: 'change' }
          // { pattern: /^[A-Za-zd0-9] ([-_.][A-Za-zd] )*@([A-Za-zd] [-.]) [A-Za-zd]{2,5}$/, message: '邮箱格式不正确' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      },
      findRules: {
        userName: [
          { required: true, message: '请输入帐号', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      },
      resetRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        rePassword: [
          { required: true, validator: validatePass }
        ]
      }
    }
  },
  mounted () {
    if (window.localStorage.getItem('rememberMe')) {
      this.form.userName = window.localStorage.getItem('userName')
      this.form.password = window.localStorage.getItem('password')
      this.rememberPwd = Boolean(window.localStorage.getItem('rememberMe'))
    }
    this.randomStr()
  },
  methods: {
    // 登录
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          if (this.form.code !== this.identifyCode) {
            this.$message.error('验证码错误')
            this.randomStr()
            return
          }
          let res = await loginService.login({
            loginName: this.form.userName,
            password: this.form.password,
            rememberMe: this.rememberPwd
          })
          if (res.status === 0) {
            // console.log(res)
            window.sessionStorage.setItem('loginName', res.data.loginName)
            if (this.rememberPwd) {
              window.localStorage.setItem('userName', this.form.userName)
              window.localStorage.setItem('password', this.form.password)
              window.localStorage.setItem('rememberMe', this.rememberPwd)
            } else {
              window.localStorage.removeItem('userName')
              window.localStorage.removeItem('password')
              window.localStorage.removeItem('rememberMe')
            }
            this.$router.push('/home')
          } else {
            this.randomStr()
          }
        }
      })
    },
    // 获取验证码
    // async getCapcha () {
    //   axios.get('/api/captcha', {
    //     params: {},
    //     responseType: 'blob'
    //   }).then(res => {
    //     this.imgCaptcha = window.URL.createObjectURL(res)
    //   })
    // },

    // 获取验证码
    async resend () {
      if (!this.findForm.phone) {
        this.$message.error('请输入手机号')
        return
      }
      if (!this.findForm.userName) {
        this.$message.error('请输入用户名')
        return
      }
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
      let res = await loginService.phoneCode({
        loginName: this.findForm.userName,
        telephone: this.findForm.phone
      })
      if (res.status === 0) {
        this.$message.success('发送成功')
      }
    },

    // 点击找回密码
    forgetPwd () {
      this.loginTitle = '找回密码'
      this.formIndex = 2
      this.$refs.loginForm.resetFields()
    },

    // 找回密码 下一步
    next () {
      switch (this.formIndex) {
        case 2:
          // 获取验证码校验
          this.$refs.findForm.validate(async valid => {
            if (valid) {
              let res = await loginService.findPassword({
                loginName: this.findForm.userName,
                telephone: this.findForm.phone,
                telCaptcha: this.findForm.code,
                action: 1
              })
              if (res.status === 0) {
                this.forgetBtn = '下一步'
                this.formIndex++
              }
            }
          })
          break
        case 3:
          this.$refs.resetForm.validate(async valid => {
            if (valid) {
              let res = await loginService.findPassword({
                loginName: this.findForm.userName,
                password: this.resetForm.password,
                telephone: this.findForm.phone,
                telCaptcha: this.findForm.code,
                action: 2
              })
              if (res.status === 0) {
                // 设置密码
                this.forgetBtn = '去登录'
                this.formIndex++
              }
            }
          })
          break
        case 4:
          // 设置成功页面
          this.forgetBtn = '下一步'
          this.loginTitle = '用户登录'
          this.$refs.loginForm.resetFields()
          this.$refs.findForm.resetFields()
          this.$refs.resetForm.resetFields()
          this.formIndex = 1
          break
      }
    },
    // 范围随机数
    random (max, min) {
      return Math.round(Math.random() * (max - min) + min)
    },
    // 封装，以便日后使用。
    randomStr () {
      // 创建一个空字符，用于存放随机数/字母
      var strData = ''
      // 生成随机字符库 (验证码四位，随机数三种，取公倍数12,所以循环4次。也可以是120次，1200次。)
      for (var i = 0; i < 4; i++) {
        var num = this.random(0, 9) // 生成0-9的随机数
        var az = String.fromCharCode(this.random(97, 122))// 生成a-z

        strData = strData + num + az// 将生成的字符进行字符串拼接
      }
      // 开始真正的随机(从随机字符库中随机取出四个)
      var str = ''
      for (var j = 0; j < 4; j++) {
        str += strData[this.random(0, strData.length - 1)]
      }
      this.identifyCode = str
    }
  },
  components: {
    Identify
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background:  url('../../assets/login-bg.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 900px;
    height: 450px;
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
        .el-form-item__error {
          margin-left: 38px;
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
