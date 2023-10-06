<template>
  <!--  聊天处  -->
  <div class="hs-flex-grow-1 hs-col- hs-flex-grow-1" >
    <!-- 头部 -->
    <div class="hs-height-65 hs-border-bottom-1-solid-gray-02 hs-row-start-center hs-padding-left-30 hs-font-size-0105" style="-webkit-app-region: drag;">
      {{curChatId}}
    </div>

    <!-- 消息展示区 -->
    <div ref="ref_msg_out" class="hs-flex-grow-1 hs-scrollbar hs-padding-left-right-30 hs-padding-top-bottom-10 hs-box-sizing-border-box">

    </div>

    <!-- 消息发送区 -->
    <div class="hs-height-145 hs-col-" >
      <!-- 输入资源选择 -->
      <div class="hs-height-35 hs-row-start-center hs-padding-left-30 hs-border-top-1-solid-gray-02 hs-border-bottom-1-solid-gray-02">
        <svg t="1689277969256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2338" width="20" height="20"><path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536" p-id="2339"></path><path d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036" fill="#231F20" p-id="2340"></path><path d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137" fill="#231F20" p-id="2341"></path><path d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048" fill="#231F20" p-id="2342"></path><path d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294" fill="#231F20" p-id="2343"></path></svg>
      </div>

      <!--输入框 -->
      <div ref="ref_msg_input" @keydown.enter.prevent="on_send_msg"  class="hs-box-sizing-border-box hs-width-00100 hs-flex-grow-1 hs-padding-15 hs-overflow-auto hs-scrollbar" contenteditable >
      </div>

      <!-- 发送按钮 -->
      <div class="hs-height-60 hs-row-end-start hs-padding-right-30">
        <button @click="on_send_msg" type="button" class="hs-ini hs-width-100 hs-height-30 hs-color-success hs-font-weight-bold hs-background-color-gray-02 hs-hover-background-color-gray-03 hs-border-radius-5 hs-cursor-pointer">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* 全局状态变量管理 */
import { useCurChatIdStore } from "@/store/curChatId";
const curChatIdStore = useCurChatIdStore()
const curChatId = computed(()=>curChatIdStore.curChatId)

    /* 导入 主进程api */
    const  { ipcRenderer, onAcceptMainMsg} =  window.electronAPI

    // data数据
    const ref_msg_out = ref(null) // 消息展示区
    const ref_msg_input = ref(null) // 消息输入区
    const ref_msg_input_val = ref("") // 消息输入区值

    // 发送消息
    const on_send_msg = ()=>{
      // 获取输入的原始数据
      ref_msg_input_val.value = ref_msg_input.value.innerHTML.trim()

      // 如果是空字符串，则不做处理
      if(!ref_msg_input_val.value) return

      // 消息传递给主进程
      ipcRenderer.send('toMainMsg', ref_msg_input_val.value)

      // 把发送信息放进消息展示区
      const my_msg =   `<div class='hs-padding-top-bottom-5 hs-float-right hs-clear-both hs-row-'>
              <div class='hs-display-inline-block hs-padding-10 hs-border-radius-5 hs-position-relative hs-margin-right-15  chat-bubble' style="background-color: #95EC69">
                  <div >${ref_msg_input_val.value}</div>
                </div>
                <div class="hs-display-inline-flex hs-background-color-red hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" style="margin-top: calc(20px - 15px);">我</div>
          </div>`

      ref_msg_out.value.innerHTML+= my_msg

      // 初始化输入框
      ref_msg_input.value.innerHTML = ""

      // 保持滚动到底部
      ref_msg_out.value.scrollTop = ref_msg_out.value.scrollHeight;

    }

    // 监听消息回复
    onAcceptMainMsg( (event,data)=>{
      // Uint8Array数据转为utf8字符串数据
      const decoder = new TextDecoder("utf-8");
      const utf8String = decoder.decode(data);

      // 把发送信息放进消息展示区
      const my_msg =   `<div class='hs-padding-top-bottom-5 hs-float-left hs-clear-both'>
            <div class="hs-display-inline-flex hs-background-color-green hs-color-white hs-font-weight-bold hs-width-30 hs-height-30  hs-row-center-center" style="margin-top: calc(20px - 15px);">张</div>

              <div class='hs-display-inline-block hs-padding-10 hs-border-radius-5 hs-position-relative hs-margin-right-15'>
                  <div >${utf8String}</div>
                </div>
          </div>`

      ref_msg_out.value.innerHTML+= my_msg

      // 保持滚动到底部
      ref_msg_out.value.scrollTop = ref_msg_out.value.scrollHeight;
    })
</script>

<style>
  .chat-bubble::before {
    content: "";
    position: absolute;
    border-width: 10px;
    border-style: solid;
    border-color: transparent  transparent transparent #95EC69;
    right: -20px;
    top: 10px;
  }
</style>