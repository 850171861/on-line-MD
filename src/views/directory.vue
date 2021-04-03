<template>
  <div class="directory">
    <div class="crad">
      <div class="menu">
        <span>返回</span>
        <span>添加目录</span>
      </div>
      <div class="directory-list">
      <div class="name">123</div>
      <div class="crud">123</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scope>
.directory{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  .crad{
    width: 600px;
    min-height: 500px;
    max-height: 90%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    box-shadow: 0 2px 12px 0 #DCDCDC;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    .menu{
      color: #409EFF;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    .directory-list{
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
  }
}
</style>