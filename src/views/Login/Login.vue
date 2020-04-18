<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo" style="width: 400px">
      </div>
      <div class="form">
        <div class="form-title">
          <div class="title">用户登录</div>
          <div>一天的开始</div>
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
      .title {
        color:#7F7F7F;
        font-size:36px
      }
    }
  }
}
</style>
