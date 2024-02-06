<template>
    <div 
        class="w-full h-[100vh] md:h-[auto] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            日程管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-[100vw] md:w-[full] h-full overflow-x-auto md:overflow-x-hidden overflow-y-auto md:overflow-y-hidden">
            <el-calendar 
                ref="calendar"
                class="w-[700px] md:w-[75vw] h-auto flex flex-wrap justify-center md:justify-start items-center">
                <template #header="{ date }">
                    <div class="w-full flex flex-wrap justify-between items-center">
                        <div class="flex flex-col justify-center items-center">
                            <span class="text-2xl md:text-3xl">{{ date }}</span>
                            <el-button-group>
                                <!-- <el-button size="small" @click="selectDate('prev-year')">
                                    上一年
                                </el-button> -->
                                <el-button style="font-size:16px;" size="small" @click="selectDate('prev-month',date)">
                                    上個月
                                </el-button>
                                <el-button style="font-size:16px;" size="small" @click="selectDate('today',date)">今天</el-button>
                                <el-button style="font-size:16px;" size="small" @click="selectDate('next-month',date)">
                                    下個月
                                </el-button>
                                <!-- <el-button size="small" @click="selectDate('next-year')">
                                    下一年
                                </el-button> -->
                            </el-button-group>
                        </div>
                        <div class="flex flex-wrap justify-center items-center">
                            <button
                                class="w-auto text-base md:text-xl bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                匯出
                            </button>
                            <button
                                class="w-auto text-base md:text-xl bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                匯出範例
                            </button>
                        </div>
                    </div>
                </template>
                <template #date-cell="item">
                    <div 
                        @click="edit($event,item.data)" 
                        class="w-full h-full flex flex-wrap justify-center items-start">
                        <div class="w-full flex flex-col justify-center items-start">
                            <div class="w-full text-lg md:text-2xl px-[2px] py-[1px] md:px-2 md:py-[2px]">{{ item.data.day.substring(5,10) }}</div>
                            <div class="w-full text-base md:text-xl px-[2px] py-[1px] md:px-2 md:py-[2px]">{{ dateData[item.data.day]?.name }}</div>
                            <div class="w-full text-base md:text-xl px-[2px] py-[1px] md:px-2 md:py-[2px]">{{ dateData[item.data.day]?.stateName }}</div>
                        </div>
                    </div>
                </template>
            </el-calendar>
        </div>
        <Teleport to="body">
            <dialogView type="auto" @close="cancel" v-if="editStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-lg md:text-2xl">編輯日程({{ scheduleData.scheduleDate.substring(0,10) }})</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="scheduleData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="名稱">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-input placeholder="" v-model="scheduleData.name" />
                                </el-col>
                                <el-col :span="1"></el-col>
                            </el-form-item>
                            <el-form-item label="日程類型">
                                <el-col :span="1"></el-col>
                                <el-col :span="22">
                                    <el-select
                                        style="width: 100%;font-size: 14px;"
                                        v-model="scheduleData.state"
                                        placeholder="">
                                        <template v-for="(item,index) in scheduleOption" :key="index">
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
                            @click="save"
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
// import { getDataListByMonth,getDetailByDate,scheduleEdit } from '@/api/schedule'
import dialogView from "@/components/dialogView.vue"

const router = useRouter()
const route = useRoute()
const mobileStore = useMobileStore()

const calendar = ref(null)
const choseDate = ref('')
const scheduleData = ref({
    id:'',
    name:'',
    state:0,
    stateName:'未選擇',
    scheduleDate:''
})
const scheduleOption = ref([
    {
        "label": "未選擇",
        "value": 0
    },
    {
        "label": "上課日",
        "value": 1
    },
    {
        "label": "放假日",
        "value": 2
    },
    {
        "label": "其他",
        "value": 3
    },
])
const editStatus = ref(false)
const loadStatus = ref(false)
const dateData = ref({})

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const selectDate = async(val,date) => {
    if (!calendar.value || loadStatus.value){
        return false
    }

    let arr = date.split(' ')
    let year = parseInt(arr[0])
    let month = parseInt(arr[2])
    if(val=='prev-month'){
        if(month==1){
            month = 11
            year--
        }else{
            month-=2
        }
        choseDate.value = new Date(year, month, 2).toISOString()
    }else if(val=='next-month'){
        if(month==12){
            month = 0
            year++
        }
        choseDate.value = new Date(year, month, 2).toISOString()
    }else if(val=='today'){
        choseDate.value = new Date().toISOString()
    }
    if(!(year == 2024)){
        return false
    }

    await getDateList()
    calendar.value.selectDate(val)
}

const edit = async(event,item) => {
    
    if((item.type != 'current-month') || loadStatus.value){
        event.stopPropagation()
        event.preventDefault()
        return false
    }
    loadStatus.value = true
    const formData = new FormData();
    formData.append("scheduleDate", item.date.toISOString().substring(0,10));
    
    await getDetailByDate(formData).then((res) => {
        // console.log('res',res)
        
        if(res.data.status){
            scheduleData.value = res.data.data
        }
        loadStatus.value = false
    })

    editStatus.value = true
    
}

const cancel = () => {
    editStatus.value = false
}

const getDateList = async() => {
    if(loadStatus.value){
        return false
    }
    dateData.value = {}
    loadStatus.value = true
    const formData = new FormData();
    formData.append("scheduleDate", choseDate.value);

    await getDataListByMonth(formData).then((res) => {
        // console.log('res',res)

        if(res.data.status){
            let temp = res.data.data
            for(let key in temp){
                dateData.value[temp[key].scheduleDate.substring(0,10)] = temp[key]
            }
            // console.log('dateData.value',dateData.value)
        }

        loadStatus.value = false
    })
}

const save = async() => {
    if(loadStatus.value){
        return false
    }
    loadStatus.value = true
    scheduleData.value.stateName = scheduleOption.value.find((item)=>item.value === scheduleData.value.state).label
    const formData = new FormData();
    for(let key in scheduleData.value) {
        formData.append(key, scheduleData.value[key])
    }

    await scheduleEdit(formData).then(async(res) => {
        
        if(res.data.status){
            loadStatus.value = false
            await getDateList()
            editStatus.value = false
        }
        
    })

}

const init = async() => {
    choseDate.value = new Date().toISOString()
    getDateList()
}

init()

</script>

<style lang="scss" scoped>
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

:deep(.el-calendar-table .el-calendar-day ){
    padding: 0px !important;
}

@media screen and (min-width: 768px) {
    :deep(.el-calendar-table .el-calendar-day ){
        padding: 0px !important;
        height: 100px !important;
    }
}

@media screen and (min-width: 1500px) {
    :deep(.el-calendar-table .el-calendar-day ){
        padding: 0px !important;
        height: 150px !important;
    }
}


:deep(.el-calendar-table__row):nth-child(even){
    background-color:rgb(249 250 251);
}

:deep(.el-calendar__header){
    width: 100%;
}

</style>