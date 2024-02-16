<template>
    <div
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            廣告管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form :inline="true" :model="form" label-width="80px">
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="createFile">新增廣告</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[75%] lg:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
            <el-table
                :row-class-name="tableRowClassName"
                :data="fileList"
                style="width: 100%;font-size:16px;">
                <el-table-column prop="name" :width="isMobile ? 90 : ''">
                    <template #header>
                        <div class="flex flex-wrap">
                            <div class="cursor-pointer">廣告名稱</div>
                            <!-- <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                <Sort />
                            </el-icon> -->
                        </div>
                    </template>
                    <template #default="scope">
                        <div class="truncate">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="廣告狀態" :width="isMobile ? 90 : ''">
                    <template #default="scope">
                        <div class="truncate">{{ transformType(scope.row.state) }}</div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <div class="w-full flex flex-wrap justify-center items-center">
                            <div class="cursor-pointer">操作</div>
                        </div>
                    </template>
                    <template #default="scope">
                        <div class="w-full flex flex-wrap justify-center items-center">
                            <div class="truncate">
                                <el-button class="mx-[1px] md:mx-1" type="primary" @click="editFile(scope)">編輯</el-button>
                            </div>
                            <!-- <div class="truncate">
                                <el-button class="mx-1" type="primary">刪除</el-button>
                            </div> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="w-full my-3 px-3 text-xl flex flex-wrap justify-start items-center">
            {{ '共' + totalCount + '筆資料' }}
        </div>

        <Teleport to="body">
            <dialogView type="auto" @close="closeUpload" v-if="uploadStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">
                        {{ mode == 1 ? '新增廣告' : '修改廣告' }}
                    </div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <!-- <el-upload
                            class="upload-demo"
                            drag
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="upFile"
                        >
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                        </el-upload> -->
                        <el-form ref="formItem" :rules="rules" :inline="false" label-position="top" :model="fileData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item prop="name" label="廣告名稱">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="fileData.name" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item prop="pic" label="上傳檔案">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <div class="w-full flex flex-col justify-center items-center">
                                        <input class="fileStyle w-full" @change="upFile" type="file" placeholder="" />
                                        <div class="w-full my-[2px] md:my-1 flex flex-col justify-center items-center">
                                            <div>{{fileMessage}}</div>
                                            <img v-if="fileData?.pic" :src="fileData?.pic" alt="">
                                        </div>
                                        
                                        <el-input class="mt-1" placeholder="" v-model="fileData.pic" >
                                            <template v-slot:prepend>
                                                <div>檔案位置</div>
                                            </template>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <!-- <el-form-item label="超連結位置">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="fileData.url" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item> -->
                            <el-form-item label="廣告狀態">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-select
                                        style="width: 100%;font-size: 14px;"
                                        v-model="fileData.state"
                                        placeholder="">
                                        <template v-for="(item,index) in fileOption" :key="index">
                                            <el-option :label="item.label" :value="item.value" />
                                        </template>
                                    </el-select>
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>

                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-end items-center">
                        <button
                            @click="addFile"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded cursor-pointer">
                            {{ mode == 1 ? '新增' : '修改' }}
                        </button>
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
import { useMobileStore,useLoadingStore } from '@/stores/index'
import { advertiseList,advertiseDetail,advertiseCreate,advertiseEdit } from '@/api/advertise'
import { uploadFile } from '@/api/file'
import dialogView from "@/components/dialogView.vue"
const router = useRouter()
const route = useRoute()
const mobileStore = useMobileStore()
const uploadStatus = ref(false)
const fileList = ref([])
const totalCount = ref(0)
const formItem = ref(null)
const rules = ref({
    name: [
        { required: true, message: '請輸入名稱', trigger: 'blur' },
    ],
    pic: [
        { required: true, message: '請上傳檔案', trigger: 'blur' },
    ]
})
const form = ref({
    name: '',
    keyWord: '',
})
// 1新增 2編輯
const mode = ref(1)
const fileMessage = ref('請上傳檔案')
const fileData = ref({
    "name": '',
    "pic": '',
    "url": '',
    "state": 0
})
const fileOption = ref([
    {
        "label": "關閉",
        "value": 0
    },
    {
        "label": "上",
        "value": 1
    },
    {
        "label": "中",
        "value": 2
    },
    {
        "label": "下",
        "value": 3
    }
])
const loadingStore = useLoadingStore()
const loadViewStatus = computed(() => {
  return loadingStore.status
})

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const createFile = () => {
    mode.value = 1
    resetData()
    openUpload()
}

const editFile = (item) => {
    mode.value = 2
    resetData()
    getUserDetail(item.row.id)
}

const getUserDetail = async(num) => {
    if(loadViewStatus.value){
        return false
    }

    loadingStore.openLoad()

    const payload = {
        "id":num
    }
    await advertiseDetail(payload).then((res) => {
        if(res.data.status){
            fileData.value = {
                "id": res.data.data.id,
                "name": res.data.data.name,
                "pic": res.data.data.pic,
                "url": res.data.data.url,
                "state": res.data.data.state
            }

            openUpload()
        }
    }).finally(()=>{
        loadingStore.closeLoad()
    })
}


const getFileData = async() => {
    if(loadViewStatus.value){
        return false
    }

    loadingStore.openLoad()

    await advertiseList().then((res) => {
        if(res.data.status){
            fileList.value = res.data.data
            totalCount.value = fileList.value.length
        }
    }).finally(()=>{
        loadingStore.closeLoad()
    })

}

const tableRowClassName = (item) => {
    if ((item.rowIndex%2) == 1) {
        return 'even-row'
    }
    return ''
}

const transformType = (num) => {
    return fileOption.value.find((item)=>item.value == num).label
}

const resetData = () => {
    fileData.value = {
        "name": '',
        "pic": '',
        "url": '',
        "state": 0
    }
}

const openUpload = () => {
    uploadStatus.value = true
}

const closeUpload = () => {
    uploadStatus.value = false
}

const upFile = async(event) => {
    loadingStore.openLoad()

    fileMessage.value = '上傳中'
    const fileType = event.target.files[0].type.split('/')[1]
    if(!['jpg','png'].includes(fileType)){
        fileMessage.value = "檔案類型錯誤"
        loadingStore.closeLoad()
        return false
    }
    
    const formData = new FormData();
    formData.append("tag", "advertising");
    formData.append("file", event.target.files[0]);
    await uploadFile(formData).then((res) => {
        fileMessage.value = res.data.message
        if(res.data.status){
            fileData.value.pic = res.data.data.url
        }
        loadingStore.closeLoad()
    })

}

const addFile = async() => {
    if(loadViewStatus.value){
       return false 
    }

    await formItem.value.validate(async(valid, fields) => {

        if (valid) {
            if(mode.value == 1){
                addAdvertise()
            }else if(mode.value == 2){
                editAdvertise()
            }

        } else {
            return false
        }
    })

}

const addAdvertise = async() => {
    await advertiseCreate(fileData.value).then(async(res) => {
        fileMessage.value = res.data.message
        if(res.data.status){
            await getFileData()
            closeUpload()
            fileMessage.value = '請上傳檔案'
        }
        formItem.value.resetFields()
    })
}

const editAdvertise = async() => {
    await advertiseEdit(fileData.value).then(async(res) => {
        fileMessage.value = res.data.message
        if(res.data.status){
            await getFileData()
            closeUpload()
            fileMessage.value = '請上傳檔案'
        }
        formItem.value.resetFields() 
    })
}

const init = async() => {
    await getFileData()
}

init()

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

:deep(.el-table .even-row) {
    --el-table-tr-bg-color: rgb(249 250 251);
}

:deep(.el-form-item__label){
    margin: 0px 0px 0px 0px !important;
    padding: 0px 10px !important;
}

:deep(.el-form-item__error){
    padding: 1px 10px !important;
}

@media screen and (min-width: 768px) {
    :deep(.el-form-item__label){
        margin: 0px 0px 0px 0px !important;
        padding: 0px 15px !important;
    }

    :deep(.el-form-item__error){
        padding: 1px 15px !important;
    }
}

:deep(.fileStyle .el-input__wrapper) {
    padding: 0px;
}

:deep(input::file-selector-button) {
    height: 100%;
    padding: 0;
}
  
</style>