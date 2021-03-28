<template>
<div class="register">
  <p>注册</p>
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
      <a-input v-model:value="formState.name" @blur="name_blur"  placeholder="昵称">
        <template #prefix><IdcardOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
      <div class="tips">{{messageName}}</div>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="密码">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
     <a-form-item class="var">
      <a-input v-model:value="formState.ver"  placeholder="验证码">
        <template #prefix><VerifiedOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
       <a-button type="primary"  :class="{disabledver: !this.canClick}" @click="countDown">
 {{content}}
</a-button>
    </a-form-item>
    <a-form-item class="submit">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === '' || formState.name === '' || formState.ver === ''"
      >
        注册
      </a-button>
    </a-form-item>
  </a-form>
  <div class="other">
    <router-link :to="{name:'Login'}">登录</router-link>
    <router-link :to="{name:'ResetPassword'}">忘记密码</router-link>
  </div>
  </div>
</template>
<script lang="ts">
import { UserOutlined, IdcardOutlined, LockOutlined,VerifiedOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive, UnwrapRef,ref } from 'vue';
interface FormState {
  user: string;
  name:string;
  password: string;
  ver:string
}
export default defineComponent({
  name:'Register',
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      name:'',
      password: '',
      ver:''
    });
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
 
   const content = ref('发送'); // 按钮里显示的内容
   const totalTime = ref(60);//记录具体倒计时时间
   const canClick = ref(true)
   const  countDown = () => {
      if (!canClick.value) return
      canClick.value = false
     content.value = totalTime.value + 's后重新发送' //这里解决60秒不见了的问题
    let clock = window.setInterval(() => {
      totalTime.value--
      content.value = totalTime.value + 's后重新发送'
       if (totalTime.value <= 0) {     //当倒计时小于0时清除定时器
    window.clearInterval(clock)
    content.value = '重新发送验证码'
    totalTime.value = 60
    canClick.value = true 
    }
    },1000)
  }
  const messageEmail = ref('')
  const email_blur = () => {
                var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!verify.test(formState.user)) {
                   messageEmail.value = "邮箱格式错误"
                }else{
                  messageEmail.value = ''
                }
            }
  const messageName = ref('')
  const name_blur = () => {
    if(formState.name == ''){
      messageName.value = '昵称不能为空'
    }else{
      messageName.value = ''
    }
  }
    
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      content,
      totalTime,
      countDown,
      email_blur,
      messageEmail,
      name_blur,
      messageName
    };
  },
  components: {
    UserOutlined,
    IdcardOutlined,
    LockOutlined,
    VerifiedOutlined
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
.disabledver{
 cursor: not-allowed; // 鼠标变化
}
.ant-col{
  width: 250px;
}
.var{
.ant-input-affix-wrapper{
  width: 120px;
}
.ant-btn{
  width: 130px;
  height: 31px;
}
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