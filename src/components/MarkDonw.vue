<template>
<h2>{{childMessage}}</h2>
  <div id="vditor"></div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent,inject } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
export default defineComponent({
  setup(){
    const contentEditor = ref("");
    const childMessage  = inject("message");
     
onMounted(() => {
  contentEditor.value = new Vditor("vditor", {
    height: 'auto',
    mode: 'sv',
    minHeight:500,
    width:'auto',
    hideToolbar:false,
    toolbarConfig: {
    pin: false,
    },
    after: () => {
      contentEditor.value.setValue("体验一下呗");
    },
  })
});
return {
      childMessage
    }
  }
  
})

  



</script>
<style scope>
a {
  color: #42b983;
}

</style>
