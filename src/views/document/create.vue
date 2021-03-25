<template>
  <div class="create">
    <div class="mark-down-top">
       <a-button type="primary" @click="a">API接口模板</a-button>
   </div>
    <markdown />
  </div>
</template>

<script lang="ts">
import markdown from '@/components/MarkDonw.vue'
import {  defineComponent,provide } from 'vue'
export default defineComponent({
  name:"doucmentCreate",
  components:{
    markdown
  },
  setup(){
     const a = () =>{
      provide("message", "我是父组件向子组件传递的值"); 

     }
    

    return{
      a
    }
  }
})
</script>

<style scope>
.create{
  width: 90%;
  margin: 0 auto;
}
.vditor-preview__action{
  display: none;
}
.vditor-sv,.vditor-preview {
  text-align: left;
  background-color: #fff;
}

tr{
  min-width: 100px;
}
th{
  min-width: 100px;
  color: #fff;
  background:#4CA3FD;
}
</style>