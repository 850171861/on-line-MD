<template>
  <div class="register">
    <p>项目访问密码</p>
    <a-form
      layout="inline"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :model="password"
    >
      <a-form-item>
        <a-input
          v-model:value="password"
          type="password"
          placeholder="密码"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item class="submit">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="password === ''"
        >
          访问
        </a-button>
      </a-form-item>
    </a-form>
    <div class="other">
      <router-link :to="{ name: 'Login' }">登录</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { LockOutlined } from "@ant-design/icons-vue";
import { defineComponent,ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { projectPassword } from '@/api/project'
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProjectPassword",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute()
    const password = ref('')
    const handleFinish = () => {
        projectPassword({password: password.value,projectId:route.query.projectId}).then((res) => {
          if (res.data.code !== 200) {
            message.error('访问密码错误,请联系项目创建者');
            }else {
            store.commit("setProject", true);
            router.go(-1)
          }
        });
      }
    return {
      password,
      handleFinish,
    };
  },
  components: {
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