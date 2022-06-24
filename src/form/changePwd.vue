<template>
    <div class="ui segment" style="background-color: aqua;">
        <div class="ui three column centered grid">
            <div class="row">
                <div class="ui form">
                    <div class="ui dividing header">修改密码</div>
                    <div class="field">
                        <div class="ui labeled input">
                            <label for="originPwd" class="ui label">原密码</label>
                            <input id="originPwd" type="password" v-model="form.originPwd" required/>
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui labeled input">
                            <label for="newPwd" class="ui label">新密码</label>
                            <input id="newPwd" type="password" v-model="form.newPwd" required/>
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui labeled input">
                            <label for="confirmPwd" class="ui label">确认密码</label>
                            <input id="confirmPwd" type="password" v-model="form.confirmPwd" required/>
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui large teal animated button" @click="changePwd()">
                            <div class="visible content">提交</div>
                            <div class="hidden content">submit</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import form from '../api/form'
export default {
    name:'changePwd',
    data(){
        return{
            form:form
        }
    },
    methods:{
        changePwd(){
            if(confirm("确定修改密码吗?")){
                if(this.form.originPwd ===null || this.form.newPwd === null || this.form.confirmPwd === null){
                    alert("请填写完整表格信息!")
                }
                else if(this.form.originPwd ==="" || this.form.newPwd === "" || this.form.confirmPwd === ""){
                    alert("请填写完整表格信息!")
                }
                else if(this.userInfo.user.userPassword === this.form.originPwd){
                     if(this.form.originPwd !== this.form.newPwd){
                        if(this.form.newPwd === this.form.confirmPwd){
                            let userId = this.userInfo.userId
                            let userPassword = this.form.newPwd
                            this.axios.get('http://localhost:8080/changePwd',{params:{userId,userPassword}}).then(
                                response=>{
                                    alert(response.data.message)
                                    if(response.data.success === true)
                                        // this.store.commit('logout')
                                        sessionStorage.removeItem('userInfo')
                                        window.location.href = "http://localhost:8080"
                                }
                            )
                        }
                        else alert("确认密码有误!")
                     }
                     else alert("新密码与旧密码不能相同!")
                }
                else alert("原密码输入有误!")
            }
            
        }
           
    },
    setup(){
        let userInfo = sessionStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)
        return{
            userInfo
        }
    }
}
</script>