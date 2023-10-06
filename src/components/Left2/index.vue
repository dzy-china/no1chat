<template>
  <!--  通讯录  -->
  <div class="hs-width-250 hs-border-right-1-solid-gray-02 hs-col-" style="background: #E1DFDD;">
  <!-- 聊天人员搜索和添加群聊   -->
    <div class="hs-height-65 hs-background-color-white hs-row-around-center" style="-webkit-app-region: drag;">
      <!-- 输入框-->
      <div style="-webkit-app-region: no-drag" class="hs-row-start-center hs-background-color-gray-02 hs-padding-5 hs-border-radius-5 hs-box-sizing-border-box">
          <svg class="hs-color-gray" t="1689366273971"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5942" width="12" height="12"><path d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z" fill="currentColor" p-id="5943"></path></svg>

        <input placeholder="搜索" class="hs-ini hs-background-color-transparent hs-padding-left-right-5 hs-width-170 hs-height-15 hs-box-sizing-border-box" />
      </div>

      <!--   添加     -->
      <div style="-webkit-app-region: no-drag;" class="hs-background-color-gray-03 hs-row-center-center hs-height-25 hs-width-25 hs-cursor-pointer">
        <svg t="1689370082534" class="hs-color-gray" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="15" height="15"><path d="M938 490H534V86c0-12.2-9.8-22-22-22s-22 9.8-22 22v404H86c-12.2 0-22 9.8-22 22s9.8 22 22 22h404v404c0 12.2 9.8 22 22 22s22-9.8 22-22V534h404c12.2 0 22-9.8 22-22s-9.8-22-22-22z" fill="currentColor" p-id="2299"></path></svg>
      </div>
    </div>

    <!--   聊天列表     -->
    <div class="hs-flex-grow-1 hs-overflow-auto hs-scrollbar hs-child-height-50 hs-child-padding-10 hs-child-row-start-center hs-child-border-bottom-1-solid-gray-02 hs-child-hover-background-color-gray-02 hs-child-transition-05">
      <div @click="on_start_chat('助手')" :class="{'hs-background-color-gray-03': curChatId=='助手'}">
        <div class="hs-display-inline-flex hs-background-color-red hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" >头</div>
        <div class="hs-margin-left-10">助手</div>
      </div>

        <div @click="on_start_chat('张三啊')" :class="{'hs-background-color-gray-03': curChatId=='张三啊'}">
          <div class="hs-display-inline-flex hs-background-color-red hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" >头</div>
            <div class="hs-margin-left-10">张三啊</div>
        </div>

      <div @click="on_start_chat('李四')" :class="{'hs-background-color-gray-03': curChatId=='李四'}">
        <div class="hs-display-inline-flex hs-background-color-green hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" >头</div>
        <div class="hs-margin-left-10">李四</div>
      </div>
      <div @click="on_start_chat('王二')" :class="{'hs-background-color-gray-03': curChatId=='王二'}">
        <div class="hs-display-inline-flex hs-background-color-blue hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" >头</div>
        <div class="hs-margin-left-10">王二</div>
      </div>

    </div>
  </div>
</template>

<script setup>
/* 全局状态变量管理 */
import { useIsOpenChatStore } from "@/store/isOpenChat";
import { useCurChatIdStore } from "@/store/curChatId";
const {setIsOpenChat} = useIsOpenChatStore()
const curChatIdStore = useCurChatIdStore()
const curChatId = computed(()=>curChatIdStore.curChatId)

const on_start_chat = (id)=>{
  setIsOpenChat(true)
  curChatIdStore.setCurChatId(id)
}

</script>

<style scoped>

</style>