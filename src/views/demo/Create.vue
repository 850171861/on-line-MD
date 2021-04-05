<template>
  <div class="create">
    <div class="mark-down-top">
      <div class="left">
        <label class="title">标题:</label>
        <a-input v-model:value="title" class="titleInput" />
        <label class="cate">目录:</label>
        <a-select
          v-model:value="value1"
          style="width: 200px"
          @focus="focus"
          ref="select"
        >
          <a-select-option value="">无</a-select-option>
        </a-select>
      </div>
      <div class="right">
        <a-button type="primary" @click="save">保存</a-button>
        <a-button @click="goback">返回</a-button>
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
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";

export default defineComponent({
  name: "doucmentCreate",
  setup() {
    const router = useRouter()
    const title = ref<string>("");
    const contentEditor = ref();
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

    
   

  
    onMounted(() => {
       contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        toolbarConfig: {
          pin: false,
        },
        after: () => {
          contentEditor.value.setValue("体验一下呗");
        },
      });
    })

    // 保存
    const save = () =>{
        message.error('示例无法保存')
        return
    }
     // 返回
    const goback = () => {
      router.go(-1)
    }

    return {
      apiTemplate,
      dataTemplate,
      title,
      save,
      goback
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