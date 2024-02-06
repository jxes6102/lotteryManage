<template>
    <div 
        class="flex flex-col justify-center items-center"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            參數設定
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full mt-3 px-3 text-2xl flex flex-wrap justify-start items-center">
            積分設定
        </div>
        <div class="w-full mt-2 px-3 text-xl flex flex-col justify-start items-start">
            <div>第一階邀請獲得積分</div>
            <input class="w-[100%] md:w-[450px] my-1 p-1" v-model="numFirst" type="number" min="1" max="9999999" />
        </div>
        <div class="w-full mt-2 px-3 text-xl flex flex-col justify-start items-start">
            <div>第二階邀請獲得積分</div>
            <input class="w-[100%] md:w-[450px] my-1 p-1" v-model="numSecond" type="number" min="1" max="9999999" />
        </div>
        <div class="w-full mt-2 px-3 text-xl flex flex-col justify-start items-start">
            <div>第三階邀請獲得積分</div>
            <input class="w-[100%] md:w-[450px] my-1 p-1" v-model="numThird" type="number" min="1" max="9999999" />
        </div>
        <div class="w-full mt-2 px-3 text-xl flex flex-col justify-start items-start">
            <button class="w-[100%] md:w-[450px] bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 md:py-2 md:px-3 rounded">儲存</button>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useMobileStore } from '@/stores/index'

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const numFirst = ref(1)
const numSecond = ref(1)
const numThird = ref(1)


</script>

<style lang="scss" scoped>
input[type=number]{
    border:2px solid #aaa;
    border-radius:4px;
    outline:none;
    box-sizing:border-box;
    transition:.3s;
}
  
input[type=number]:focus{
    border-color:dodgerBlue;
    box-shadow:0 0 8px 0 dodgerBlue;
}


</style>