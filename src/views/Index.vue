<template>
  <div class="index">
    <a-row class="main">
      <a-col :md="12" :xs="24" class="main-left">
        <img src="../assets/home2-bg-icon.png" />

        <img src="../assets/md.png" />
      </a-col>
      <a-col :md="12" :xs="24" class="main-right">
        <div class="document">
          <dl>
            <dt>说明文档</dt>
            <dd>
              <CheckOutlined />
              <span>你可以使用 on line MD 来编写API文档以及数据库结构</span>
            </dd>
            <dd>
              <CheckOutlined />
              <span>也可以编写一些技术规范说明文档以供团队查阅</span>
            </dd>
            <dd>
              <CheckOutlined />
              <span>团队权限管理机制让团队良好地协同编写文档</span>
            </dd>
          </dl>
        </div>

        <a-button type="large">查看示例</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CheckOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "Index",
  components: {
    CheckOutlined,
  },
});
</script>

<style lang="scss" scope>
.index {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000;
  .main-left {
    text-align: right;
    padding-right: 30px;
  }
  .main-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-left: 30px;
    .document {
      dl {
        dt {
          color: #fff;
          font-size: 30px;
          font-weight: 600;
          padding-bottom: 20px;
        }
        dd {
          color: #fff;
          font-size: 20px;
          padding-bottom: 4px;
          text-align: left;
          span {
            margin-left: 10px;
          }
        }
      }
    }
    .ant-btn {
      width: 120px;
      height: 60px;
      border-radius: 10px;
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
</style>
