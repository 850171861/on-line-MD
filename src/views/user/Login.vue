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
      <a-input  v-model:value="formState.user" @blur="email_blur" placeholder="邮箱">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
      <div class="tips">{{messageEmail}}</div>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="密码">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item class="submit">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
  <div class="other">
    <router-link :to="{name:'userRegister'}">注册新账号</router-link>
    <router-link :to="{name:'ResetPassword'}">忘记密码</router-link>
  </div>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive, UnwrapRef,ref } from 'vue';
interface FormState {
  user: string;
  password: string;
}
export default defineComponent({
  name:'Login',
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user:'',
      password: '',
    });
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
 
   
  const messageEmail = ref('')
  const email_blur = () => {
                var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!verify.test(formState.user)) {
                   messageEmail.value = "邮箱格式错误"
                }else{
                  messageEmail.value = ''
                }
            }
    return {
      formState,
      handleFinish,
      handleFinishFailed,
     
      email_blur,
      messageEmail
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style lang="scss" scope>
.register{
  width: 330px;

  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  transform: translate(-50%,-50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  p{
    font-size: 18px;
    font-weight: 600;
    padding-top: 20px;
  }
}
.tips{
  color: red;
}

.ant-col{
  width: 250px;
}

.submit{
  
  .ant-btn{
    width: 250px;
  margin: 20px 0;
  }
}
.other{
  margin: 20px 0;
  color: #1890ff;
  a{
    padding: 0 10px;
  }
}
</style>