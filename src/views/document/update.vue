<template>
  <div class="create">
    <div class="mark-down-top">
      <div class="left">
        <label class="title">标题:</label>
        <a-input v-model:value="mdTitle" class="titleInput" />
        <label class="cate">目录:</label>
        <a-select
          v-model:value="defaultSelectDirectory"
          style="width: 200px"
          @focus="focus"
          ref="select"
          @change="handleChange"
        >
          <a-select-option :value="item.directory.id" v-for="(item,index) in directoryData" :key="index">
            <span v-if="!item.page">{{item.directory.name}}</span>
            </a-select-option>
          <a-select-option value="">无</a-select-option>
        </a-select>
      </div>
      <div class="right">
        <a-button type="primary" @click="save">保存</a-button>
        <a-button>返回</a-button>
      </div>
    </div>
    <div class="mark-down-template">
      <a-button @click="apiTemplate">API接口模板</a-button>
      <a-button @click="dataTemplate">数据表模板</a-button>
    </div>
    <div id="vditor"></div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { useRoute, useRouter } from 'vue-router'
import { getDirectory } from '@/api/directory'
import { createDirectory } from '@/api/document'
import { message } from "ant-design-vue";
import { getDocument, updateDocument } from '@/api/document'
export default defineComponent({
  name: "doucmentCreate",
  setup() {
    const router = useRouter()
    const projectId = useRoute().query.projectId
    const doucmentId = useRoute().query.doucmentId
    const directoryId = useRoute().query.directoryId 
    const seleteDirectory = ref<any>("");
    const apiTemplate = () => {
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
        "|groupid |int   |用户组id，1：超级管理员；2：普通用户  |" +
        "\n" +
        "##### 备注 " +
        "\n" +
        "- 更多返回错误代码请看首页的错误代码描述";
          contentEditor.value.setValue(value);
        },
      });
    };
    const dataTemplate = () => {
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
        "-  用户表，储存用户信息" +
        "\n" +
        "\n" +
        "|参数名|必选|类型|说明|" +
        "\n" +
        "|:----|:---|:-----|-----|" +
        "\n" +
        "|uid|int(10)|否|||" +
        "\n" +
        "|username |varchar(20) |否 |    |   用户名  |" +
        "\n" +
        "|password |varchar(50) |否   |    |   密码    |" +
        "\n" +
        "|name     |varchar(15) |是   |    |    昵称     |" +
        "\n" +
        "|reg_time |int(11)     |否   | 0  |   注册时间  |" +
        "\n" +
        "- 备注：无";
          contentEditor.value.setValue(value);
       }
       })
    };
    const handleChange = (value: string) => {
      seleteDirectory.value = `${value}`
    };
    
   
    // 获取目录
    const directoryData = ref([])
    const defaultSelectDirectory = ref<string>('')
    const directory = () => {
      getDirectory({projectId:projectId}).then(res => {
        if(res.data.code === 200){
            directoryData.value = res.data.data
            seleteDirectory.value = res.data.data.find((item:any) => {
              return item.directory.id === directoryId
            })
            defaultSelectDirectory.value = seleteDirectory.value.directory.name
            seleteDirectory.value = seleteDirectory.value.directory.id
        }
      })
    }
 
     // 获取文档
    const mdTitle = ref<string>('')
    const mdContent = ref<string>('')
    const contentEditor = ref();
    const getMdContent = (id:any) => {
        getDocument({id:id}).then((res:any) => {
          if(res.data.code === 200){
            mdTitle.value = res.data.data.title
            mdContent.value = res.data.data.content
        contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        after: () => {
          contentEditor.value.setValue(mdContent.value);
        },
      });
          }
        })
    }
    onMounted(() => {
      getMdContent(doucmentId)
      directory()
    })

    // 保存
    const save = () =>{
      if(mdTitle.value ==='' || contentEditor.value.vditor.element.innerText === ''){
        message.error('标题或内容不能为空')
        return
      }
      updateDocument({
        id:doucmentId,
        projectId:projectId,
        directoryId:seleteDirectory.value,
        title:mdTitle.value,
        content:contentEditor.value.vditor.sv.element.innerText
        })
      .then((res:any) => {
        if(res.data.code === 200){
          message.success('保存成功')
          router.push({name:'documentIndex', query:{projectId:projectId}})
        }
      })
    }
  

    return {
      apiTemplate,
      dataTemplate,
      mdTitle,
      handleChange,
      directoryData,
      save,
      defaultSelectDirectory
    };
  },
});
</script>

<style lang="scss" scope>
.mark-down-top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .left {
    display: flex;
    color: #606266;
    .title,
    .cate {
      width: 60px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
    .titleInput {
      width: 200px;
      height: 32px;
    }
  }
  .right {
    .ant-btn {
      height: 32px;
      margin-right: 10px;
    }
  }
}
.mark-down-template {
  display: flex;
  margin: 20px 0;
  .ant-btn {
    color: #606266;
    width: 120px;
    height: 36px;
    font-size: 14px;
    padding: 10px;
    line-height: 12px;
    margin-right: 10px;
  }
}
.create {
  width: 90%;
  margin: 0 auto;
}
.vditor-preview__action {
  display: none;
}
.vditor-sv,
.vditor-preview {
  text-align: left;
  background-color: #fff;
}

tr {
  min-width: 100px;
}
th {
  min-width: 100px;
  color: #fff;
  background: #4ca3fd;
}

.ant-select-item{
  min-height: auto;
  height: auto;
  padding: 0;
}
</style>