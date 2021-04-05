<template>
<div class="documentIndex">
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
            style="height: 100%;"
          >

      <a-menu-item key="1" @click="errorCode">
        <FileOutlined />
        全局错误码
      </a-menu-item>
          <a-sub-menu key="sub1">
        <template #title>
          <span>
           <FolderOpenOutlined />
            <span>用户相关</span>
          </span>
        </template>
        <a-menu-item key="3" @click="userLogin">用户登录</a-menu-item>
        <a-menu-item key="4" @click="userRegister">用户注册</a-menu-item>
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
                    <a  @click="goback">返回</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a  @click="share">分享</a>
                  </a-menu-item>
                  <a-menu-item>
                    <router-link :to="{name:'demoCreate'}" >新建页面</router-link>
                  </a-menu-item>
                    <a-menu-item>
                    <a href="javascript:;" style="cursor: default;opacity: 0.2">新建目录</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" style="cursor: default;opacity: 0.2">编辑当前页面</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" style="cursor: default;opacity: 0.2">删除当前页面</a>
                  </a-menu-item>         
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <!-- 菜单end -->
          <!-- 标题 -->
          <div class="title"><h2>{{mdTitle}}</h2></div>
          <!-- 标题end -->
          <!-- 内容 -->
          <div id="vditor"></div>
          <!-- 内容end -->
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
  </div>
</template>
<script lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import { FileOutlined, FolderOpenOutlined } from "@ant-design/icons-vue";
import { defineComponent,ref} from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from 'vue-router'
import { message, Modal } from "ant-design-vue";


export default defineComponent({
  name:"doucmentIndex",
  components: {
    MenuOutlined,
    FileOutlined,
    FolderOpenOutlined,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const contentEditor = ref();
    const mdTitle = ref();
   const errorCode = () => {
     mdTitle.value = "全局错误码"
      contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        toolbarConfig: {
          pin: false,
        },
        after: () => {
          let value = "\n" +
        "|参数名|必选|" +
        "\n" +
        "|:----    |:---|" +
        "\n" +
        "|1001 |参数错误  |" +
        "\n" +
        "|1002 |缺少参数  |" +
        "\n" +
        "|1004  |认证失败  |"
          contentEditor.value.setValue(value);
        },
      });
   }
   const userLogin = () => {
     mdTitle.value = "用户登录"

     contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        toolbarConfig: {
          pin: false,
        },
        after: () => {
          let value = "\n" +
        "##### 简要描述" +
        "\n" +
        "- 用户登录接口" +
        "\n" +
        "##### 请求URL" +
        "\n" +
        "- ` /api/user/login `" +
        "\n" +
        "##### 请求方式" +
        "\n" +
        "- POST " +
        "\n" +
        "- ##### 参数 " +
        "\n" +
        "|参数名|必选|类型|说明|" +
        "\n" +
        "|:----    |:---|:----- |-----   |" +
        "\n" +
        "|username |是  |string |用户名   |" +
        "\n" +
        "|password |是  |string | 密码    |" +
        "\n" +
        "##### 返回示例 " +
        "\n" +
        ` 
        {
          "error_code": 0
          "data":{
            "username": "username",
          }
        }
              ` +
        "\n" +
        "|参数名|类型|说明|" +
        "\n" +
        "|:-----  |:-----|-----        " +
        "\n" +
        "|userid |int   |用户组id，1：超级管理员；2：普通用户  |" +
        "\n" +
        "##### 备注 " +
        "\n" +
        "- 更多返回错误代码请看首页的错误代码描述";
          contentEditor.value.setValue(value);
        },
      });
   }
   const userRegister = () => {
     mdTitle.value = "用户注册"

     contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        toolbarConfig: {
          pin: false,
        },
        after: () => {
          let value = "\n" +
        "##### 简要描述" +
        "\n" +
        "- 用户注册接口" +
        "\n" +
        "##### 请求URL" +
        "\n" +
        "- ` /api/user/register `" +
        "\n" +
        "##### 请求方式" +
        "\n" +
        "- POST " +
        "\n" +
        "- ##### 参数 " +
        "\n" +
        "|参数名|必选|类型|说明|" +
        "\n" +
        "|:----    |:---|:----- |-----   |" +
        "\n" +
        "|username |是  |string |用户名   |" +
        "\n" +
        "|password |是  |string | 密码    |" +
        "\n" +
        "|name     |否  |string | 昵称    |;" +
        "\n" +
        "##### 返回示例 " +
        "\n" +
        ` 
        {
          "error_code": 0
          "msg":0
        }
              ` +
        "\n" +
        "|参数名|类型|说明|" +
        "\n" +
        "|:-----  |:-----|-----        " +
        "\n" +
        "|userid |int   |用户组id，1：超级管理员；2：普通用户  |" +
        "\n" +
        "##### 备注 " +
        "\n" +
        "- 更多返回错误代码请看首页的错误代码描述";
          contentEditor.value.setValue(value);
        },
      });
   }
   // 返回
    const goback = () => {
      router.go(-1)
    }
    // 分享
    const share = () => {
      console.log(route.path)
      console.log(route.query)
      let secondsToGo = 10;
      const modal = Modal.success({
        title: `项目地址:http//wudongming.com/md${route.path}`,
      })
    const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `${secondsToGo}秒后自动关闭`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    };

    return {
      mdTitle,
      errorCode,
      userLogin,
      userRegister,
      goback,
      share
    };
  },
});
</script>
<style lang="scss" >
.documentIndex{
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
  min-height: 31px;
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


 .nav-text{
  display: block;
  width: 100%;
  height: 40px;
  margin: 4px 0;
  line-height: 40px;
  }

#vditor{
  text-align: left;
  border: 0;
  /* pointer-events: none;
  cursor: default; */
}
.vditor-toolbar,.vditor-sv{
  display: none !important;
}
.vditor-sv,
.vditor-preview {
  text-align: left;
  background-color: #fff;
  border:0
}
table{
  width: 100%;
}
tr {
  min-width: 100%;
}
th {
  min-width: 100%;
  color: #fff;
  background: #4ca3fd;
}
}




</style>