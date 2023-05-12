Page({
    data:{
        disabled:true,//丧失能力
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
            this.setData({disabled:true,btnstate:"default"})
        }
    },
    pwdBlur:function(e){
        var password = e.detail.value;
        if(password != ""){
            this.setData({password:password});
        }
    },
    navigate(){
        wx.navigateTo({
          url: '/pages/mobile/mobile',
          success(res){
            console.log(res)
          },fail(err){
            console.error(err)
          }
        })
      }
})