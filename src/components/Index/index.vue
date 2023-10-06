<template>

  <div class="hs-height-00100 hs-row-">
  <!--  左侧1  -->
    <Left1/>

    <!--  左侧2  -->
    <Left2/>

    <!--  左侧3  -->
    <component :is="currentComponent"></component>

    <!--  最大、最小、关闭、置顶  -->
    <WindowButton/>

  </div>

</template>

<script setup>
/* 全局状态变量管理 */
import { useIsOpenChatStore } from "@/store/isOpenChat";
const store = useIsOpenChatStore()

import Left1 from "com@/Left1"
import Left2 from "com@/Left2"
import Chat from "com@/Left3/Chat"
import Welcom from "com@/Left3/welcom"
import WindowButton from "com@/WindowButton"

// shallowRef包装组件类型变量
const currentComponent = shallowRef(Welcom)

// 监听全局状态变量
watch( ()=> store.isOpenChat, (newValue , oldValue)=>{
    if(newValue){
      currentComponent.value = Chat
    }else{
      currentComponent.value = Welcom
    }
});

</script>

<style scoped>

</style>