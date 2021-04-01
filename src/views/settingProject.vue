<template>
  <div class="settingProject">
    <div class="crad">
      <div class="back">
        <a-button @click="goback"><ArrowLeftOutlined /></a-button>
      </div>
      <div class="tab">
        <a-tabs class="basics" type="card" @tabClick="onTabClick">
          <a-tab-pane key="key1" tab="基础信息">
            <div class="input">
              <a-input v-model:value="basicsForm.name" placeholder="项目名称" />
              <a-input v-model:value="basicsForm.description" placeholder="项目描述" />
            </div>
            <div class="radio">
              <a-radio-group v-model:value="basicsForm.publics">
                <a-radio :style="radioStyle" :value="basicsForm.publics == true ? true:true">公开项目</a-radio>
                <a-radio :style="radioStyle" :value="basicsForm.publics == false ? false:false"> 私密项目 </a-radio>
              </a-radio-group>
            </div>
            <div class="passwrod">
              <a-input v-if="basicsForm.publics === false" v-model:value="basicsForm.password" placeholder="访问密码" />
            </div>
            <div class="submit">
              <a-button type="primary" @click="submitForm">提交</a-button>
            </div>
          </a-tab-pane>
          <a-tab-pane class="member" key="key2" tab="项目成员">
            <div class="add-member-btn">
              <a-button type="primary" @click="showModal">添加成员</a-button>
              <a-modal
                v-model:visible="visible"
                width="300px"
                title="添加成员"
                @ok="addMember"
              >
                <a-input v-model:value="addMemberForm.username" placeholder="请输入成员用户名" />
                <a-radio-group v-model:value="addMemberForm.roles" >
                  <a-radio :style="radioStyle" :value="readWrite == true ? false:true">只读</a-radio>
                  <a-radio :style="radioStyle" :value="readWrite == true ? true:true"> 读和编写 </a-radio>
                </a-radio-group>

              </a-modal>
            </div>
            <div class="table">
              <table>
                <tr>
                  <th>成员用户名</th>
                  <th>昵称</th>
                  <th>添加时间</th>
                  <th>权限</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td><div>592313592313592313592313</div></td>
                  <td><div>2141422222222222</div></td>
                  <td><div>214124222222222</div></td>
                  <td><div>214</div></td>
                  <td><div>421</div></td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
          <a-tab-pane class="setting" key="key3" tab="高级设置">
            <a-button title="你可以将项目转让他人" @click="transferClick"
              >转让</a-button
            >
            <a-modal
              v-model:visible="visibleTransfer"
              class="inputTransfer"
              width="300px"
              title="项目转接"
              @ok="addMember"
            >
              <a-input
                v-model:value="name"
                placeholder="请输入项目名称850171861"
              />
              <a-input v-model:value="username" placeholder="接收者用户名" />
              <a-input
                v-model:value="password"
                placeholder="请输入你的登录密码"
              />
            </a-modal>
            <a-button type="danger" @click="deleteClick">删除</a-button>
            <a-modal
              v-model:visible="deleteTransfer"
              class="deleteTransfer"
              width="300px"
              title="删除项目"
              @ok="addMember"
            >
              <a-input
                v-model:value="name"
                placeholder="请输入项目名称850171861"
              />
              <a-input
                v-model:value="password"
                placeholder="请输入你的登录密码"
              />
            </a-modal>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref,UnwrapRef } from "vue";
import { project,updateProject } from "@/api/project";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

interface BasicsFormInterface {
  name: string;
  description:string;
  publics:boolean;
  password: string;
}
interface addMemberForm {
  username: string;
  roles: boolean;
}
export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter()
    const goback = () => {
      router.go(-1)
    }
    const projectId = route.query.projectId
    const basicsForm: UnwrapRef<BasicsFormInterface> = reactive({
    name: '',
    description:'',
    publics:false,
    password: '',
  });
   const addMemberForm: UnwrapRef<addMemberForm> = reactive({
    username: '',
    roles:false
  });
    const value = ref<number>();
    const visible = ref<boolean>(false);
    const visibleTransfer = ref<boolean>(false);
    const deleteTransfer = ref<boolean>(false);
    const uuid = ref<string>('')
    const onTabClick = (tabKey: string) => {
      console.log("tab clicked : " + tabKey);
    };
     const radioStyle = reactive({
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    });
    
    const showModal = () => {
      visible.value = true;
    };
    const addMember = () => {
      if(addMemberForm.username === ''){
           message.error("用户名不能为空或者权限不能为空");
           return
      }
      console.log(addMemberForm)
      visible.value = false;
    };
    const transferClick = () => {
      visibleTransfer.value = true;
    };
    const deleteClick = () => {
      deleteTransfer.value = true;
    };

    project({ projectId: projectId }).then((res) => {
      if(res.data.code === 200){
          basicsForm.name = res.data.data[0].name
          basicsForm.description = res.data.data[0].description
          basicsForm.publics = res.data.data[0].publics
          basicsForm.password = res.data.data[0].password
          uuid.value = res.data.data[0].uuid
      }
    });
    const submitForm = () => {
      if(!basicsForm.publics){
         if(basicsForm.password === ''){
          message.error("访问密码不能为空");
          return
         }
      }
      updateProject({
        uuid:uuid.value,
        name: basicsForm.name,
        description: basicsForm.description,
        publics: basicsForm.publics,
        password: basicsForm.password,
        roles: ["create"],
      }).then((res)=>{
        if(res.data.code === 200){
          message.success("修改成功");
        }
      })
    }

    const readWrite = ref<boolean>(true)


    return {
      readWrite,
      goback,
      onTabClick,
      value,
      visible,
      showModal,
      addMember,
      visibleTransfer,
      transferClick,
      deleteTransfer,
      deleteClick,
      basicsForm,
      addMemberForm,
      radioStyle,
      submitForm
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
  width: 600px;
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
      .basics {
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
      .member {
        display: flex;
        flex-direction: column;
        .add-member-btn {
          text-align: left;
        }
        .table {
          width: 100%;
          table {
            width: 100%;
            tr {
              border-bottom: 1px solid #ebeef5;
              th {
                height: 50px;
                text-align: left;
                width: 108px;
                overflow: hidden;
              }
              td {
                width: 108px;
                text-align: left;
                padding: 12px 0;
                div {
                  width: 100%;
                  overflow: hidden;
                  white-space: normal;
                  word-break: break-all;
                }
              }
            }
          }
        }
      }
      .setting {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px 0;
        .ant-btn {
          width: 120px;
          height: 40px;
          font-size: 16px;
          margin-top: 30px;
        }
      }
    }
  }
}
.ant-modal-content {
  margin-top: 130px;
  .ant-modal-body {
    .ant-radio-group {
      margin-top: 20px;
    }
  }
}
.inputTransfer {
  input {
    margin-top: 10px;
  }
}
.deleteTransfer {
  input {
    margin-top: 10px;
  }
}
</style>