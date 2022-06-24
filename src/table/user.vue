<template>
    <div>
        <div class="ui three column centered grid" style="text-align: center;margin-right: 5px;">
            <div class="row" >
                <div class="column">
                    <div class="ui labeled icon input">
                        <label for="userAccount" class="ui label" >用户账号</label>
                        <input type="text" id="userAccount"  v-model="user.userAccount"/>
                        <i class="ui user tie icon"></i>
                    </div>
                </div>

                <div class="row" >
                    <div class="column">
                        <div class="ui labeled icon input">
                            <label for="userName" class="ui label" >用户名</label>
                            <input type="text"  id="userName" v-model="user.userName"/>
                            <i class="ui user icon"></i>
                        </div>
                    </div>
                </div>


                <div class="row" style="margin-left: 15px ;">
                    <div class="column" style="padding: 0;">
                        <div id="user_search" class="ui teal animated button" @click="search_user(1)">
                            <div class="visible content">查询</div>
                            <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                        </div>


                        <div id="user_add" class="ui blue animated button" @click="showModel('add',null)">
                            <div class="visible content">新增</div>
                            <div class="hidden content"><img src="../assets/spongebob1.webp" class="ui avatar image"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <table id="new_table" class="ui inverted teal celled structured table" style="height:517.685px ;" >
            <thead>
                <tr>
                    <th>序号</th>
                    <th>用户账号</th>
                    <th>用户姓名</th>
                    <th>用户电话</th>
                    <th>用户邮箱</th>
                    <th>操作</th>

                </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in user_list.rows" :key="user.userId">
                        <td>{{(index % page.pageSize)+1}}</td>
                        <td>{{user.userAccount}}</td>
                        <td>{{user.userName}}</td>
                        <td>{{user.userPhone}}</td>
                        <td>
                            {{user.userEmail}}
                        </td>

                        <td>
                            <div class="ui blue animated button" @click="remove(user.userId)">
                                <div class="visible content">删除</div>
                                <div class="hidden content">delete</div>
                            </div>
                            <div class="ui blue animated button" @click="showModel('edit',user)" >
                                <div class="visible content">编辑</div>
                                <div class="hidden content">edit</div>
                            </div>
                        </td>
                    </tr>

            </tbody>                   
        </table>

        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_user(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="user_list.total < page.pageNum * page.pageSize" 
                    @click="search_user(page.pageNum +1)">下一页</button>
        </div>



          <!-- 添加用户和编辑用户信息的模态框 -->
        <div id="user_model" class="ui modal ">
            <div class="ui icon header" style="background-color: rgb(7, 180, 180);">
                <i class="user icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                {{isEditModel === false? "添加用户信息":"编辑用户信息"}}
                    </font></font></div>
            <div class="content" style="background-color: rgb(7, 180, 180);" >
                <div class="ui two column grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row">

                        <div class="column">
                            <div class="ui large icon  labeled transparent input">
                                <label for="uAccount" class="ui label" >用户账号</label>
                                <input id = "uAccount" type="text" :disabled="isEditModel"
                                       style="font-size: large;font-weight: 800;color: blue;" 
                                        v-model="user_model.userAccount" required>
                                <i class="user icon"></i>
                            </div>
                        </div>

                        <div class="column">
                            <div class="ui large right icon left labeled transparent input">
                                <label for="uName" class="ui label" >用户姓名</label>
                                <input id = "uName" type="text" style="font-size: large;font-weight: 800;color: blue;" 
                                       v-model="user_model.userName" required>
                                <i class="user tie icon"></i>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column" >
                            <div class="ui large right icon left labeled transparent input">
                                <label for="uPhone" class="ui label" >用户电话</label>
                                <input id = "uPhone" type="text" style="font-size: large;font-weight: 800;color: blue;" 
                                       v-model="user_model.userPhone" required>
                                <i class="phone icon"></i>
                            </div>
                        </div>

                        <div class="column" >
                            <div class="ui large right icon left labeled transparent input">
                                <label for="uMail" class="ui label" >用户邮箱</label>
                                <input id = "uMail" type="text" style="font-size: large;font-weight: 800;color: blue;" 
                                        v-model="user_model.userEmail" required>
                                <i class="at icon"></i>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="actions" style="background-color: rgb(7, 180, 180);">
                <div class="ui  teal inverted animated button" @click="submit(isEditModel)">
                    <div class="visible content"><i class="checkmark icon"></i>确定</div>
                    <div class="hidden content">保存信息</div>
                </div>

                <div class="ui red cancel inverted animated button">
                    <div class="visible content"><i class="remove icon"></i>取消</div>
                    <div class="hidden content">取消操作</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import beanData from '@/api/beanData';
import modelData from '@/api/modelData'
import getList from '@/api/getList';

export default {
    name:'user',
    inject:['reload'],
    data(){
        return{
            isEditModel:false,
            user:beanData.user,
            page:getList.page,
            user_list:getList.list,
            user_model:modelData.user_model
        }
    },
    methods:{
        showModel(operation,bean){
            this.user_model = {...bean}
            this.isEditModel = operation === 'add'? false:true
            $(function () {
                $("#user_model").modal("show");
            })

        },
        hideModel(){        
            window.$("#user_model").modal("hide");
        },
        remove(id){
                if(confirm('确定删除吗?')){                   
                    this.axios.get('http://localhost:8080/deleteUser',{
                            params:{userId:id}}).then(
                                response=>{
                                    alert(response.data.message)
                                    this.reload()
                            }
                        )
                }
        },
        search_user(pageNum){
            let user_search = this.user
            this.page.pageNum = pageNum
            let page_search = this.page

            this.axios.get('http://localhost:8080/searchUser',{
                params:{
                    userAccount:user_search.userAccount,
                    userName:user_search.userName,
                    userPhone:user_search.userPhone,
                    userEmail:user_search.userEmail,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize,
                }
            }).then(
                response=>{
                    this.user_list.rows = response.data.rows
                    this.user_list.total = response.data.total
                },
            )
        },
        submit(isEdit){
            if (confirm("确定提交信息吗?")){
                let user = this.user_model
                if (isEdit === true){
                    this.axios.get('http://localhost:8080/editUser',{
                        params:{
                            userId:user.userId,
                            userAccount:user.userAccount,
                            userName:user.userName,
                            userPhone:user.userPhone,
                            userEmail:user.userEmail
                        }
                    }).then(
                        response=>{alert(response.data.message)
                            if (response.data.success === true){
                                this.reload()
                                this.hideModel()
                            }
                        },
                    )
                }
                else{
                    this.axios.get('http://localhost:8080/addUser',{
                        params:{
                            userId:user.userId,
                            userAccount:user.userAccount,
                            userName:user.userName,
                            userPhone:user.userPhone,
                            userEmail:user.userEmail
                        }
                    }).then(
                        response=>{
                            alert(response.data.message)
                            if (response.data.success === true){
                                this.reload()
                                this.hideModel()
                                 
                            }
                        },
                    )
                }
            }
        },
    },
    mounted(){
        this.axios.get('http://localhost:8080/searchUser',{
            params:{
                    "userAccount":null,
                    "userName":null,
                    "userPhone":null,
                    "userEmail":null,
                    "pageNum":1,
                    "pageSize":10,
                }
            }).then(
                response=>{
                    this.user_list.rows = response.data.rows
                    this.user_list.total = response.data.total
                },
            )          
            
    }
   
}
</script>