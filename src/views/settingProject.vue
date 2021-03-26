<template>
  <div class="settingProject">
    <div class="crad">
      <div class="back">
        <a-button><ArrowLeftOutlined /></a-button>
      </div>
      <div class="tab">
        <a-tabs type="card" @tabClick="onTabClick">
          <a-tab-pane key="key1" tab="选项卡一">22222222</a-tab-pane>
          <a-tab-pane key="key2" tab="选项卡二">选项卡二内容</a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const onTabClick = (tabKey: string) => {
      console.log("tab clicked : " + tabKey);
    };
    return {
      onTabClick,
    };
  },
});
</script>

<style lang="scss" scope>
.settingProject {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  width: 460px;
  .crad {
    position: relative;
    overflow: hidden;
    margin: 0 5%;
    .back {
      position: absolute;
      left: 0;
      top: 20px;
      .ant-btn {
        border-color: #fff;
      }
    }
    .tab {
      margin-top: 60px;
    }
  }
}
</style>