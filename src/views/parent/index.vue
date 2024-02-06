<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <template v-if="modeKey == 1">
            <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
                家長管理
            </div>
            <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
            <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
                <el-form :inline="!isMobile" :model="form" label-width="80px">
                    <el-form-item label="關鍵字">
                        <el-col :span="isMobile ? 22 : 24">
                            <el-input placeholder="請輸入" v-model="form.keyWord" />
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
            <div class="w-full md:w-[75%] lg:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
                <el-table 
                    :row-class-name="tableRowClassName"
                    :data="userList" 
                    style="width: 100%;font-size:16px;">
                    <el-table-column prop="account" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">帳號</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template>
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.account }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">性別</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template>
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.gender }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">姓名</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template> 
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">暱稱</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template>
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.nickName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" label="操作" > 
                        <template #default="scope">
                            <div class="truncate">
                                <el-button class="mx-1" type="primary" @click="bindStudent(scope)">綁定學生</el-button>
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
        </template>
        <template v-if="modeKey == 2">
            <div class="w-full my-3 flex flex-wrap justify-start items-center">
                <div class="px-3 text-3xl">家長綁定學生</div>
                <div>
                    <el-button class="mx-1" type="primary" @click="backSearch">返回</el-button>
                </div>
            </div>
            <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
            <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
                <el-button class="mx-1" type="primary" @click="addStudent">新增</el-button>
                <!-- <el-form :inline="!isMobile" :model="form" label-width="80px">
                    <el-form-item label="關鍵字">
                        <el-col :span="isMobile ? 22 : 24">
                            <el-input placeholder="請輸入" v-model="form.keyWord" />
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="24">
                            <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                        </el-col>
                    </el-form-item>
                </el-form> -->
            </div>
            <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
            <div class="w-full md:w-[75%] lg:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
                <el-table 
                    :row-class-name="tableRowClassName"
                    :data="parentList" 
                    style="width: 100%;font-size:16px;">
                    <el-table-column prop="studentSchoolStudentId" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">帳號</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template>
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.studentSchoolStudentId }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="studentUserName" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">姓名</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template> 
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.studentUserName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" width="100" >
                        <template #header="scope">
                            <div class="flex flex-wrap">
                                <div class="cursor-pointer" @click="sortCol(scope.column.property)">關係人</div>
                                <el-icon class="ml-[1px] md:ml-1 cursor-pointer" @click="sortSize(scope.column.property)" :size="20">
                                    <Sort />
                                </el-icon>
                            </div>
                        </template>
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.userName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="稱謂" > 
                        <template #default="scope">
                            <div class="truncate">{{ scope.row.title }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="170" label="操作" > 
                        <template #default="scope">
                            <div class="flex flex-wrap justify-center items-center">
                                <el-button class="mx-1" type="primary" @click="editStudent(scope.row)">修改</el-button>
                                <el-button class="mx-1" type="primary" @click="delStudent(scope.row)">刪除</el-button>
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
        </template>

        <choseGroup @close="cancel" v-if="groupStatus"></choseGroup>

        <Teleport to="body">

            <dialogView type="auto" @close="closeStudent" v-if="editStudentStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">編輯綁定學生</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="studentData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="家長名稱">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input disabled placeholder="" v-model="parentData.name" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item v-if="isAdd" label="班級">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-select
                                        @change="changeClass"
                                        style="width: 100%;font-size: 14px;"
                                        v-model="studentData.class" 
                                        placeholder="">
                                        <template v-for="(item,index) in classList" :key="index">
                                            <el-option :label="item.label" :value="item.value" />
                                        </template>
                                    </el-select>
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="學生">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-select v-if="isAdd"
                                        style="width: 100%;font-size: 14px;"
                                        v-model="studentData.studentId" 
                                        placeholder="">
                                        <template v-for="(item,index) in studentList" :key="index">
                                            <el-option :label="item.label" :value="item.value" />
                                        </template>
                                    </el-select>
                                    <el-input v-if="!isAdd" disabled placeholder="" v-model="studentData.studentUserName" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="稱謂">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="studentData.title" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="備註">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="studentData.remark" />
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
                            {{ isAdd ? '新增' : '修改' }}
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
// import { getParentUser,getParentListByUser,getClassList,getStudentByClassIdList,createParent,editParent,deleteParent } from '@/api/parent'
import dialogView from "@/components/dialogView.vue"
import choseGroup from "@/components/choseGroup.vue"

const router = useRouter()
const route = useRoute()
// 1 家長管理 2 家長綁定
const modeKey = ref(1) 
const isAdd = ref(false)
const mobileStore = useMobileStore()
const loadStatus = ref(false)
const groupStatus = ref(false)
const editStatus = ref(false)
const userList = ref([])
const totalCount = ref(0)
const page = ref(1)
let sortColumnKey = 'account'
let colSizeObj = {}
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  keyWord: '',
})
const editStudentStatus = ref(false)
const parentList = ref([])
const parentData = ref({})
const classList = ref([])
const studentList = ref([])
const studentData = ref({
    class:'',
    studentId:'',
    studentSchoolStudentId:''
})

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const onSubmit = () => {
    console.log('submit!')
    // getUserData()
}

const cancel = () => {
    groupStatus.value = false
    editStatus.value = false
    
}

const bindStudent = async(item) => {
    parentData.value = JSON.parse(JSON.stringify(item.row))
    // console.log('parentData.value',parentData.value)
    page.value = 1
    sortColumnKey = 'studentId'
    await getParentData(item.row.id)
    modeKey.value = 2
}

const backSearch = async(item) => {
    page.value = 1
    sortColumnKey = 'account'
    parentData.value = {}
    reSetData()
    await getUserData()
    modeKey.value = 1
}

const addStudent = () => {
    isAdd.value = true
    editStudentStatus.value = true 
}

const closeStudent = () => {
    reSetData()
    editStudentStatus.value = false
}

const getUserData = async() => {
    if(loadStatus.value){
        return false
    }
    
    loadStatus.value = true
    const formData = new FormData();
    // formData.append("draw", 99);
    formData.append("length", 10);
    formData.append("start", (page.value-1)*10);
    formData.append("sortColumn",sortColumnKey);
    if(!colSizeObj[sortColumnKey]){
        formData.append("sortColumnDirection",'desc');
    }else{
        formData.append("sortColumnDirection",'asc');
    }
    // formData.append("sortColumn", '');
    // formData.append("sortColumnDirection", '');
    if(form.value.keyWord){
        formData.append("searchValue",form.value.keyWord);
    }

    await getParentUser(formData).then((res) => {
        if(res.data.status){
            userList.value = res.data.data
            totalCount.value = res.data.totalCount
            // console.log('userList.value',userList.value)
        }else{
        }

        loadStatus.value = false
    })
}

const getParentData = async(userId) => {
    if(loadStatus.value){
        return false
    }
    
    loadStatus.value = true
    const formData = new FormData();
    formData.append("length", 10);
    formData.append("start", (page.value-1)*10);
    formData.append("sortColumn",sortColumnKey)
    formData.append("sortColumnDirection",'desc');
    if(!colSizeObj[sortColumnKey]){
        formData.append("sortColumnDirection",'desc');
    }else{
        formData.append("sortColumnDirection",'asc');
    }
    formData.append("userId", userId);

    await getParentListByUser(formData).then((res) => {
        // console.log('getParentUser',res)
        if(res.data.status){
            parentList.value = res.data.data
            totalCount.value = res.data.totalCount
        }else{
        }

        loadStatus.value = false
    })
}

const changePage = (value) => {
    page.value = value
    if(modeKey.value == 1){
        getUserData()
    }else if(modeKey.value == 2){
        getParentData(parentData.value.id)
    }
    
}

const saveEdit = async() => {
    const formData = new FormData();
    formData.append("userId", parentData.value.id);
    formData.append("userName", parentData.value.name);
    formData.append("studentId", studentData.value.studentId);
    if(isAdd.value){
        let studentUserName = studentList.value.find((item)=>item.value == studentData.value.studentId).label.split(' ')[2]
        formData.append("studentUserName", studentUserName);
    }else{
        formData.append("studentUserName", studentData.value.studentUserName);
    }
    formData.append("studentSchoolStudentId", studentData.value.studentSchoolStudentId);
    formData.append("title", studentData.value.title);
    formData.append("remark", studentData.value.remark);
    
    if(isAdd.value){
        await createStudent(formData)
    }else{
        await modifyStudent(formData)
    }

    await getParentData(parentData.value.id)
    closeStudent()
    
}

const createStudent = async(formData) => {
    await createParent(formData).then((res) => {
        console.log('createParent',res)
    })
}

const modifyStudent = async(formData) => {
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    await editParent(formData).then((res) => {
        console.log('editParent',res)
    })
}

const tableRowClassName = (item) => {
    if ((item.rowIndex%2) == 1) {
        return 'even-row'
    }
    return ''
}

const sortCol = (value) => {
    if(sortColumnKey!=value){
        sortColumnKey = value
        if(modeKey.value == 1){
            getUserData()
        }else if(modeKey.value == 2){
            getParentData(parentData.value.id)
        }
    }
}

const sortSize = (value) => {
    sortColumnKey = value
    if(!colSizeObj[sortColumnKey]){
        colSizeObj[sortColumnKey] = true
    }else{
        colSizeObj[sortColumnKey] = !colSizeObj[sortColumnKey]
    }
    if(modeKey.value == 1){
            getUserData()
    }else if(modeKey.value == 2){
        getParentData(parentData.value.id)
    }
}

const getClass = () => {
    
    getClassList().then((res) => {
        if(res.data.status){
            classList.value = res.data.data.optionList

            // console.log('classList.value',classList.value)
        }
    })
}

const getStudent = () => {
    const formData = new FormData();
    formData.append("classId", studentData.value.class);
    getStudentByClassIdList(formData).then((res) => {
        if(res.data.status){
            studentList.value = res.data.data.optionList

            // console.log('studentList.value',studentList.value)
        }
    })
}
const changeClass = () => {
    getStudent()
}

const editStudent = (item) => {
    studentData.value = JSON.parse(JSON.stringify(item))
    // console.log('studentData',studentData.value)
    isAdd.value = false
    editStudentStatus.value = true
}

const reSetData = () => {
    studentList.value = []
    studentData.value = {
        class:'',
        studentId:'',
        studentSchoolStudentId:''
    }
}

const delStudent = async(item) => {
    const formData = new FormData();
    formData.append("userId", item.userId);
    formData.append("studentId", item.studentId);
    // console.log('item',item)
    await deleteParent(formData).then((res) => {
        // console.log('deleteParent',res)
    })

    await getParentData(parentData.value.id)
}

const init = async() => {
    getClass()
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