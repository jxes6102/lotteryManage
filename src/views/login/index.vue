<template>
    <div class="w-full h-full flex flex-col justify-center items-center bg-[rgb(245,245,220,0.1)]">
        <div class="w-full mt-1 md:mt-4 text-4xl font-semibold flex flex-wrap justify-center items-center">登入</div>
        <div class="w-[80%] my-4 flex flex-wrap justify-center items-center">
            <el-form
                :rules="rules"
                ref="formItem"
                label-width="0px"
                :model="form"
                style="width:100%;max-width:700px;"
            >
                <el-form-item label="" prop="account">
                    <el-input
                        placeholder="帳號" v-model="form.account"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="UserFilled" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" placeholder="密碼" v-model="form.password"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Key" />
                        </template>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="" prop="phone">
                    <el-input placeholder="手機" v-model="form.phone"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Iphone" />
                        </template>
                    </el-input>
                </el-form-item> -->
                <!-- <el-form-item label="" prop="checkNum">
                    <el-input placeholder="驗證碼" maxlength="4" v-model="form.checkNum"
                        style="width: 50%;min-width:220px;max-width:300px;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Umbrella" />
                        </template>
                        <template #append>
                            <div @click="setCaptcha" class="w-[90px] md:w-[100px]">
                                <img class="w-full h-full" :src="captchaData?.dataUrl" alt="圖片錯誤">
                            </div>
                        </template>
                    </el-input>
                </el-form-item> -->
            </el-form>
            <div class="w-full min-h-[15px] text-red-600 text-sm md:text-lg flex flex-wrap justify-center items-center">
                {{loginMessage || ''}}
            </div>
            <div class="w-full mt-1 flex flex-wrap justify-center items-center">忘記了您的密碼嗎? 請與請與管理員進行詢問，謝謝。</div>
            <div class="w-full mt-1 flex flex-col justify-center items-center">
                <button @click="send" class="w-full md:w-[700px] max-w-[700px] bg-[#6E6EFF] py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">登入</button>
                <!-- <button @click="lineLogin" class="w-full md:w-[700px] max-w-[700px] bg-[rgb(13,181,156,0.9)] mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">LINE登入</button> -->
                <!-- <button @click="testOpen" class="w-full md:w-[700px] max-w-[700px] bg-red-500 mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">測試開啟</button> -->
            </div>
        </div>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { doLogin } from '@/api/login'
import { ref,computed } from 'vue';
import { useLoginStore,useMenuStore,useheaderStore,useMobileStore,useLoadingStore } from '@/stores/index'
import { useRouter } from "vue-router";
const loginStore = useLoginStore()
const menuStore = useMenuStore()
const headerStore = useheaderStore()
const router = useRouter()
const mobileStore = useMobileStore()
const loadingStore = useLoadingStore()
const isMobile = computed(() => {
  return mobileStore.isMobile
})
const loadViewStatus = computed(() => {
  return loadingStore.status
})

const captchaData = ref({})
const setCaptcha = () => {
}
const init = () => {
    headerStore.closeHeader()
    menuStore.closeMenu()
}

init()

const formItem = ref(null)
const form = ref({
  account: '',
  password: '',
})

const rules = ref({
    account: [
        { required: true, message: '請輸入帳號', trigger: 'blur' },
        { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'change' },
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'change' },
    ],
})

const send = async() => {
    if (loadViewStatus.value) {
      return false
    }
    await formItem.value.validate((valid, fields) => {

        if (valid) {
            // console.log('submit!')
            login()
        } else {
            console.log('error submit!')
        }
    })
}

const loginMessage = ref('')
const login = async() => {
  loadingStore.openLoad()

  const formData = new FormData();
  formData.append("account", form.value?.account);
  formData.append("password", form.value?.password);
  const payLoad = {
    account:form.value?.account,
    password:form.value?.password
  }

  await doLogin(payLoad).then((res) => {
      if(res.data.status){
          loginStore.setToken(res.data.data.access_token)
          resetForm()
          if(!isMobile.value){
            menuStore.openMenu()
          }
          headerStore.openHeader()
          router.push({ path: '/' })
      }else{
          setCaptcha()
          loginMessage.value = res.data.message
        //   console.log(res.data.message)
      }
      loadingStore.closeLoad()
  })

}

const resetForm = () => {
  formItem.value.resetFields()
}

const htmlData = ref('')
const lineLogin = () => {
    // console.log('lineLogin')

    // getLineInformation().then((res) => {
    //     console.log('getLineInformation',res.data.data)
    //     // loginMessage.value = res.data.data
    //     if(res.data.status){
    //         // window.open(res.data.data, '_self')
    //         // window.location.replace(res.data.data)
    //         //未知 在手機板必新開分頁顯示
    //         // window.location.href = res.data.data;
    //         openLink(res.data.data)
    //     }
    // })
    // https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fresponse_type%3Dcode%26client_id%3D2001937495%26redirect_uri%3Dhttps%253A%252F%252Fjxes6102.github.io%252Fbryte%252F%26state%3Da1561e4078dc03b657ac93195a9f68934fd9fae1622d8e5239ad87a8d7aabb8f%26scope%3Dprofile%26openId%3D&loginChannelId=2001937495&loginState=70feooN8nomIsavCwLnhJM
}

const testOpen = () => {
    // window.location.href = 'https://tw.dictionary.search.yahoo.com/'
    // window.open('https://tw.dictionary.search.yahoo.com/', '_self')

    let client_id = '1656734224';
    let redirect_uri = 'https://jxes6102.github.io/bryte/';
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=logintest';
    link += '&scope=openid%20profile';

    // openLink(link)
    openLink('https://tw.dictionary.search.yahoo.com/')
}

const openLink = (url) => {
    // window.location.replace(res.data.data)
    // window.open(res.data.data, '_self')
    window.location.href = url

}

</script>
<style lang="scss" scoped>
:deep(.el-input-group__append) {
    padding: 0px;
}
</style>
