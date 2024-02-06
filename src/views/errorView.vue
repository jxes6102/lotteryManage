<template>
    <div class="w-[100vw] h-[70vh] text-3xl flex flex-wrap justify-center items-center ">
        找不到此畫面
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useAnnounceStore } from '@/stores/index'
const announceStore = useAnnounceStore()
localStorage.setItem('announce',false)
announceStore.closeAnnounce()

</script>

<style>

</style>