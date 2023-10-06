import { defineStore } from 'pinia'
import { ref} from "vue";

export const useIsOpenChatStore = defineStore('isOpenChat', () => {
    const isOpenChat = ref(false)

    function setIsOpenChat(boolean) {
        isOpenChat.value = boolean
    }

    return {
        isOpenChat,
        setIsOpenChat
    }
})