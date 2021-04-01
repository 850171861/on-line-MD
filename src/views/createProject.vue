<template>
  <div class="create-project">
    <div class="crad">
      <div class="top">
        <div class="back">
          <a-button><ArrowLeftOutlined /></a-button>
        </div>
        <div class="title">新建项目</div>
        <a-alert message="Success Text" type="success" />
      </div>

      <div class="input">
        <a-input v-model:value="name" placeholder="项目名称" />
        <a-input v-model:value="description" placeholder="项目描述" />
      </div>

      <div class="radio">
        <a-radio-group v-model:value="radio">
          <a-radio :style="radioStyle" :value="true">公开项目</a-radio>
          <a-radio :style="radioStyle" :value="false"> 私密项目 </a-radio>
        </a-radio-group>
      </div>
      <div class="passwrod">
        <a-input
          v-if="radio === false"
          v-model:value="password"
          placeholder="访问密码"
        />
      </div>
      <div class="submit">
        <a-button type="primary" @click="submit">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import { createProject } from "@/api/project";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const router = useRouter();
    const name = ref<string>("");
    const description = ref<string>("");
    const radio = ref<boolean>(true);
    const password = ref<string>("");
    const radioStyle = reactive({
      display: "block",
      height: "30px",
      lineHeight: "30px",
    });
    const submit = () => {
      createProject({
        name: name.value,
        description: description.value,
        publics: radio.value,
        password: password.value,
        roles: ["create"],
      }).then((res) => {
        if (res.data.code === 200) {
          message.success("创建成功");
          router.push({ name: "userIndex" });
        }
      });
    };
    return {
      name,
      description,
      radio,
      password,
      radioStyle,
      submit,
    };
  },
});
</script>

<style lang="scss" scope>
.create-project {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .crad {
    width: 463px;
    .top {
      width: 90%;
      margin-left: 5%;
      height: 70px;
      position: relative;
      .back {
        position: absolute;
        left: 0;
        top: 20px;
        .ant-btn {
          border-color: #fff;
        }
      }
      .title {
        font-size: 16px;
        line-height: 70px;
      }
    }
    .input {
      .ant-input {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        color: #606266;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        width: 90%;
        margin-bottom: 20px;
      }
    }
    .radio {
      margin-bottom: 20px;
      .ant-radio-group {
        display: flex;
        justify-content: center;
      }
    }
    .passwrod {
      input {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        color: #606266;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        margin-bottom: 30px;
        width: 90%;
      }
    }
    .submit {
      margin-bottom: 40px;
      .ant-btn {
        width: 90%;
        height: 40px;
      }
    }
  }
}
</style>