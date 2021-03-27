<template>
  <div class="settingProject">
    <div class="crad">
      <div class="back">
        <a-button><ArrowLeftOutlined /></a-button>
      </div>
      <div class="tab">
        <a-tabs class="basics" type="card" @tabClick="onTabClick">
          <a-tab-pane key="key1" tab="基础信息">
            <div class="input">
        <a-input v-model:value="value" placeholder="项目名称" />
        <a-input v-model:value="value" placeholder="项目描述" />
      </div>
       <div class="radio">
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" :value="3">公开项目</a-radio>
          <a-radio :style="radioStyle" :value="4"> 私密项目 </a-radio>
        </a-radio-group>
      </div>
       <div class="passwrod">
        <a-input v-if="value === 4" placeholder="访问密码" />
      </div>
      <div class="submit">
        <a-button type="primary">提交</a-button>
      </div>
          </a-tab-pane>
          <a-tab-pane class="member" key="key2" tab="项目成员">
            <div class="add-member-btn">
              <a-button type="primary" @click="showModal">添加成员</a-button>
    <a-modal v-model:visible="visible" width="300px" title="添加成员" @ok="handleOk">
      <a-input v-model:value="value" placeholder="请输入成员用户名" />
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" :value="3">只读</a-radio>
          <a-radio :style="radioStyle" :value="4"> 读和编写 </a-radio>
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
                 <tr>
                  <td>592313</td>
                  <td>21414</td>
                  <td>214124</td>
                  <td>214</td>
                  <td>421</td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const onTabClick = (tabKey: string) => {
      console.log("tab clicked : " + tabKey);
    };
    const value = ref<number>(1);
    const visible = ref<boolean>(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      onTabClick,
      value,
       visible,
      showModal,
      handleOk,
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
      .basics{
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
      .member{
        display: flex;
        flex-direction: column;
       .add-member-btn{
        text-align: left;
       }
       .table{
         width: 100%;
         table{
         width: 100%;
          tr{
            border-bottom: 1px solid #EBEEF5;
            th{
              height: 50px;
              text-align: left;
              width: 108px;
              overflow: hidden;
            }
            td{
              width: 108px;
              text-align: left;
              padding: 12px 0;
              div{
                width: 100%;
                overflow: hidden;
                white-space:normal;
                word-break: break-all;
              }
            }
          }
         }
       }
      }
    }
  }
}
.ant-modal-content{
  margin-top: 130px;
  .ant-modal-body{
    .ant-radio-group{
      margin-top: 20px;
    }
  }
}
</style>