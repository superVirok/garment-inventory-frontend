<template>
    <div>
        <div class="ui three column centered grid" style="text-align: center;margin-right: 5px;">
            <div class="row" style="text-align: left;" >
                <div class="column" style="padding: 0;">
                    <div class="ui  right icon left labeled input" style="margin-left: 5px;">
                        <label for="warehouse" class="ui label">{{$route.query.id == 0 ?  '所入仓库':'所出仓库'}}</label>
                        <input type="text" id = "warehouse" v-model="record.recordWarehouse" >
                        <i class="ui warehouse icon"></i>
                    </div>
                </div>
                <div class="column" style="padding: 0;">
                    <div class="ui  right icon left labeled  input">
                        <label for="code" class="ui label">{{$route.query.id == 0 ? '入库编号':'出库编号'}}</label>
                        <input type="text" id = "code" v-model="record.recordCode">
                        <i class="ui file alternate outline icon"></i>
                    </div>
                </div>

                <div class="column" style="padding: 0;">
                    <div id="record_search" class="ui teal animated button" @click="search_record(1)">
                        <div class="visible content">查询</div>
                        <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                    </div>


                    <div id="record_add" class="ui blue animated button" @click="showModel('add',null)">
                        <div class="visible content">新增</div>
                        <div class="hidden content"><img src="../assets/spongebob1.webp" class="ui avatar image"></div>
                    </div>
                </div>

            </div>
        
            <div class="row" >
                <div class="column" style="padding: 0;">
                    <div class="ui calendar" id="rangestart">
                        <div class="ui input  icon labeled">
                            <label  class="ui label">{{$route.query.id == 0 ? '入库日期':'出库日期'}}</label>
                            <!-- <i class="calendar icon"></i> -->
                            <input type="date" placeholder="Start" v-model="record.startTime">
                        </div>
                        <font style="font-weight: bolder;">-------------------------------------></font>
                    </div>
                </div>

                <div class="column" style="padding: 0px;">
                    <div class="ui calendar" id="rangeend" style="text-align:left ;" >
                        <div class="ui input icon">
                            <!-- <i class="calendar icon"></i> -->
                            <input type="date" placeholder="End" v-model="record.endTime">
                        </div>
                    </div>
                </div>

            </div>
        
        </div>





        <table id="new_table" class="ui inverted teal celled structured table" style="height:517.685px ;" >
            <thead >
                <tr>
                    <th>序号</th>
                    <th>单据编号</th>
                    <th>所入仓库</th>
                    <th>入库日期</th>
                    <th>经办人</th>
                    <th>来源</th>
                    <th>操作</th>

                </tr>
            </thead>
            <tbody >
               <tr v-for="(record,index) in record_list.rows" :key="record.recordId">
                        <td>{{(index % page.pageSize) +1}}</td>
                        <td>{{record.recordCode}}</td>
                        <td>{{record.recordWarehouse}}</td>
                        <td>{{record.recordTime}}</td>
                        <td>{{record.recordName}}</td>
                        <td>{{record.recordOrigin}}</td>

                        <td>
                            <div class="ui blue animated button"  @click="remove(record.recordId)" >
                                <div class="visible content">删除</div>
                                <div class="hidden content">delete</div>
                            </div>
                            <div class="ui blue animated button"  @click="showModel('edit',record)" >
                                <div class="visible content">编辑</div>
                                <div class="hidden content">edit</div>
                            </div>
                            <div class="ui violet animated button"  @click="showGoods_RecordItemModel(record.recordId)" >
                                <div class="visible content">增加库单详情</div>
                                <div class="hidden content">add</div>
                            </div>
                        </td>

                    </tr>

    

            </tbody>
        
        </table>

        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_record(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="record_list.total < page.pageNum * page.pageSize" 
                    @click="search_record(page.pageNum +1)">下一页</button>
        </div>

        <div id="record_model" class="ui modal ">
            <div class="ui icon header" style="background-color: rgb(5, 161, 161);">
                <i class="warehouse icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {{isEditModel === false? "添加出入库单信息":"编辑出入库信息"}}
                    </font></font></div>
            <div class="content" style="background-color:rgb(5, 161, 161);" >
                <div class="ui two column grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row">

                        <div class="column">
                            <div class="ui large  icon  labeled transparent input">
                                <label for="recordBank" class="ui label">所入仓库</label>
                                <input id ="recordBank" v-model="record_model.recordWarehouse" type="text"
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="product hunt icon"></i>
                            </div>
                        </div>

                        <div class="column" >
                            <div class="ui large icon labeled  transparent input">
                                <label for="recordOri" class="ui label">商品来源</label>
                                <input id ="recordOri" type="text" v-model="record_model.recordOrigin" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="file signature icon"></i>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column" >
                            <div class="ui calendar" id="start" >
                                <div class="ui large icon labeled  transparent input" style="width: 340.46px;">
                                    <label  class="ui label">入库日期</label>
                                    <i class="calendar icon"></i>
                                    <input type="date" placeholder="Start" v-model="record_model.recordTime" required>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>

            <div class="actions" style="background-color: rgb(5, 161, 161);">
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


        <!-- 增加库单详细模态框 -->
        <div id="Goods_RecordItemModel" class="ui huge modal ">
            <div class="ui icon header" style="background-color: aqua;">
                <i class="product hunt icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {{$route.query.id == 0? "添加入库单明细 ":"添加出库单明细 "}}
                    </font></font></div>
            <div class="content" style="background-color: aqua;" >
                <div class="ui three column grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row">
                        <div class="column">
                            <div class="ui labeled input">
                                <label for="clothType" class="ui label">产品类型</label>

                                <select v-model="Goods_RecordItem.typeId" id="select" style="padding: 0; margin:0px;width:208.82px;height: 37.95px;">
                                    <option value="0" selected="selected">所有类型</option>
                                    <option :value="type.typeId" v-for="type in type_Goods_RecordItem_list.rows" :key="type.typeId">
                                        {{type.typeName}}
                                    </option>

                                </select>

                            </div>
                        </div>

                        <div class="column">
                            <div class="ui labeled icon input">
                                <label for="clothCode" class="ui label">产品编号</label>
                                <input type="text"  id="clothCode" v-model="Goods_RecordItem.goodsCode">
                                <i class="ui file alternate outline icon"></i>
                            </div>
                        </div>

                        <div class="column">
                            <div class="ui labeled icon input">
                                <label for="clothName" class="ui label">产品名字</label>
                                <input type="text"  id="clothName" v-model="Goods_RecordItem.goodsName">
                                <i class="ui tshirt icon"></i>
                            </div>
                        </div>

                    </div>

                    <div class="row">

                        <div class="column" >
                            <div class="ui labeled input">
                                <label for="clothType" class="ui label">价格区间</label>
                                <input id="select1" type="number" required
                                      v-model="Goods_RecordItem.lowPrice" style="width: 88px;height: 37.95px;"/>
                            </div>
                            -----
                            <div class="ui labeled input">
                                <input id="select2" type="number" v-model="Goods_RecordItem.highPrice" 
                                        style="width: 88px;height: 37.95px;" />
                            </div>
                        </div>

                        <div class="column">
                            <div class="ui labeled input">
                                <label for="clothType" class="ui label">有无库存</label>
                                <select v-model="Goods_RecordItem.status" id="select" style="width:208.82px;height: 37.95px;">
                                    <option value="0" selected>全部</option>
                                    <option value="1">有库存</option>
                                    <option value="2">无库存</option>
                                </select>
                            </div>
                        </div>

                        <div class="column" style="padding: 0;">
                            <div id="goods_search" class="ui teal animated button" @click="search_Goods_RecordItem(1)">
                                <div class="visible content">查询</div>
                                <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="ui inverted celled teal structured table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>产品编号</th>
                            <th>产品类型</th>
                            <th>产品库存</th>
                            <th>产品名字</th>
                            <th>产品尺寸</th>
                            <th>产品颜色</th>
                            <th>产品价格</th>
                            <th>产品公司</th>
                            <th>商品数量</th>

                        </tr>
                    </thead>


                    <tr class="Goods_RecordItemTr" v-for="(Goods_RecordItem1,index) in Goods_RecordItem_list.rows" :key="Goods_RecordItem1.goodsId">
                        <td>{{(index % page.pageSize) +1}}</td>
                        <td>{{Goods_RecordItem1.goodsCode}}</td>
                        <td>{{Goods_RecordItem1.typeName}}</td>
                        <td>{{Goods_RecordItem1.goodsStock}}</td>
                        <td>
                            {{Goods_RecordItem1.goodsName}}
                        </td>
                        <td>{{Goods_RecordItem1.goodsSize}}</td>
                        <td>{{Goods_RecordItem1.goodsColor}}</td>
                        <td>{{Goods_RecordItem1.goodsPrice}}</td>

                        <td>{{Goods_RecordItem1.goodsCompany}}</td>

                        <td>
                            <div class="ui small icon  transparent input" style="width:100%;">
                                <input value="0" :min="0" :max="$route.query.id == 1? Goods_RecordItem1.goodsStock:10000" autocomplete="off" 
                                      class="Goods_RecordItem_Count" type="number" style="font-size: large;font-weight: 800;color: blue;"/>
                                <i class="dollar sign icon"></i>
                            </div>
                        </td>
                        <td style="display: none">
                            <input :value="Goods_RecordItem1.goodsId" class="Goods_RecordItem_Id_Td" style="visibility: hidden">
                        </td>



                    </tr>

                </table>

                <button class="ui blue button" :disabled="page_record.pageNum ===1" @click="search_Goods_RecordItem(page_record.pageNum -1)">上一页</button>
                <span>当前第{{page_record.pageNum}}页</span>
                <button class="ui blue button" :disabled="Goods_RecordItem_list.total <= page_record.pageNum * page_record.pageSize" @click="search_Goods_RecordItem(page_record.pageNum +1)">下一页</button>
                    
                
            </div>

            <div class="actions" style="background-color: aqua;">
                <div class="ui purple inverted animated button"  @click="submitGoods_RecordItem()">
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
    name:'stock',
    inject:['reload'],
    data(){
        return{
            isEditModel:false,
            page:{...getList.page},
            page_record:{...getList.page},
            Goods_Record_Id:null,
            record:{...beanData.record},
            record_list:{...getList.list},
            Goods_Record_Map:null,
            Goods_RecordItem_list:{...getList.list},
            record_model:modelData.record_model,
            type_Goods_RecordItem_list:{...getList.list},
            Goods_RecordItem:{...modelData.Goods_RecordItem},
            Goods_RecordItemModel:{...modelData.Goods_RecordItemModel},

            

        }
    },
    methods:{
        showModel(operation,bean){
            this.record_model={...bean}
            this.isEditModel=operation === 'add'? false:true
            $(function () {
                $("#record_model").modal("show");
            })
        },
         hideModel(){        
            window.$("#record_model").modal("hide");
        },
        remove(id){
            if(confirm('确定删除吗?')){
            {
                this.axios.get('http://localhost:8080/deleteRecord',{
                    params:{recordId:id}
                }).then(
                    response=>{alert(response.data.message)
                        if (response.data.success)
                            alert(response.data.message)
                            this.reload()
                    },
                )
                }
            }
        },

        search_record(pageNum){
            let record_search = this.record
            this.page.pageNum = pageNum
            let page_search = this.page
            let status=0//1代表出库 2代表入库
            if(this.$route.query.id == 0 ){
                status=2
            }else if(this.$route.query.id == 1){
                status=1
            }

            this.axios.get('http://localhost:8080/searchRecord',{
                params:{
                    recordId:record_search.recordId,
                    recordCode:record_search.recordCode,
                    recordWarehouse:record_search.recordWarehouse,
                    recordTime:record_search.recordTime,
                    recordName:record_search.recordName,
                    recordOrigin:record_search.recordOrigin,
                    recordStatus:status,
                    startTime:record_search.startTime,
                    endTime:record_search.endTime,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize
                }
            }).then(
                response=>{
                    this.record_list.rows = response.data.rows
                    this.record_list.total = response.data.total
                    this.hideModel()

                },
            )
        },

        submit(isEdit){
            if (confirm("确定提交信息吗?")){
                let record = this.record_model
                let status=0//1代表出库 2代表入库
                if(this.$route.query.id ==0){
                    status=2
                }else if(this.$route.query.id ==1){
                    status=1
                }
                if (isEdit === true){
                    //修改出入库单
                    this.axios.get('http://localhost:8080/editRecord',{
                        params:{
                            recordId:record.recordId,
                            recordCode:record.recordCode,
                            recordWarehouse:record.recordWarehouse,
                            recordTime:record.recordTime,
                            recordName:record.recordName,
                            recordOrigin:record.recordOrigin,
                            recordStatus:status
                        }
                    }).then(
                        response=>{alert(response.data.message)
                            if (response.data.success)
                                this.reload()
                                this.hideModel()
                        },
                    )
                }else{
                    //增加出入库单
                    this.axios.get('http://localhost:8080/addRecord',{
                        params:{
                            recordId:record.recordId,
                            recordCode:record.recordCode,
                            recordWarehouse:record.recordWarehouse,
                            recordTime:record.recordTime,
                            recordName:record.recordName,
                            recordOrigin:record.recordOrigin,
                            recordStatus:status
                        }
                    }).then(
                        response=>{
                            alert(response.data.message)
                            if (response.data.success)
                                 this.reload()
                                this.hideModel()
                        },
                    )
                }
            }
        },
        submitGoods_RecordItem(){
            if(confirm("确认提交吗")) {
                let arrp=document.getElementsByClassName("Goods_RecordItem_Id_Td");
                let arrp1=document.getElementsByClassName("Goods_RecordItem_Count");

                
                for(let i=0;i<10;i++){
                    let Goods_RecordItem_Id_Td =arrp[i].value;
                    let Goods_RecordItem_Count=arrp1[i].value;
                
                    if(Goods_RecordItem_Count === 0){
                        continue;
                    }else if(Goods_RecordItem_Count>0){

                        this.Goods_Record_Map[Goods_RecordItem_Id_Td]=Goods_RecordItem_Count;

                    }

                }

                if(Object.keys (this.Goods_Record_Map).length===0){
                    alert("请选择商品");
                }else if(Object.keys (this.Goods_Record_Map).length>0){
            
                
                    let Goods_Record_Map=this.Goods_Record_Map
                    let Goods_Record_Id=this.Goods_Record_Id

                    //增加出入库单详细
                    this.axios.get('http://localhost:8080/addGoods_RecordItem', {
                        params: {
                            Goods_Record_Map:JSON.stringify(Goods_Record_Map) ,
                            Goods_Record_Id:Goods_Record_Id
                        }
                    }).then(
                        response => {
                            alert(response.data.message)
                            if (response.data.success)
                                this.reload()
                        },
                    )
                }

            }
        },
        showGoods_RecordItemModel(Goods_Record_Id){
            this.Goods_Record_Map=new Map()
            this.Goods_Record_Id=Goods_Record_Id
            this.axios.get('http://localhost:8080/searchTypes').then(
                response=>{
                    this.type_Goods_RecordItem_list.rows = response.data.data
                },
            )
            let goods_search = this.Goods_RecordItem
            let page_search = this.page_record
            this.axios.get('http://localhost:8080/findGoods',{
                params:{
                    goodsId:goods_search.goodsId,
                    goodsName:goods_search.goodsName,
                    goodsColor:goods_search.goodsColor,
                    goodsCode:goods_search.goodsCode,
                    goodsCompany:goods_search.goodsCompany,
                    goodsStock:goods_search.goodsStock,
                    goodsSize:goods_search.goodsSize,
                    typeId:goods_search.typeId,
                    goodsPrice:goods_search.goodsPrice,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize,
                }
            }).then(
                response=>{
                    this.Goods_RecordItem_list.rows = response.data.rows
                    this.Goods_RecordItem_list.total = response.data.total
                    
                },
            )
            $(function (){
                    window.$('#Goods_RecordItemModel').modal("show");
                }
            )

        },
        search_Goods_RecordItem(pageNum){
                let goods_search = this.Goods_RecordItem
                this.page_record.pageNum = pageNum
                let page_search = this.page_record

                this.axios.get('http://localhost:8080/findGoods',{
                    params:{
                        typeId:goods_search.typeId,
                        goodsCode:goods_search.goodsCode,
                        goodsName:goods_search.goodsName,
                        lowPrice: goods_search.lowPrice,
                        highPrice: goods_search.highPrice,
                        status: goods_search.status,
                        pageNum:page_search.pageNum,
                        pageSize:page_search.pageSize
                    }
                }).then(
                    response=>{
                        this.Goods_RecordItem_list.rows = response.data.rows
                        this.Goods_RecordItem_list.total = response.data.total
                    },
                )
            },
    },

    watch:{
          "$route.query.id":{
             handler(newValue,oldValue){             
                let status = 0
                if(newValue == 0){         //js中数字比较用==,而不用===
                     status = 2
                }        
                else status = 1
				this.axios.get('http://localhost:8080/searchRecord',{
                params:{
                    recordId:null,
                    recordCode:null,
                    recordWarehouse:null,
                    recordTime:null,
                    recordName:null,
                    recordOrigin:null,
                    recordStatus:status,
                    startTime:null,
                    endTime:null,
                    pageNum:1,
                    pageSize:10
                }
            }).then(
                response=>{
                    this.record_list.rows = response.data.rows
                    this.record_list.total = response.data.total

                },
            )
			}
        }
    },
    created(){
        let status=0//1代表出库 2代表入库
        if(this.$route.query.id == 0 ){
            status=2
        }else if(this.$route.query.id == 1){
            status=1
        }

        this.axios.get('http://localhost:8080/searchRecord',{
            params:{
                recordId:null,
                recordCode:null,
                recordWarehouse:null,
                recordTime:null,
                recordName:null,
                recordOrigin:null,
                recordStatus:status,
                startTime:null,
                endTime:null,
                pageNum:1,
                pageSize:10
            }
        }).then(
            response=>{
                this.record_list.rows = response.data.rows
                this.record_list.total = response.data.total
            },
        )
    }
}
</script>