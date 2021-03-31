<template>
  <div class="register">
    <p>重置密码</p>
    <a-form layout="inline" :model="formState" @finish="handleFinish">
      <a-form-item>
        <a-input
          v-model:value="formState.username"
          @blur="email_blur"
          placeholder="绑定邮箱"
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
          :disabled="formState.username === '' || formState.password === ''"
        >
          {{ content }}
        </a-button>
        <div class="tips">{{ messageVer }}</div>
      </a-form-item>
      <a-form-item class="submit">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.user === '' || formState.ver === ''"
        >
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <div class="other">
      <router-link :to="{ name: 'Login' }">想起密码了？去登录</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { UserOutlined, VerifiedOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import vaildateForm from "@/hooks/vaildateForm";
import { message } from "ant-design-vue";
import { resetPwd } from "@/api/login";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ResetPassword",
  setup() {
    const router = useRouter();
    const {
      formState,
      messageEmail,
      email_blur,
      messagePasswrod,
      password_blur,
      content,
      totalTime,
      countDown,
      messageVer,
      ver_blur,
    } = vaildateForm();

    const handleFinish = () => {
      if (
        messageEmail.value === "" &&
        messagePasswrod.value === "" &&
        messageVer.value === ""
      ) {
        resetPwd({
          username: formState.username,
          password: formState.password,
          ver: formState.ver,
        }).then((res) => {
          if (res.data.code === 200) {
            message.success("重置成功,2秒后跳登录界面");
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
        message.error("重置失败，请正确填写表单");
      }
    };

    return {
      formState,
      handleFinish,
      content,
      totalTime,
      countDown,
      email_blur,
      messageEmail,
      messagePasswrod,
      password_blur,
      messageVer,
      ver_blur,
    };
  },
  components: {
    UserOutlined,
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
.disabledver {
  cursor: not-allowed; // 鼠标变化
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