<template>
  <div class="user-index">
    <a-row class="card">
      <a-col :md="6" :sm="12" :xs="24">
        <a
          >API文档实例
          <i title="项目设置" class="setting"><SettingOutlined /></i
          ><i title="这是一个私有项目" class="lock"><UnlockOutlined /></i
        ></a>
      </a-col>
      <a-col
        :md="6"
        :sm="12"
        :xs="24"
        v-for="(item, index) in projectList"
        :key="index"
      >
        <router-link
          :to="{ name: 'documentIndex', query: { projectId: item._id } }"
          >{{ item.name }}
          <router-link :to="{ name: 'userIndex' }" class="setting">
            <i title="项目设置"> <SettingOutlined /></i>
          </router-link>

          <i title="这是一个私有项目" class="lock" v-if="item.publics == true"
            ><UnlockOutlined /></i
        ></router-link>
      </a-col>

      <a-col :md="6" :sm="12" :xs="24">
        <a
          >新建项目 <i><PlusOutlined /></i
        ></a>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import {
  SettingOutlined,
  UnlockOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { project } from "@/api/project";

export default defineComponent({
  name: "userIndex",
  components: {
    SettingOutlined,
    UnlockOutlined,
    PlusOutlined,
  },
  setup() {
    const projectList = ref("");
    onMounted(() => {
      project().then((res) => {
        if (res.data.code === 200) {
          projectList.value = res.data.data;
        }
      });
    });

    return {
      projectList,
    };
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
          background: #f2f5e9;
          position: absolute;
          right: 10px;
          top: 8px;
          border: 0;

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