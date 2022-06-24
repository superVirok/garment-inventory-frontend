<template>
    <div>
        <div class="ui three column centered grid" style="text-align: center;margin-right: 5px;">
            <div class="row">
                <div class="column">
                    <div class="ui labeled icon input">
                        <label for="empowerAccount" class="ui label">用户账号</label>
                        <input type="text" v-model="authorization.userAccount" id="empowerAccount"/>
                        <i class="ui user tie icon"></i>
                    </div>
                </div>

                <div class="row" >
                    <div class="column">
                        <div class="ui labeled icon input">
                            <label for="empowerName" class="ui label">用户名</label>
                            <input type="text" v-model="authorization.userName"  id="empowerName">
                            <i class="ui user icon"></i>
                        </div>
                    </div>
                </div>


                <div class="row" style="margin-left: 15px ;">
                    <div class="column" style="padding: 0;">
                        <div id="btn_search" class="ui teal animated button" @click="search_authorization(1)">
                            <div class="visible content">查询</div>
                            <div class="hidden content"><img src="images/spongebob.webp" class="ui avatar image"></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <table id="new_table" class="ui inverted teal celled structured table" style="height:517.685px ;" >
            <thead >
            <tr>
                <th>序号</th>
                <th>账号</th>
                <th>用户姓名</th>
                <th>用户管理权限</th>
                <th>货物管理权限</th>
                <th>出入库管理权限</th>
            </tr>

            </thead>
            <tbody >
                <tr  v-for="(auth,index) in auth_list.rows " :key="auth.authorizationId">
                    <td>{{(index % page.pageSize) +1}}</td>
                    <td>{{auth.user.userAccount}}</td>
                    <td>{{auth.user.userName}}</td>

                    <td>
                        <div v-if="auth.userAuthorization==1" class="ui blue animated button" @click="editAuthorization(2,'userAuthorization',auth.user.userId)" >
                            <div class="visible content">授予权限</div>
                            <div class="hidden content">authorize</div>
                        </div>
                        <div v-if="auth.userAuthorization==2" class="ui violet animated button" @click="editAuthorization(1,'userAuthorization',auth.user.userId)">
                            <div class="visible content">解除权限</div>
                            <div class="hidden content">disauthorize</div>
                        </div>
                    </td>

                    <td>
                        <div v-if="auth.goodsAuthorization==1" class="ui olive animated button" @click="editAuthorization(2,'goodsAuthorization',auth.user.userId)">
                            <div class="visible content">授予权限</div>
                            <div class="hidden content">authorize</div>
                        </div>
                        <div v-if="auth.goodsAuthorization==2" class="ui red animated button" @click="editAuthorization(1,'goodsAuthorization',auth.user.userId)">
                            <div class="visible content">解除权限</div>
                            <div class="hidden content">disauthorize</div>
                        </div>
                    </td>

                    <td>
                        <div v-if="auth.wareAuthorization==1" class="ui purple animated button" @click="editAuthorization(2,'wareAuthorization',auth.user.userId)">
                            <div class="visible content">授予权限</div>
                            <div class="hidden content">authorize</div>
                        </div>
                        <div v-if="auth.wareAuthorization==2" class="ui orange animated button" @click="editAuthorization(1,'wareAuthorization',auth.user.userId)">
                            <div class="visible content">解除权限</div>
                            <div class="hidden content">disauthorize</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_authorization(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="auth_list.total < page.pageNum * page.pageSize" 
                    @click="search_authorization(page.pageNum +1)">下一页</button>
        </div>
    </div>
</template>


<script>
import beanData from '@/api/beanData';
import getList from '@/api/getList';
export default {
    name:'auth',
    inject:['reload'],
    data(){
        return{
             authorization:beanData.authorization,
             auth_list:getList.list,
             page:getList.page,
        }
    },
    methods:{
        search_authorization(pageNum){
            let authorization_search = this.authorization
            this.page.pageNum = pageNum
            let page_search = this.page

            this.axios.get('http://localhost:8080/searchAuthorization',{
                params:{
                    userAccount:authorization_search.userAccount,
                    userName:authorization_search.userName,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize,
                }
            }).then(
                response=>{
                    this.auth_list.rows = response.data.rows
                    this.auth_list.total = response.data.total
                },
            )
        },

        editAuthorization(status,authorizationStatus,userId){
            if(confirm("确认进行操作吗？")){
                //au 1代表用户权限，2代表商品权限，3代表库存权限
                let au
                if(authorizationStatus === "userAuthorization"){
                    au=1
                }else if(authorizationStatus ==="goodsAuthorization"){
                    au=2
                }else if(authorizationStatus ==="wareAuthorization"){
                    au=3
                }
                this.axios.get('http://localhost:8080/editAuthorization',{
                    params:{
                        userId:userId,
                        status:status,
                        authorizationStatus:au,
                    }
                }).then(
                    response=>{
                        alert(response.data.message)
                        this.reload()
                    },
                )
            }

        },
    },

    created(){
        this.axios.get('http://localhost:8080/searchAuthorization',{
            params:{
                userAccount:null,
                userName:null,
                pageNum:1,
                pageSize:10,
            }
        }).then(
            response=>{
                this.auth_list.rows = response.data.rows
                this.auth_list.total = response.data.total
            },
        )
    }
}
</script>