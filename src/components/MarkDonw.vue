<template>
  <div id="vditor"></div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, watch } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default defineComponent({
  props: {
    context: String,
  },
  setup(props) {
    const contentEditor = ref();
    watch(props, () => {
      contentEditor.value = new Vditor("vditor", {
        height: "auto",
        mode: "sv",
        minHeight: 500,
        width: "auto",
        toolbarConfig: {
          pin: false,
        },
        after: () => {
          contentEditor.value.setValue(props.context);
        },
      });
    });
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
    });

    return {
     
    };
  },
});
</script>
<style scope>
a {
  color: #42b983;
}
</style>
