export default{
    user_model:{
        userId:null,
        userAccount:null,
        userName:null,
        userPhone:null,
        userEmail:null
    },
    goods_model:{
        goodsCode:null,
        goodsStock:null,
        goodsName:null,
        goodsSize:null,
        goodsColor:null,
        goodsPrice:null,
        goodsCompany:null,
        typeId:null
    },
    record_model:{
        recordId:null,
        recordCode:null,
        recordWarehouse:null,
        recordTime:null,
        recordName:null,
        recordOrigin:null,
        recordStatus:null,
        startTime:null,
        endTime:null
    },
    recordItem_model:{
        recordItemId:null,
        recordItemCount:null,
        recordCode:null,
        recordId:null,
        goodsCode:null,
        recordStatus:null,
        goodsId:null,
        goods:null,
        type:null
    },
    authorization_model:{
        authenId:null,
        userId:null,
        userAuthorization:null,
        goodsAuthorization:null,
        wareAuthorization:null,
        userAccount:null,
        userName:null,
        user:null
    },
    type_model:{
        typeId:null,
        typeName:null,
    },
    Goods_RecordItemModel:{
        goodsCode:null,
        goodsStock:null,
        goodsName:null,
        goodsSize:null,
        goodsColor:null,
        goodsPrice:null,
        goodsCompany:null
    },
    Goods_RecordItem:{
        goodsId:null,
        goodsCode:null,
        typeId:null,
        goodsStock:null,
        goodsName:null,
        goodsSize:null,
        goodsColor:null,
        goodsPrice:null,
        goodsCompany:null,
        status:null  ,//1代表有库存 2代表没有库存
        lowPrice:null ,//表示最低价格
        highPrice:null//表示最高价格
    },
}