import { ref,onMounted,onUnmounted, reactive } from 'vue'
interface FormState {
  username: string;
  name: string;
  password: string;
  ver: string;
}
function vaildateForm(){
   const formState = reactive({
      username: "",
      name: "",
      password: "",
      ver: "",
    });
   const messageName = ref("");
    const name_blur = () => {
      if (formState.name == "") {
        messageName.value = "昵称不能为空";
      } else {
        messageName.value = "";
      }
    };
  
   return { messageName, name_blur }
}

export default vaildateForm