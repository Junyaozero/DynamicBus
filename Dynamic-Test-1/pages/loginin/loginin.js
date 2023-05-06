Page({
    data:{
        disabled:false,//丧失能力
        btnstate:"default",
        account:"",
        password:""
    },
    //获取文本问题
    accountInput:function(e){
        var content = e.detail.value;
        console.log(content);
        if(content!=""){
            this.setData({disabled:false,btnstate:"primary",account:content});
        }else{
            this.setData({disabled:false,btnstate:"default"})
        }
    },
    pwdBlur:function(e){
        var password = e.detail.value;
        if(password != ""){
            this.setData({password:password});
        }
    } 
})