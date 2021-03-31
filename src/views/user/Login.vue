<template>
  <div class="register">
    <p>登录</p>
    <a-form
      layout="inline"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item>
        <a-input
          v-model:value="formState.username"
          @blur="email_blur"
          placeholder="邮箱"
        >
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
        <div class="tips">{{ messageEmail }}</div>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formState.password"
          type="password"
          @blur="password_blur"
          placeholder="密码"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
        <div class="tips">{{ messagePasswrod }}</div>
      </a-form-item>
      <a-form-item class="submit">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.username === '' || formState.password === ''"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div class="other">
      <router-link :to="{ name: 'userRegister' }">注册新账号</router-link>
      <router-link :to="{ name: 'ResetPassword' }">忘记密码</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import vaildateForm from "@/hooks/vaildateForm";
import { useRouter } from "vue-router";
import { login } from "@/api/login";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useStore();

    const {
      formState,
      messageEmail,
      email_blur,
      messagePasswrod,
      password_blur,
    } = vaildateForm();

    const handleFinish = () => {
      if (messageEmail.value === "" && messagePasswrod.value === "") {
        login({
          username: formState.username,
          password: formState.password,
        }).then((res) => {
          if (res.data.code === 200) {
            store.commit("setUserInfo", res.data.data);
            store.commit("setIsLogin", true);
            store.commit("setToken", res.data.token);
            message.success("登录成功");
            router.push({ name: "userIndex" });
          } else if (res.data.code === 404) {
            message.error("用户或者密码错误");
          } else {
            message.error("服务器繁忙");
          }
        });
      } else {
        message.error("登录失败，请正确填写表单");
      }
    };
    return {
      formState,
      email_blur,
      messageEmail,
      messagePasswrod,
      password_blur,
      handleFinish,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style lang="scss" scope>
.register {
  width: 330px;

  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  p {
    font-size: 18px;
    font-weight: 600;
    padding-top: 20px;
  }
}
.tips {
  color: red;
}

.ant-col {
  width: 250px;
}

.submit {
  .ant-btn {
    width: 250px;
    margin: 20px 0;
  }
}
.other {
  margin: 20px 0;
  color: #1890ff;
  a {
    padding: 0 10px;
  }
}
</style>