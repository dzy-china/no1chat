import { defineStore } from 'pinia'
import { ref} from "vue";

export const useCurChatIdStore = defineStore('curChatId', () => {
    const curChatId = ref('')

    function setCurChatId(val) {
        curChatId.value = val
    }

    return {
        curChatId,
        setCurChatId
    }
})