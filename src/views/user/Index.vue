<template>
  <div class="user-index">
    <a-row class="card">
      <a-col :md="6" :sm="12" :xs="24">
        <a
          >API文档实例<i title="项目设置" class="setting"><SettingOutlined /></i
          ><i title="这是一个私有项目" class="lock"><UnlockOutlined /></i
        ></a>
      </a-col>
      <a-col :md="6" :sm="12" :xs="24"> <a>我的项目</a> </a-col>

      <a-col :md="6" :sm="12" :xs="24">
        <a
          >新建项目 <i><PlusOutlined /></i
        ></a>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  SettingOutlined,
  UnlockOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "userIndex",
  components: {
    SettingOutlined,
    UnlockOutlined,
    PlusOutlined,
  },
});
</script>

<style lang="scss" scope>
.user-index {
  width: 920px;
  margin: 0 auto;
  padding: 20px;
  .card {
    .ant-col {
      margin-bottom: 14px;
      a {
        position: relative;
        display: inline-block;
        width: 94%;
        height: 110px;
        color: #444;
        font-family: "微软雅黑";
        font-weight: 600;
        background-color: #fff;
        border: 1px solid #ddd;
        font-size: 15px;
        text-align: center;
        line-height: 110px;
        border-radius: 4px;
        margin-left: 6%;
        &:hover {
          background: #f2f5e9;
        }
        .setting {
          display: none;
        }
        &:hover .setting {
          display: block;
          width: 30px;
          height: 30px;
          position: absolute;
          right: 10px;
          top: 8px;
          span {
            position: absolute;
            right: 0;
            top: 0;
            svg {
              width: 14px;
            }
          }
        }
        .lock {
          display: none;
        }
        &:hover .lock {
          display: block;
          width: 30px;
          height: 30px;
          position: absolute;
          bottom: 0px;
          right: 10px;
          span {
            position: absolute;
            right: 0;
            top: 0;
            svg {
              width: 14px;
            }
          }
        }
      }
    }
  }
}
</style>