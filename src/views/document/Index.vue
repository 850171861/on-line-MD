<template>
  <a-layout>
    <a-layout-content style="padding: 0 50px; width: 1200px; margin: 0 auto">
      <a-layout style="padding: 24px 0; ">
        <a-layout-sider
          width="200"
          style="background: #fff"
          breakpoint="lg"
          collapsed-width="0"
          @breakpoint="onBreakpoint"
        >
          <a-menu
            mode="inline"
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            style="height: 100%;"
          >
            <a-menu-item key="0">
              <video-camera-outlined />
              <span class="nav-text">
                <FileOutlined />
                nav 2</span
              >
            </a-menu-item>
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <FolderOpenOutlined />
                  subnav 1
                </span>
              </template>
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <FolderOpenOutlined />
                  subnav 2
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <FolderOpenOutlined />
                  subnav 3
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content
          :style="{ padding: '0 24px', minHeight: '750px',background:'#fff', boxShadow:'0 1px 6px #ccc', marginLeft:'200px', width: 'auto' }"
        >
          <!-- 菜单 -->
          <div class="menu">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <MenuOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">返回</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">新建页面</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">编辑当前页面</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">删除当前页面</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <!-- 菜单end -->
          <!-- 标题 -->
          <div class="title"><h2>标题</h2></div>
          <!-- 标题end -->
       
           <div class="content">
            内容
           </div>

        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { FileOutlined, FolderOpenOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name:"doucmentIndex",
  components: {
    MenuOutlined,
    FileOutlined,
    FolderOpenOutlined,
  },
  setup() {
   

    return {
      selectedKeys2: ref<string[]>(["1"]),
      openKeys: ref<string[]>(["sub1"]),

    };
  },
});
</script>
<style>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
.ant-layout-content {
  position: relative;
}
.menu {
  position: absolute;
  top: 12px;
  right: 24px;
}
.menu span {
  color: #101010;
}

.menu span svg {
  width: 26px;
  height: 26px;
}
.title {
  height: auto;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
  width: 100%;
  margin: 10px auto;
  text-align: center;
}
.title h2 {
  font-weight: 600;
  font-size: 20px;
  margin: 0;
}
.ant-menu-submenu {
  text-align: left;
}
.ant-menu-item {
  text-align: left;
}
.ant-layout-sider{
  position: fixed;
  height: 100%;
}
.ant-menu-light{
  background-color: #F0F2F5;
   border: 1px solid #E6E7E8;
}
.ant-menu-light:hover{
  border:1px solid #FFFFFF;
}

</style>