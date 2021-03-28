<template>
  <div class="cantainer">
    <a-row class="header-top">
      <a-col :md="12" :xs="24" class="header-logo">
        <span><img src="../assets/Markdown.png" width="48" /></span>
        <span class="text">on line MD</span>
      </a-col>
      <a-col :md="12" :xs="24" class="header-login" offset="-2">
        <ul>
          <li><a @click="countDown">联系</a></li>
          <li>
            <router-link tag="a" :to="{name:'Login'}">登录</router-link>
            <router-link tag="a" :to="{name:'userRegister'}">/注册</router-link>
          </li>
        </ul>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Modal } from "ant-design-vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "header",
  setup() {
    const countDown = () => {
      let secondsToGo = 10;
      const modal = Modal.success({
        title: "对on line MD的任何疑问、建议都可以反馈到850171861@qq.com",
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `${secondsToGo}秒后自动关闭`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    };
    return {
      countDown,
    };
  },
});
</script>

<style lang="sass" scope>
.header-top
  background: #111111
  height: 100px
  .header-logo
    line-height: 100px
    text-align: left
    padding-left: 100px
    .text
      color: #fff
      font-size: 24px
      font-weight: 600
      margin-left: 10px

.header-top .header-login
  padding-right: 100px
  height: 100px
  line-height: 100px

  & ul
    display: flex
    flex-direction: row-reverse
    list-style: none

  & ul li
    list-style: none
    width: 86px

  & ul li a
    color: #fff
    font-size: 18px
</style>