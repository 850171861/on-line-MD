<template>
  <div class="register">
    <p>注册</p>
    <a-form
       layout="inline"
    :model="formState"
    @finish="handleFinish"
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
        <a-input v-model:value="formState.ver" placeholder="验证码">
          <template #prefix
            ><VerifiedOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
        <a-button
          type="primary"
          @click="countDown"
          :class="{canClick:canClick}"
          :disabled="formState.username === '' ||formState.password === '' ||formState.name === ''"
        >
          {{ content }} 
        </a-button>
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
import { message } from 'ant-design-vue';
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import { register } from "@/api/login";
interface FormState {
  username: string;
  name: string;
  password: string;
  ver: string;
}
import vaildateForm from '@/hooks/vaildateForm'
export default defineComponent({
  name: "Register",
  setup() {
      const { messageName, name_blur } = vaildateForm()
    const formState: UnwrapRef<FormState> = reactive({
      username: "",
      name: "",
      password: "",
      ver: "",
    });

    const messagePasswrod = ref("");
    const content = ref("获取验证码"); // 按钮里显示的内容
    const totalTime = ref(60); //记录具体倒计时时间
    const canClick = ref(false);
   
    // 注册
  const handleFinish = () => {
      console.log(formState.name);
    };
    // 获取验证码
    const countDown = () => {
      let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(formState.username)) {
        messageEmail.value = "邮箱格式错误";
        return
      }
       register({ username: formState.username, password: formState.password, name: formState.name }).then((res)=>{
        if(res.data.code === 200){
          message.success('验证码已发送,请注意查收')
        }
      });
     timing()
     
    };
    const messageEmail = ref("");
    const email_blur = () => {
      let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(formState.username)) {
        messageEmail.value = "邮箱格式错误";
      } else {
        messageEmail.value = "";
      }
    };
    // const messageName = ref("");
    // const name_blur = () => {
    //   if (formState.name == "") {
    //     messageName.value = "昵称不能为空";
    //   } else {
    //     messageName.value = "";
    //   }
    // };

     const password_blur = () => {
      if (formState.name == "") {
        messagePasswrod.value = "密码不能为空";
      } else {
        messagePasswrod.value = "";
      }
    };

    const timing = () => {
       if (canClick.value) return;
      canClick.value = true;
      content.value = totalTime.value + "s后重新发送";
      let clock = window.setInterval(() => {
        totalTime.value--;
        content.value = totalTime.value + "s后重新发送";
        if (totalTime.value <= 0) {
          //当倒计时小于0时清除定时器
          window.clearInterval(clock);
          content.value = "重新发送验证码";
          totalTime.value = 60;
          canClick.value = false;
        }
      }, 1000);
    }
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
.canClick{
   pointer-events: none;
    cursor: default;
    opacity: 0.5;
}
</style>