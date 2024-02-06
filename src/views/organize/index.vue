<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full md:w-[80%] my-3 px-3 text-3xl flex flex-wrap justify-between items-center">
            <div>組織管理</div>
            <div v-if="activeName == '1'"><el-button @click="editGroup" class="mx-1" type="info" >新增集團</el-button></div>
            <div v-else-if="activeName == '2'"><el-button @click="editInstitution" class="mx-1" type="info" >新增單位</el-button></div>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs mx-2" @tab-click="handleClick">
            <el-tab-pane label="集團" name="1"></el-tab-pane>
            <el-tab-pane label="單位" name="2"></el-tab-pane>
            <el-tab-pane label="用戶" name="3"></el-tab-pane>
        </el-tabs>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form v-if="activeName == '1'" :inline="!isMobile" :model="groupForm" label-width="60px">
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="集團名稱或集團代號" v-model="groupForm.keyWord" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form v-else-if="activeName == '2'" :inline="!isMobile" :model="institutionForm" label-width="60px">
                <el-form-item label="集團">
                    <el-col :span="24">
                        <el-input
                            disabled
                            v-model="institutionForm.groupName"
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
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="單位名稱或單位代號" v-model="institutionForm.keyWord" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form v-else-if="activeName == '3'" :inline="!isMobile" :model="userForm" label-width="60px">
                <el-form-item label="集團">
                    <el-col :span="24">
                        <el-input
                            disabled
                            v-model="userForm.groupName"
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
                            v-model="userForm.institution" 
                            placeholder="">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="使用者名稱或帳號" v-model="userForm.keyWord" />
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
            <el-table v-if="activeName == '1'" :data="groupTable" @row-click="clickGroupRow" stripe style="width: 100%">
                <el-table-column prop="groupName" label="集團名稱" />
                <el-table-column prop="groupID" label="集團代號" />
                <el-table-column prop="leader" label="負責人姓名" />
                <el-table-column prop="amount" label="單位數量" />
                <!-- <el-table-column prop="date" label="Date">
                    <template #default="scope">
                        <div @click="editAuthority(scope)" class="truncate">{{ scope.row.address }}</div>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-table v-else-if="activeName == '2'" :data="institutionTable" @row-click="clickInstitutionRow" stripe style="width: 100%">
                <el-table-column prop="institutionName" label="單位名稱" />
                <el-table-column prop="institutionID" label="單位代號" />
                <el-table-column prop="leader" label="負責人姓名" />
                <el-table-column prop="phone" label="連絡電話" />
                <el-table-column prop="receivable" label="應收帳款" />
                <el-table-column prop="expirationDate" label="到期日" />
            </el-table>
            <el-table v-else-if="activeName == '3'" :data="userTable" @row-click="clickUserRow" stripe style="width: 100%">
                <el-table-column prop="groupName" label="集團" />
                <el-table-column prop="institutionName" label="機構" />
                <el-table-column prop="user" label="名稱" />
                <el-table-column prop="account" label="帳號" />
                <el-table-column prop="email" label="信箱" />
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
            <dialogView @close="cancel" v-if="editGroupStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">編輯集團</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="groupData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="集團識別碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.key" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="集團名稱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.name" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="集團代號">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.id" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="單位數量">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.institutionCount" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="負責人姓名">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.leaderName" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="負責人電話">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.leaderPhone" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="負責人信箱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.leaderEmail" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="建立時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.createTime" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="修改時間">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="groupData.modifyTime" />
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            @click="checkGroup"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                @click="checkGroup"
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

            <dialogView @close="cancel" v-if="editUserStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">編輯使用者</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="userData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <el-form-item label="使用者識別碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.key" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="使用者名稱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.name" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="使用者暱稱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.nickName" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="使用者帳號">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.account" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="使用者密碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.password" type="password" show-password />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="電子信箱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.email" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="手機">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.phone" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="性別">
                                <el-col :span="24">
                                    <el-select
                                        style="width: 100%;font-size: 14px;"
                                        v-model="userData.sex" 
                                        placeholder="">
                                        <el-option label="男" value="男" />
                                        <el-option label="女" value="女" />
                                        <el-option label="不便透漏" value="不便透漏" />
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="生日">
                                <el-col :span="24">
                                    <el-date-picker
                                        popper-class="custom-date-picker"
                                        v-model="userData.birthday"
                                        type="date"
                                        placeholder="Pick a date"
                                        :default-value="new Date()"
                                        style="width: 100%;font-size: 14px;"
                                    />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="邀請碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.invitationNumber" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE識別碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="userData.lineNumber" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="權限群組">
                                <el-col :span="24">
                                    <el-select
                                        style="width: 100%;font-size: 14px;"
                                        v-model="userData.authority" 
                                        placeholder="">
                                        <el-option label="使用者" value="使用者" />
                                        <el-option label="集團管理員" value="集團管理員" />
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            @click="checkUser"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                @click="checkUser"
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


            <dialogView type="small" @close="closeMenu" v-if="menuStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">選單</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-full h-[200px] p-4 flex flex-col justify-between items-center gap-y-[20px]">
                        <div @click="editInstitution" class="w-[95%] md:w-[90%] text-2xl p-2 border-[1px] border-black rounded-lg flex flex-wrap justify-center items-center">編輯基本資料</div>
                        <div @click="editBanner" class="w-[95%] md:w-[90%] text-2xl p-2 border-[1px] border-black rounded-lg flex flex-wrap justify-center items-center">編輯橫幅</div>
                        <div class="w-[95%] md:w-[90%] text-2xl text-gray-400 p-2 border-[1px] border-gray-400 rounded-lg flex flex-wrap justify-center items-center">編輯簡介(製作中)</div>
                    </div>
                </template>
            </dialogView>

            <dialogView @close="closeInstitution" v-if="editInstitutionStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">編輯單位</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <el-form :inline="false" label-position="top" :model="institutionData" label-width="60px" style="width:100%;padding:10px 5px;">
                            <div class="text-2xl font-semibold">基本資料</div>
                            <el-form-item label="單位識別碼">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.key" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="所屬集團">
                                <el-col :span="24">
                                    <el-input
                                        disabled
                                        v-model="institutionData.group"
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
                            <el-form-item label="單位名稱">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.name" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="單位代號">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.id" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="單位電話">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.phone" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="負責人">
                                <el-col :span="24">
                                    <el-input
                                        disabled
                                        v-model="institutionData.leader"
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
                            <div class="text-2xl font-semibold">LINE設定</div>
                            <el-form-item label="邀請URL">
                                <el-col :span="24">
                                    <el-input
                                        disabled
                                        v-model="institutionData.invitationUrl"
                                        placeholder=""
                                        class="input-with-select"
                                        >
                                        <template #append>
                                            <el-button
                                                style="background-color: #409eff;color:white;">
                                                複製
                                            </el-button>
                                        </template>
                                    </el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE Login Channel ID">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineID" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE Login Channel Secret">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineSecret" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE@生活圈 搜尋ID">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineSerachID" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE Login LIFF ID">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineLiffID" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LIFF Url">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineLiffUrl" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE Messaging Channel ID">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineMessagingID" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="LINE Messaging Channel Secret">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.lineMessagingSecret" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="應支付金額">
                                <el-col :span="24">
                                    <el-input placeholder="" v-model="institutionData.paymentAmount" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="支付期限">
                                <el-col :span="24">
                                    <el-date-picker
                                        popper-class="custom-date-picker"
                                        v-model="institutionData.paymentTerm"
                                        type="date"
                                        placeholder="Pick a date"
                                        :default-value="new Date()"
                                        style="width: 100%;font-size: 14px;"
                                    />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="到期日">
                                <el-col :span="24">
                                    <el-date-picker
                                        popper-class="custom-date-picker"
                                        v-model="institutionData.stopDate"
                                        type="date"
                                        placeholder="Pick a date"
                                        :default-value="new Date()"
                                        style="width: 100%;font-size: 14px;"
                                    />
                                </el-col>
                            </el-form-item>
                            
                        </el-form>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            @click="checkInstitution"
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                @click="checkInstitution"
                                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                確定
                            </button>
                            <button
                                @click="closeInstitution"
                                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                取消
                            </button>
                        </div>
                    </div>
                </template>
            </dialogView>

            <dialogView type="auto" @close="closeBanner" v-if="bannerStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">編輯橫幅</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <el-table :data="bannerTable" stripe style="width: 100%">
                        <el-table-column prop="sort" label="排序" width='60'>
                            <template #default>
                                <div class="w-full flex flex-col justify-center items-center"> 
                                    <el-icon :size='isMobile ? 20 : 30'><ArrowUp /></el-icon>
                                    <el-icon :size='isMobile ? 20 : 30'><ArrowDown /></el-icon>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="img" label="縮圖" />
                        <el-table-column prop="url" label="圖片位置" />
                        <el-table-column prop="link" label="連結位置" />
                        <el-table-column prop="work" label="操作" width='60'>
                            <template #default>
                                <div class="w-full flex flex-col justify-center items-center"> 
                                    <el-icon :size='isMobile ? 20 : 30'><Delete /></el-icon>
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="date" label="Date">
                            <template #default="scope">
                                <div @click="editAuthority(scope)" class="truncate">{{ scope.row.address }}</div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <div class="w-full px-5 my-2">
                        <button
                            @click="addBanner"
                            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            新增橫幅
                        </button>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-between items-center">
                        <button
                            class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            刪除
                        </button>
                        <div class="w-auto flex flex-wrap justify-end items-center">
                            <button
                                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                                確定
                            </button>
                            <button
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
import { ref,computed,watch } from "vue"
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

const groupForm = ref({
    keyWord:''
})

const institutionForm = ref({
  groupName:'',
  keyWord:'',
})

const userForm = ref({
  groupName:'',
  institution:'',
  keyWord:'',
})

const onSubmit = () => {
  console.log('submit!')
}

const openSelect = () => {
    groupStatus.value = true
}

const cancel = () => {
    groupStatus.value = false
    editGroupStatus.value = false
    editUserStatus.value = false
}

const groupTable = [
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
]

const institutionTable = [
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },

]

const userTable = [
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },

]

const groupData = ref({
    key:'',
    name:'',
    id:'',
    institutionCount:'',
    leaderName:'',
    leaderPhone:'',
    leaderEmail:'',
    createTime:'',
    modifyTime:'',
})
const editGroupStatus = ref(false)
const editGroup = (item) => {
    editGroupStatus.value = true
}

const checkGroup = () => {
    console.log('checkGroup',groupData.value)
}

const clickGroupRow = (row, column, event) => {
    console.log('clickRow',row, column, event)
    editGroup()
}

const userData = ref({
    key:'',
    name:'',
    nickName:'',
    account:'',
    password:'',
    email:'',
    phone:'',
    sex:'',
    birthday:new Date(),
    invitationNumber:'',
    lineNumber:'',
    authority:''
})
const editUserStatus = ref(false)
const editUser = (item) => {
    editUserStatus.value = true
}

const checkUser = () => {
    console.log('checkUser',userData.value)
}

const clickUserRow = (row, column, event) => {
    console.log('clickRow',row, column, event)
    editUser()
}



const editInstitutionStatus = ref(false)
const menuStatus = ref(false)
const clickInstitutionRow = (row, column, event) => {
    console.log('clickInstitutionRow',row, column, event)
    menuStatus.value = true
}
const closeMenu = () => {
    console.log('closeMenu')
    menuStatus.value = false
}
const editInstitution = () => {
    console.log('editInstitution')
    editInstitutionStatus.value = true
    closeMenu()
}
const institutionData = ref({
    key:'',
    group:'',
    name:'',
    id:'',
    phone:'',
    leader:'',
    invitationUrl:'',
    lineID:'',
    lineSecret:'',
    lineSerachID:'',
    lineLiffID:'',
    lineLiffUrl:'',
    lineMessagingID:'',
    lineMessagingSecret:'',
    paymentAmount:'',
    paymentTerm:'',
    stopDate:'',
})
const closeInstitution = () => {
    editInstitutionStatus.value = false
}
const checkInstitution = () => {
    console.log('checkInstitution',institutionData.value)
}


// activeName string 1 集團 2 單位 3 用戶
const activeName = ref(localStorage.getItem('activeName') || '1')
watch(activeName, (newVal, oldVal) => {
    // console.log('activeName',newVal)
    localStorage.setItem('activeName',newVal)
})
const handleClick = (tab, event) => {
    //  console.log('activeName',activeName.value)
    //  console.log('tab', tab)
    //  console.log('event', event)
}

const bannerStatus = ref(false)
const bannerTable = ref([
    {
        sort:'',
        img:'',
        url:'',
        link:'test1',
        work:'',
        key:1
    },
])
const closeBanner = () => {
    bannerStatus.value = false
}
const editBanner = () => {
    closeMenu()
    bannerStatus.value = true
}
const addBanner = () => {
    // console.log('addBanner')
    bannerTable.value.push(
        {
            sort:'',
            img:'',
            url:'',
            link:'test'+(bannerTable.value.length+1),
            work:'',
            key:bannerTable.value.length+1
        },
    )
    
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

:deep(.demo-tabs > .el-tabs__header) {
    margin: 0px !important;
}

</style>