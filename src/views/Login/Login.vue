<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo">
      </div>
      <div class="form">
        <div class="form-title">
          <p>用户登录</p>
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
}
</style>
