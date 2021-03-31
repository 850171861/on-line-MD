import { ref, reactive, UnwrapRef } from 'vue'
import { verification } from "@/api/login";
import { message } from "ant-design-vue";

interface FormState {
  username: string;
  name: string;
  password: string;
  ver: string;
}
function vaildateForm() {
  const verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  const formState: UnwrapRef<FormState> = reactive({
    username: "",
    name: "",
    password: "",
    ver: "",
  });
  // 处理邮箱验证
  const messageEmail = ref("");
  const email_blur = () => {
    if (!verify.test(formState.username)) {
      messageEmail.value = "邮箱格式错误";
    } else {
      messageEmail.value = "";
    }
  };
  // 处理昵称验证
  const messageName = ref("");
  const name_blur = () => {
    if (formState.name.length < 2) {
      messageName.value = "昵称不能少于2位";
    } else {
      messageName.value = "";
    }
  };
  // 处理密码验证
  const messagePasswrod = ref("");
  const password_blur = () => {
    if (formState.password.length < 6) {
      messagePasswrod.value = "密码不能少于6位";
    } else {
      messagePasswrod.value = "";
    }
  };
  // 处理验证码
  const content = ref("获取验证码"); // 按钮里显示的内容
  const totalTime = ref(60); //记录具体倒计时时间
  const canClick = ref(false);
  const countDown = () => {
    if (!verify.test(formState.username)) {
      messageEmail.value = "邮箱格式错误";
      message.success("请正确填写表单");

      return;
    }
    verification({
      username: formState.username,
      password: formState.password,
      name: formState.name,
    }).then((res) => {
      if (res.data.code === 200) {
        message.success("验证码已发送,请注意查收");
      }
    });
    if (canClick.value) return;
    canClick.value = true;
    content.value = totalTime.value + "s后重新发送";
    const clock = window.setInterval(() => {
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
  };
  // 处理验证码校验
  // 处理密码验证
  const messageVer = ref("");
  const ver_blur = () => {
    if (formState.ver.length !== 4) {
      messageVer.value = "验证码必须为4位";
    } else {
      messageVer.value = "";
    }
  };


  return {
    formState, messageEmail, email_blur, messageName, name_blur, messagePasswrod, password_blur,
    content, totalTime, canClick, countDown, messageVer, ver_blur
  }
}

export default vaildateForm