<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full md:w-[80%] my-3 px-3 text-3xl flex flex-wrap justify-between items-center">
            <div>公告管理</div>
            <div><el-button class="mx-1" type="info" @click="editNew">新增公告</el-button></div>
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
                        <el-input placeholder="公告標題" v-model="form.desc" />
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
                <el-table-column prop="img" label="預覽圖片" width="80"> 
                    <template #default="scope">
                        <div @click="editNew(scope)" class="truncate">{{ scope.row.img }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="公告分類" > 
                    <template #default="scope">
                        <div @click="editNew(scope)" class="truncate">{{ scope.row.type }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="公告標題" > 
                    <template #default="scope">
                        <div @click="editNew(scope)" class="truncate">{{ scope.row.title }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="startTime" label="開始時間" > 
                    <template #default="scope">
                        <div @click="editNew(scope)" class="truncate">{{ scope.row.startTime }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="結束時間" > 
                    <template #default="scope">
                        <div @click="editNew(scope)" class="truncate">{{ scope.row.endTime }}</div>
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
            <dialogView @close="cancel" v-if="newStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">公告設定</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="newsform" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="公告識別碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.id" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="公告分類">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.type" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="公告標題">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.title" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="預覽文字">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.text" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="預覽圖片">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.img" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="投放開始時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.startTime" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="投放結束時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.endTime" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="建立時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.endTime" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="修改時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="newsform.endTime" />
                                </el-col>
                            </el-form-item>
                            <el-form-item >
                                <template #label>
                                    <div class="flex flex-wrap justify-start items-start">
                                        <div class="w-full text-lg">內容</div>
                                        <div class="w-full text-base">編輯器正在內部測試中，為確保內容正常，請先使用App內的編輯器</div>
                                    </div>
                                </template>
                                <template #default>
                                    <el-input placeholder="" resize="none" :rows="3" type="textarea" v-model="newsform.content" />
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            @click="checkNew"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                @click="checkNew"
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
    newStatus.value = false
}

const tableData = [
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },

]

const newsform = ref({
    id:'',
    type:'',
    title:'',
    text:'',
    img:'',
    startTime:'',
    endTime:'',
    createTime:'',
    modifyTime:'',
    content:''
})

const newStatus = ref(false)
const editNew = (item) => {
    console.log('editNew',item)
    newStatus.value = true
}

const checkNew = () => {
    console.log('checkNew',newsform.value)
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