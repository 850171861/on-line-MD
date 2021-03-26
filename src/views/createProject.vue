<template>
  <div class="create-project">
    <div class="crad">
      <div class="top">
        <div class="back">
          <a-button><ArrowLeftOutlined /></a-button>
        </div>
        <div class="title">新建项目</div>
      </div>

      <div class="input">
        <a-input v-model:value="value" placeholder="项目名称" />
        <a-input v-model:value="value" placeholder="项目描述" />
      </div>

      <div class="radio">
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" :value="3">公开项目</a-radio>
          <a-radio :style="radioStyle" :value="4"> 私密项目 </a-radio>
        </a-radio-group>
      </div>
      <div class="passwrod">
        <a-input v-if="value === 4" placeholder="访问密码" />
      </div>
      <div class="submit">
        <a-button type="primary">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const value = ref<number>(1);
    const radioStyle = reactive({
      display: "block",
      height: "30px",
      lineHeight: "30px",
    });

    return {
      value,
      radioStyle,
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