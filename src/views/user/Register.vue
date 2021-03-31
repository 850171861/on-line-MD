<template>
  <div class="register">
    <p>注册</p>
    <a-form layout="inline" :model="formState" @finish="handleFinish">
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
          v-model:value="formState.name"
          @blur="name_blur"
          placeholder="昵称"
        >
          <template #prefix
            ><IdcardOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
        <div class="tips">{{ messageName }}</div>
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
      <a-form-item class="var">
        <a-input
          v-model:value="formState.ver"
          @blur="ver_blur"
          placeholder="验证码"
        >
          <template #prefix
            ><VerifiedOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
        <a-button
          type="primary"
          @click="countDown"
          :class="{ canClick: canClick }"
          :disabled="
            formState.username === '' ||
            formState.password === '' ||
            formState.name === ''
          "
        >
          {{ content }}
        </a-button>
        <div class="tips">{{ messageVer }}</div>
      </a-form-item>
      <a-form-item class="submit">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="
            formState.username === '' ||
            formState.password === '' ||
            formState.name === '' ||
            formState.ver === ''
          "
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
    <div class="other">
      <router-link :to="{ name: 'Login' }">登录</router-link>
      <router-link :to="{ name: 'ResetPassword' }">忘记密码</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import {
  UserOutlined,
  IdcardOutlined,
  LockOutlined,
  VerifiedOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { message } from "ant-design-vue";
import vaildateForm from "@/hooks/vaildateForm";
import { register } from "@/api/login";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  setup() {
    const router = useRouter();
    const {
      formState,
      messageEmail,
      email_blur,
      messageName,
      name_blur,
      messagePasswrod,
      password_blur,
      content,
      totalTime,
      canClick,
      countDown,
      messageVer,
      ver_blur,
    } = vaildateForm();

    // 注册
    const handleFinish = () => {
      if (
        messageEmail.value === "" &&
        messageName.value === "" &&
        messagePasswrod.value === "" &&
        messageVer.value === ""
      ) {
        register({
          username: formState.username,
          password: formState.password,
          name: formState.name,
          ver: formState.ver,
        }).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            message.success("注册成功,2秒后跳登录界面");
            setTimeout(() => {
              router.push({ name: "Login" });
            }, 2000);
          } else if (res.data.code === 500) {
            message.error(res.data.msg);
          } else {
            message.error("服务器繁忙");
          }
        });
      } else {
        message.error("注册失败，请正确填写表单");
      }
      console.log(formState);
    };
    return {
      formState,
      handleFinish,
      content,
      totalTime,
      countDown,
      email_blur,
      messageEmail,
      name_blur,
      messageName,
      messagePasswrod,
      password_blur,
      canClick,
      messageVer,
      ver_blur,
    };
  },
  components: {
    UserOutlined,
    IdcardOutlined,
    LockOutlined,
    VerifiedOutlined,
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
.var {
  .ant-input-affix-wrapper {
    width: 120px;
  }
  .ant-btn {
    width: 130px;
    height: 31px;
  }
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
.canClick {
  pointer-events: none;
  cursor: default;
  opacity: 0.5;
}
</style>