<template>
  <div class="cantainer">
    <a-row class="header-top">
      <a-col :md="12" :xs="24" class="header-logo">
        <span><img src="../assets/Markdown.png" width="48" /></span>
        <span class="text">on line MD</span>
      </a-col>
      <a-col :md="12" :xs="24" class="header-login" offset="-2">
        <ul v-if="!isLogin">
          <li>
            <a @click="countDown">联系</a>
          </li>
          <li>
            <router-link tag="a" :to="{ name: 'Login' }">登录</router-link>
            <router-link tag="a" :to="{ name: 'userRegister' }"
              >/注册</router-link
            >
          </li>
        </ul>
        <div class="menu" v-else>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <span>{{ userInfo.name }}</span
              ><UserOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="logout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Modal } from "ant-design-vue";
import { defineComponent, computed } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface HeaderInterface {
  isLogin: boolean;
  userInfo: string;
}
export default defineComponent({
  name: "header",
  components: {
    UserOutlined,
  },
  setup() {
    const store = useStore<HeaderInterface>();

    const router = useRouter();

    const userInfo = computed(() => store.state.userInfo);
    const isLogin = computed(() => store.state.isLogin);
    console.log(isLogin)
    const logout = () => {
      localStorage.clear();
      store.commit("setToken", "");
      store.commit("setUserInfo", {});
      store.commit("setIsLogin", false);
      router.push({ name: "Index" });
    };
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
      userInfo,
      isLogin,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.cantainer {
  background: #111111;
  height: 100px;
  .header-top {
    max-width: 1200px;
    margin: 0 auto;
    .header-logo {
      line-height: 100px;
      text-align: left;
      padding-left: 100px;
      .text {
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        margin-left: 10px;
      }
    }
    .header-login {
      padding-right: 100px;
      height: 100px;
      line-height: 100px;
      ul {
        display: flex;
        flex-direction: row-reverse;
        list-style: none;
        li {
          list-style: none;
          width: 86px;
          a {
            color: #fff;
            font-size: 18px;
          }
        }
      }
      .menu {
        text-align: right;
        span {
          color: #fff;
          font-size: 20px;
          padding: 6px;
        }
      }
    }
  }
}
</style>