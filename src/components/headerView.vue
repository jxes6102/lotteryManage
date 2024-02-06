<template>
    <div class="transition-all sticky w-full top-0 left-0 z-10 flex flex-wrap justify-around items-center bg-[#212529]">
        <div 
            @click="changeMenu"
            class="absolute left-[10px] md:left-[20px] top-[calc(50%_-_15px)] md:top-[calc(50%_-_20px)] cursor-pointer">
            <el-icon :size="isMobile ? '30' : '40'" color="#ffffff" ><Menu /></el-icon>
        </div>
        <div
            @click="toHome"
            class="relative w-[auto] h-[8vh] text-white text-xl md:text-3xl flex flex-wrap justify-center items-center font-extrabold"
            >{{ headerTitle }}
        </div>
        <div 
            class="absolute right-[10px] md:right-[20px] top-[calc(50%_-_0.5rem)] md:top-[calc(50%_-_0.5rem)] text-white text-sm md:text-base">
            {{ userData.name }}
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useMobileStore,useMenuStore,useUserStore } from '@/stores/index'

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()
const menuStore = useMenuStore()
const userStore = useUserStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const userData = computed(() => {
  return userStore.information
})

const changeMenu = () => {
    menuStore.setMenu()
}

const headerTitle = ref('E管理')

const toHome = () => {
    router.push({path:'/'})
    if(mobileStore.isMobile){
        menuStore.closeMenu()
    }
}

</script>

<style lang="scss" scoped>
</style>