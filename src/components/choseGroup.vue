<template>

    <Teleport to="body">
        <dialogView type="large" layer="1001" @close="cancelGroup">
            <template v-slot:title>
                <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">選擇集團</div>
                <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
            </template>
            <template v-slot:message>
                <div class="w-full h-[80%] my-[1px] md:my-1 px-2 py-[1px] md:py-1 flex flex-col justify-around items-center">
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1">
                        <el-form class="w-full" :model="groupForm">
                            <el-form-item>
                                <el-col :span="16">
                                    <el-input placeholder="集團名稱或集團代號" v-model="groupForm.name" />
                                </el-col>
                                <el-col :span="8">
                                    <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-[100%] md:w-[95%] h-auto flex flex-wrap justify-center items-center">
                        <el-table :data="groupTableData" stripe style="width: 100%">
                            <el-table-column prop="date" label="集團名稱">
                                <template #default="scope">
                                    <el-tooltip
                                        :disabled="!isMobile"
                                        class="box-item"
                                        effect="light"
                                        :content="scope.row.date"
                                        placement="top-start"
                                    >
                                        <div class="truncate">{{ scope.row.date }}</div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="集團代號">
                                <template #default="scope">
                                    <el-tooltip
                                        :disabled="!isMobile"
                                        class="box-item"
                                        effect="light"
                                        :content="scope.row.date"
                                        placement="top-start"
                                    >
                                        <div class="truncate">{{ scope.row.name }}</div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="負責人姓名">
                                <template #default="scope">
                                    <el-tooltip
                                        :disabled="!isMobile"
                                        class="box-item"
                                        effect="light"
                                        :content="scope.row.date"
                                        placement="top-start"
                                    >
                                        <div class="truncate">{{ scope.row.address }}</div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="單位數量">
                                <template #default="scope">
                                    <el-tooltip
                                        :disabled="!isMobile"
                                        class="box-item"
                                        effect="light"
                                        :content="scope.row.date"
                                        placement="top-start"
                                    >
                                        <div class="truncate">{{ scope.row.address }}</div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center">
                        <el-pagination
                            small
                            background
                            layout="prev, pager, next"
                            :total="50"
                            class="mt-1"
                        />
                    </div>
                </div>
            </template>
        </dialogView>

    </Teleport>

</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useMobileStore } from '@/stores/index'
import dialogView from "@/components/dialogView.vue"

const emit = defineEmits(['close'])
const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const groupStatus = ref(false)
const groupForm = ref({
  name: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const cancelGroup = () => {
    groupStatus.value = false
    emit('close')
}

const groupTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
]

</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper){
    width: 200px;
}

:deep(.el-form-item__label) {
    font-size: 16px;
}

@media screen and (max-width: 330px) {
    :deep(.custom-el-form-item .el-form-item__content) {
        width: 100%;
        justify-content: center;
        align-items: center;
    }

}

</style>