<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            積分管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form :inline="!isMobile" :model="form" label-width="60px">
                <el-form-item label="集團">
                    <el-col :span="24">
                        <el-input
                            disabled
                            v-model="form.name"
                            placeholder=""
                            class="input-with-select"
                            >
                            <template #append>
                                <el-button
                                    @click="openSelect" 
                                    style="background-color: #409eff;color:white;">
                                    選擇
                                </el-button>
                            </template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="機構">
                    <el-col :span="24">
                        <el-select
                            :style="isMobile ? 'width: 100%;font-size: 14px;' : ''"
                            v-model="form.region" 
                            placeholder="">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="使用者號或信箱" v-model="form.desc" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="使用者姓名" > 
                    <template #default="scope">
                        <div @click="editPoint(scope)" class="truncate">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="income" label="收入" > 
                    <template #default="scope">
                        <div @click="editPoint(scope)" class="truncate">{{ scope.row.income }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="expense" label="支出" > 
                    <template #default="scope">
                        <div @click="editPoint(scope)" class="truncate">{{ scope.row.expense }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="remain" label="剩餘" > 
                    <template #default="scope">
                        <div @click="editPoint(scope)" class="truncate">{{ scope.row.remain }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="w-full md:w-[80%] h-auto flex flex-wrap justify-center items-center">
            <el-pagination
                small
                background
                layout="prev, pager, next"
                :total="50"
                class="mt-4"
            />
        </div>
        <div class="w-full my-3 px-3 text-xl flex flex-wrap justify-start items-center">
            共 1 筆資料
        </div>

        <choseGroup @close="cancel" v-if="groupStatus"></choseGroup>

        <Teleport to="body">
            <dialogView @close="cancel" type="small" v-if="pointStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">發送積分</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="pointForm" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="使用者">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="form.user" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="數量">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="form.amount" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="事由">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="form.reason" />
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            @click="checkPoint"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                @click="checkPoint"
                                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                確定
                            </button>
                            <button
                                @click="cancel"
                                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                取消
                            </button>
                        </div>
                    </div>
                </template>
            </dialogView>
        </Teleport>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useMobileStore } from '@/stores/index'
import dialogView from "@/components/dialogView.vue"
import choseGroup from "@/components/choseGroup.vue"

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const groupStatus = ref(false)

const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const openSelect = () => {
    groupStatus.value = true
}

const cancel = () => {
    groupStatus.value = false
    pointStatus.value = false
}

const tableData = [
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },
  {
    name:'使用者1',
    income:'1',
    expense:'2',
    remain:'3'
  },

]

const pointForm = ref({
    user:'',
    amount:'',
    reason:''
})

const pointStatus = ref(false)
const editPoint = (item) => {
    console.log('editPoint',item)
    pointStatus.value = true
}

const checkPoint = () => {
    console.log('pointForm',pointForm.value)
}

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