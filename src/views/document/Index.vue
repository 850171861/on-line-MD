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
               <a-menu-item v-for="item in pageData" :key="item._id">
              <video-camera-outlined />
              <span class="nav-text" @click="getMdContent(item.directory.id,'page')">
                <FileOutlined />
                {{item.directory.name}}</span
              >
            </a-menu-item>
  
            <a-sub-menu v-for="(item,index) in directoryData" :key="index">
              <template #title>
                <span class="nav-text" @click="getDirectoryId(item.directory.id)">
                  <FolderOpenOutlined />
                  {{item.directory.name}}  
                </span>
              </template>
              <a-menu-item :key="itemChildren.id" v-for="itemChildren in item.children.directory_item" @click="getMdContent(itemChildren.id)">{{itemChildren.name}}</a-menu-item>
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
                  <div v-if="rolesData === 'create' || rolesData === 'read-write'">
                    <a-menu-item>
                    <router-link  :to="{name:'directory',query:{projectId:projectId}}">新建目录</router-link>
                  </a-menu-item>
                  <a-menu-item>
                    <router-link :to="{name:'documentCreate',query:{projectId:projectId}}" >新建页面</router-link>
                  </a-menu-item>
                  <a-menu-item>
                    <router-link :to="{name:'documentUpdate',query:{doucmentId: doucmentId,projectId:projectId,directoryId:directoryid}}">编辑当前页面</router-link>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="deleteMdDocument">删除当前页面</a>
                  </a-menu-item>
                  </div>
                   <div v-else>
                      <a-menu-item>
                    <a href="javascript:;">无权限新建目录</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">无权限新建页面</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">无权限编辑当前页面</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">无权限删除当前页面</a>
                  </a-menu-item>
                   </div>
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
import { defineComponent,onMounted, ref,computed } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from 'vue-router'
import { getDirectory } from '@/api/directory'
import { getDocument, deleteDocument } from '@/api/document'
import { message } from "ant-design-vue";
import { project } from '@/api/project'
import { useStore } from "vuex";

export default defineComponent({
  name:"doucmentIndex",
  components: {
    MenuOutlined,
    FileOutlined,
    FolderOpenOutlined,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const projectId = route.query.projectId
    const directoryData = ref([])
    const pageData = ref([])
    // 获取侧边栏目录
    const getSideDirectory = () => {
         getDirectory({projectId:projectId}).then(res => {
        if(res.data.code === 200){
          pageData.value = res.data.data.filter((item:any) => {
            return item.page === true
          })
          directoryData.value = res.data.data.filter((item:any) => {
            return item.page !== true
          })
          directoryData.value.forEach((element:any) => {
            element.children = element.children[0] || {}
          });
        }
      })
    }
    // 获取文档
    const mdTitle = ref<string>('')
    const mdContent = ref<string>('')
    const contentEditor = ref();
    const doucmentId = ref<string>('')
    const getMdContent = (id:string,ispage:string) => {
         doucmentId.value = id
         if(ispage === 'page'){
           directoryid.value = ''
         }
        getDocument({id:id}).then((res:any) => {
          if(res.data.code === 200){
            mdTitle.value = res.data.data.title
            mdContent.value = res.data.data.content
        contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
       toolbarConfig:{
         hide:true
       },
        after: () => {
          contentEditor.value.setValue(mdContent.value);
        },
      });
          }
        })
    }
    // 获取目录id
    const directoryid = ref<string>('')
    const getDirectoryId = (directoryId:string) => {
      directoryid.value = directoryId
    }
    // 删除文档
    const deleteMdDocument = () => {
      deleteDocument({projectId:projectId,id:doucmentId.value,directoryId:directoryid.value}).then((res) => {
        if(res.data.code === 200){
          message.success('删除成功')
          getSideDirectory()
        mdTitle.value = ''
        mdContent.value = ''
        contentEditor.value = new Vditor("vditor", {
        minHeight: 0,
        after: () => {
          contentEditor.value.setValue('');
        },
      });
        }
      })
    }
    // 项目权限
    const store = useStore();
    const projectRoles = computed(() => store.state.project);
    const rolesData = ref('')
    const roles = () => {
      project({projectUUID:projectId}).then((res) => {
        if(res.data.code === 200){
          if(res.data.data.password){
            if(!projectRoles.value){
            router.push({name:'ProjectPassword', query:{projectId:projectId}})
            }
          }
        }
      })
    }
    // 返回
    const goback = () => {
      router.go(-1)
    }

    onMounted(() => {
      getSideDirectory()
      roles()
    })
    return {
      projectId,
      pageData,
      directoryData,
      mdContent,
      mdTitle,
      getMdContent,
      deleteMdDocument,
      getDirectoryId,
      doucmentId,
      directoryid,
      rolesData,
      goback
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
tr {
  min-width: 100px;
}
th {
  min-width: 100px;
  color: #fff;
  background: #4ca3fd;
}
}




</style>