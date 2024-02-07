<template>
    <div
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            使用者管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form :inline="!isMobile" :model="form" label-width="80px">
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="createUser">新增</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[75%] lg:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
            <el-table
                :row-class-name="tableRowClassName"
                :data="userList"
                style="width: 100%;font-size:16px;">
                <el-table-column prop="account" >
                    <template #header>
                        <div class="flex flex-wrap">
                            <div class="cursor-pointer">帳號</div>
                            <!-- <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                <Sort />
                            </el-icon> -->
                        </div>
                    </template>
                    <template #default="scope">
                        <div class="truncate">{{ scope.row.account }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" >
                    <template #header>
                        <div class="flex flex-wrap">
                            <div class="cursor-pointer">姓名</div>
                            <!-- <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                <Sort />
                            </el-icon> -->
                        </div>
                    </template>
                    <template #default="scope">
                        <div class="truncate">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="身分" >
                    <template #default="scope">
                        <div class="truncate">{{ transformRole(scope.row.state) }}</div>
                    </template>
                </el-table-column>
                <el-table-column width="90" label="操作" >
                    <template #default="scope">
                        <div class="truncate">
                            <el-button class="mx-1" type="primary" @click="editUser(scope)">編輯</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="w-full md:w-[80%] h-auto flex flex-wrap justify-center items-center">
            <el-pagination
                :small="isMobile"
                :background="!isMobile"
                layout="prev, pager, next"
                :current-page="page"
                :total="totalCount"
                :page-sizes="[10]"
                :disabled="loadStatus"
                @current-change="changePage"
                class="mt-4"
            />
        </div>
        <div class="w-full my-3 px-3 text-xl flex flex-wrap justify-start items-center">
            {{ '共' + totalCount + '筆資料' }}
        </div>

        <Teleport to="body">
            <dialogView type="auto" @close="cancel" v-if="editStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">
                        {{ mode == 1 ? '新增使用者' : '編輯使用者' }}
                    </div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="userData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="姓名">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="userData.name" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item v-if="mode==1" label="帳號">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="userData.account" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="密碼">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="userData.password" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="確認密碼">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="userData.confirm_password" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="身分">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-select
                                        style="width: 100%;font-size: 14px;"
                                        v-model="userData.state"
                                        placeholder="">
                                        <template v-for="(item,index) in roleOption" :key="index">
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
                            @click="saveEdit"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            修改
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
import { useMobileStore } from '@/stores/index'
import { getUserList,userDetail,userCreate,userEdit } from '@/api/user'
import dialogView from "@/components/dialogView.vue"
const router = useRouter()
const route = useRoute()
const mobileStore = useMobileStore()
const loadStatus = ref(false)
const userData = ref({
    "account": '',
    "password": '',
    "confirm_password": '',
    "name": '',
    "state": 0
})
const editStatus = ref(false)
const userList = ref([])
const totalCount = ref(0)
const page = ref(1)
const form = ref({
  name: '',
  keyWord: '',
})
const roleOption = ref([
    {
        "label": "關閉",
        "value": 0
    },
    {
        "label": "廣告管理",
        "value": 1
    },
    {
        "label": "系統管理",
        "value": 2
    }
])
// 1新增 2編輯
const mode = ref(1)

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const createUser = () => {
    mode.value = 1
    resetData()
    editStatus.value = true
}

const cancel = () => {
    editStatus.value = false
}

const editUser = (item) => {

    mode.value = 2
    resetData()
    getUserDetail(item.row.id)
}

const getUserDetail = async(num) => {
    if(loadStatus.value){
        return false
    }
    loadStatus.value = true

    const payload = {
        "id":num
    }
    await userDetail(payload).then((res) => {
        if(res.data.status){
            userData.value = res.data.data
            userData.value.id = num
            userData.value.password = ''
            userData.value.confirm_password = ''
 
            editStatus.value = true
        }
    }).finally(()=>{
        loadStatus.value = false
    })
}


const getUserData = async() => {
    if(loadStatus.value){
        return false
    }

    loadStatus.value = true

    await getUserList().then((res) => {
        if(res.data.status){
            userList.value = res.data.data
        }
    }).finally(()=>{
        loadStatus.value = false
    })

}

const changePage = (value) => {
    page.value = value
    getUserData()
}

const saveEdit = async() => {
    if(mode.value == 1){
        await getUserCreate()
    }else if(mode.value == 2){
        await getUserEdit()
    }
    await getUserData()
}

const getUserCreate = async() => {
    const payload = {
        account: userData.value.account,
        password:userData.value.password,
        confirm_password: userData.value.confirm_password,
        name: userData.value.name,
        state: userData.value.state
    }

    await userCreate(payload).then((res) => {
        if(res.data.status){
            cancel()
        }
    })
}

const getUserEdit = async() => {
    const payload = {
        id:userData.value.id,
        name: userData.value.name,
        state: userData.value.state,
        password:userData.value.password,
        confirm_password:userData.value.confirm_password
    }

    await userEdit(payload).then((res) => {
        if(res.data.status){
            cancel()
        }
    })
}

const tableRowClassName = (item) => {
    if ((item.rowIndex%2) == 1) {
        return 'even-row'
    }
    return ''
}

const transformRole = (num) => {
    return roleOption.value.find((item)=>item.value == num).label
}

const resetData = () => {
    userData.value = {
        "account": '',
        "password": '',
        "confirm_password": '',
        "name": '',
        "state": 0
    }
}

const init = async() => {
    await getUserData()
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

@media screen and (min-width: 768px) {
    :deep(.el-form-item__label){
        margin: 0px 0px 0px 0px !important;
        padding: 0px 15px !important;
    }
}

</style>