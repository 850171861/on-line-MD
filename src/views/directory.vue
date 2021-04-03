<template>
  <div class="directory">
    <div class="crad">
      <div class="menu">
        <a href="javascript:;" @click="goback">返回</a>
        <a href="javascript:;" @click="directoryClick">添加目录</a>
         <a-modal
              v-model:visible="visibleDirectory"
              class="inputDirectory"
              width="300px"
              title="添加目录"
              @ok="directoryOk"
            >
              <a-input
                class="username"
                v-model:value="directoryName"
                placeholder="请输入目录名"
              />
            </a-modal>
      </div>
      <div class="directory-list" v-for="(item,index) in directoryData" :key="index">
      <div class="name">{{item.directory.name}}</div>
     
      <div class="crud">
        <ul>
          <li><a href="javascript:;" @click="updateDirectoryClick(item.directory.id)"><EditOutlined /></a>
          </li>
           <div>
             <a-modal
              v-model:visible="visibleUpdateDirectory"
              class="inputDirectory"
              width="300px"
              title="修改目录"
              @ok="updateDirectoryOk"
            >
              <a-input
                class="username"
                v-model:value="directoryName"
                placeholder="请输入修改目录名"
              />
            </a-modal>
           </div>
          <li><a href="javascript:;" @click="deleteDirectoryClick(item.directory.id)"><DeleteOutlined /></a></li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router'
import { message } from "ant-design-vue";
import { createDirectory, getDirectory, updateDirectory, deleteDirectory } from '@/api/directory'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
  components:{
    EditOutlined,
    DeleteOutlined
  },
  setup(){
    // 返回
    const route = useRoute()
    const router = useRouter()
    const goback = () =>{
      router.go(-1)
    }
    const projectId = route.query.projectId
    console.log(projectId )
    // 添加目录
    const directoryName = ref<string>('')
    const visibleDirectory = ref<boolean>(false);
      const directoryClick = () => {
      visibleDirectory.value = true;
    };
    const directoryOk = () =>{
      if(directoryName.value === ''){
        message.error('目录不能为空')
        return
      }else{
        createDirectory({projectId:projectId,name:directoryName.value}).then(res => {
          if(res.data.code !== 200){
            message.error(res.data.msg)
          }else{
            directory()
            message.success('添加成功')
            visibleDirectory.value = false;
          }
        })
      }
    }

    // 获取目录
    const directoryData = ref([])
    const directory = () => {
      getDirectory({projectId:projectId}).then(res => {
        if(res.data.code === 200){
            directoryData.value = res.data.data
        }
      })
    }
    onMounted(() => {
      directory()
    })

    // 修改目录
    let directory_id = ref<string>('')
    const visibleUpdateDirectory = ref<boolean>(false);
    const updateDirectoryClick = (id:string) =>{
      directory_id.value = id
      visibleUpdateDirectory.value = true;
    }
    const updateDirectoryOk = () =>{
      if(directoryName.value === ''){
        message.error('修改目录不能为空')
        return
      }else{
      updateDirectory({projectId:projectId,directory_id:directory_id.value,name:directoryName.value}).then(res=>{
        if(res.data.code === 200){
          directory()
           message.success('修改成功')
          visibleUpdateDirectory.value = false;
        }
      })
      }
    }
    // 删除目录
    const deleteDirectoryClick = (id:string) =>{
      deleteDirectory({projectId:projectId,directory_id:id}).then(res => {
        if(res.data.code === 200){
          directory()
          message.success('删除成功')

        }
      })
    }
    return{
      goback,
      directoryName,
      visibleDirectory,
      directoryClick,
      directoryOk,
      directoryData,
      visibleUpdateDirectory,
      updateDirectoryClick,
      updateDirectoryOk,
      deleteDirectoryClick
    }

  }
})
</script>

<style lang="scss" scoped>
.directory{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  .crad{
    width: 600px;
    min-height: 500px;
    max-height: 90%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    box-shadow: 0 2px 12px 0 #DCDCDC;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    .menu{
      width: 560px;
      height: 50px;
      color: #409EFF;
      font-size: 16px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
    }

    .directory-list{
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .crud{
        ul{
          display: flex;
          list-style: none;
          li{
            width: 34px;
            color: #409EFF;
          }
        }
      }
    }
  }
}
</style>