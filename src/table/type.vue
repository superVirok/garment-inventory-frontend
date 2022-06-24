<template>
    <div>
        <div class="ui two column centered grid" style="text-align: center;margin-right: 5px;">
           
           <div class="row" >

                <div class="column" style="text-align:right;">
                    <div class="ui labeled icon input">
                        <label for="clothName" class="ui label">产品名字</label>
                        <input type="text"  id="clothName" v-model="type.typeName">
                        <i class="ui tshirt icon"></i>
                    </div>
                </div>

                <div class="column" style="padding: 0;">
                    <div id="goods_search" class="ui teal animated button"  @click="search_type(1)">
                        <div class="visible content">查询</div>
                        <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                    </div>


                    <div id="goods_add" class="ui blue animated button" @click="showModel('add',null)">
                        <div class="visible content">新增</div>
                        <div class="hidden content"><img src="../assets/spongebob1.webp" class="ui avatar image"></div>
                    </div>
                </div>

            </div>
        </div>



         <table id="new_table" class="ui inverted teal celled structured table" style="height:517.685px ;" >
                <thead >
                <tr>
                    <th>序号</th>
                    <th>类型名称</th>
                    <th>操作</th>

                </tr>
                </thead>
                <tbody >
                <tr v-for="(type,index) in type_list.rows" :key="index">
                    <td>{{(index % page.pageSize)+1}}</td>
                    <td>{{type.typeName}}</td>
                    <td>

                        <div class="ui blue animated button"  @click="showModel('edit',type)">
                            <div class="visible content">编辑</div>
                            <div class="hidden content">edit</div>
                        </div>
                        <div class="ui blue animated button" @click="remove(type.typeId)">
                            <div class="visible content">删除</div>
                            <div class="hidden content">delete</div>
                        </div>
                    </td>
                </tr>

                </tbody>
              
         </table>


        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_type(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="type_list.total < page.pageNum * page.pageSize" 
                    @click="search_type(page.pageNum +1)">下一页</button>
        </div>

         <div id="type_model" class="ui modal ">
            <div class="ui icon header" style="background-color: aqua;">
                <i class="mitten icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                       {{isEditModel === false? "添加类型信息":"编辑类型信息"}} 
                    </font></font></div>
            <div class="content" style="background-color: aqua;" >
                <div class="ui three column centered grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row">

                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="typeName" class="ui label">类型名称</label>
                                <input id = "typeName" type="text" style="font-size: large;font-weight: 800;color: blue;" 
                                       v-model="type_model.typeName" required>
                                <i class="code branch icon"></i>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            <div class="actions" style="background-color: aqua;">
                <div class="ui purple inverted animated button" @click="submit(isEditModel)">
                    <div class="visible content"><i class="checkmark icon" ></i>确定</div>
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
    name:'type',
    inject:['reload'],
    data(){
       return{
          isEditModel:false,
          type:beanData.type,
          page:{...getList.page},
          type_list:{...getList.list},
          type_model:modelData.type_model
       }
    },
    methods:{
         showModel(operation,bean){
            this.type_model={...bean}
            this.isEditModel = operation === 'add'? false:true
            window.$("#type_model").modal("show");

        },
        hideModel(){        
            window.$("#type_model").modal("hide");
        },
        remove(id){
            if(confirm('确定删除吗?')){                   
                this.axios.get('http://localhost:8080/deleteType',{
                        params:{id}}).then(
                            response=>{
                                alert(response.data.message)
                                this.reload()
                        }
                    )
            }
        },
        search_type(pageNum){
            let type_search = this.type
            this.page.pageNum = pageNum
            let page_search = this.page

            this.axios.get('http://localhost:8080/searchType',{
                params:{
                    typeId:type_search.typeId,
                    typeName:type_search.typeName,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize,
                }
            }).then(
                response=>{
                    this.type_list.rows = response.data.rows
                    this.type_list.total = response.data.total
                },
            )
        },
        submit(isEdit){
            if (confirm("确定提交信息吗?")){
                let type = this.type_model
                if (isEdit === true){
                    this.axios.get('http://localhost:8080/editType',{
                        params:{
                            typeId:type.typeId,
                            typeName:type.typeName,
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
                    this.axios.get('http://localhost:8080/addType',{
                        params:{
                            typeId:type.typeId,
                            typeName:type.typeName,
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
    created(){
        this.axios.get('http://localhost:8080/searchType',{
            params:{
                typeId:null,
                typeName:null,
                pageNum:1,
                pageSize:10,
            }
        }).then(
            response=>{
                this.type_list.rows = response.data.rows
                this.type_list.total = response.data.total
            },
        )
    }
}
</script>