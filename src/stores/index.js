import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', () => {
    const width = ref(0)
    const isMobile = computed(() => {
        return width.value <= 768
    })
    const setMobile = (value) => {
        width.value = value
    }

    return { width, isMobile ,setMobile }
})

export const useMenuStore = defineStore('menu', () => {
    const status = ref(false)
    const setMenu = () => {
        status.value = !status.value 
    }
    const closeMenu = () => {
        status.value = false
    }
    const openMenu = () => {
        status.value = true
    }
    return { status,setMenu,closeMenu,openMenu }
})

export const useheaderStore = defineStore('header', () => {
    const status = ref(false)
    const setHeader = () => {
        status.value = !status.value 
    }
    const closeHeader = () => {
        status.value = false
    }
    const openHeader = () => {
        status.value = true
    }
    return { status,setHeader,closeHeader,openHeader }
})

export const useLoginStore = defineStore('login', () => {
    const status = ref(false)
    const setIsLogin = () => {
        status.value = true
    }
    const setToken = (value) => {
        status.value = true
        localStorage.setItem("lotteryToken", value)
    }
    const clearToken = () => {
        status.value = false
        localStorage.removeItem("lotteryToken")
    }
    return { status,setToken,clearToken,setIsLogin }
})

export const useUserStore = defineStore('user', () => {
    const information = ref({})
    const setUserInformation = (value) => {
        information.value = value
        console.log('information.value',information.value )
    }
    const clearUserInformation = () => {
        information.value = {}
    }
    return { information,setUserInformation,clearUserInformation }
})
