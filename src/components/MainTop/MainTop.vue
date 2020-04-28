<template>
  <div class="main-top">
    <div class="item">
      <div class="img"><img src="../../assets/onWork.png" alt=""></div>
      <div class="text">
        <div class="person">{{ onWork }} 人</div>
        <div class="content">在职人数</div>
      </div>
    </div>
    <div class="item">
      <div class="img"><img src="../../assets/newWork.png" alt=""></div>
      <div class="text">
        <div class="person">{{ newWork }} 人</div>
        <div class="content">新员工人数</div>
      </div>
    </div>
    <div class="item">
      <div class="img"><img src="../../assets/applyIn.png" alt=""></div>
      <div class="text">
        <div class="person">{{ applyIn }} 人</div>
        <div class="content">申请调入人数</div>
      </div>
    </div>
    <div class="item">
      <div class="img"><img src="../../assets/applyOut.png" alt=""></div>
      <div class="text">
        <div class="person">{{ applyOut }} 人</div>
        <div class="content">申请调出人数</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainTop',
  data () {
    return {
      onWork: 200,
      newWork: 20,
      applyOut: 4,
      applyIn: 12
    }
  }
}
</script>

<style lang="less" scoped>
.main-top {
  display: flex;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 32%, rgba(237, 237, 237, 1) 85%);
  border-bottom: 3px solid #797979;
  .item {
    flex: 1;
    display: flex;
    height: 140px;
    align-items: center;
    justify-content: center;
    .img {
      img {
        width: 55px;
      }
    }
    .text {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
