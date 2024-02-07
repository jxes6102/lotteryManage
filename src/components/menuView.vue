<template>
    <div class="fixed top-[8vh] left-0 w-[100vw] md:w-[200px] h-[92vh] bg-[#F8F9FA] flex flex-col justify-start items-center z-50">
        <template v-for="(item,index) in urlData" :key="index">
            <div 
                @click="toLink(item?.url)"
                :class="item?.url ? 'cursor-pointer' : ''"
                class="w-full text-2xl font-medium mt-4 flex flex-wrap justify-center items-center">
                <el-icon v-if="item?.icon">
                    <component :is="item?.icon"></component>
                </el-icon>
                {{item.name}}
            </div>
            <template v-for="(thing,key) in item.children" :key="key">
                <div
                    @click="toLink(thing?.url)" 
                    class="w-full text-2xl font-medium mt-1 flex flex-wrap justify-center items-center cursor-pointer">
                    <el-icon>
                        <component :is="thing.icon"></component>
                    </el-icon>
                    {{thing.name}}
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useMenuStore,useMobileStore,useAnnounceStore,useLoginStore,useUserStore } from '@/stores/index'
import { doLoginOut } from '@/api/login'
import 'animate.css'

const router = useRouter()
const menuStore = useMenuStore()
const mobileStore = useMobileStore()
const announceStore = useAnnounceStore()
const loginStore = useLoginStore()
const userStore = useUserStore()

const urlData = ref([
    // {
    //     name:'系統管理',
    //     children:[
    //         {
    //             name:'基本參數',
    //             icon:'Document',
    //             url:'/parameterView'
    //         },
    //         {
    //             name:'權限管理',
    //             icon:'Avatar',
    //             url:'/permissionView'
    //         },
    //     ]
    // },
    // {
    //     name:'訊息E點通',
    //     children:[
    //         {
    //             name:'組織管理',
    //             icon:'AddLocation',
    //             url:'/organizeView'
    //         },
    //         {
    //             name:'公告管理',
    //             icon:'Service',
    //             url:'/newsView'
    //         },
    //         {
    //             name:'積分管理',
    //             icon:'Coin',
    //             url:'/pointView'
    //         },
    //         {
    //             name:'推播通知',
    //             icon:'Phone',
    //             url:'/notificationView'
    //         },
    //         {
    //             name:'使用者管理',
    //             icon:'User',
    //             url:'/userView'
    //         },
    //     ]
    // },
    {
        name:'使用者管理',
        icon:'User',
        url:'/userView'
    },
    {
        name:'家長管理',
        icon:'Avatar',
        url:'/parentView'
    },
    {
        name:'日程管理',
        icon:'Calendar',
        url:'/scheduleView'
    },
    {
        name:'豋出',
        url:'/loginView'
    },
]) 

const toLink = async(url) => {
    if(url){
        if(url=='/loginView'){

            await doLoginOut().finally(()=>{
                loginStore.clearToken()
                userStore.clearUserInformation()
                router.push({path:'/loginView'})
            });

            return false
        }

        router.push({path:url})
        if(mobileStore.isMobile){
            menuStore.closeMenu()
        }
    }
    
}


</script>

<style lang="scss" scoped>

</style>