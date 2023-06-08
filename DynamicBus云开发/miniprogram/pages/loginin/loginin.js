Page({
    data:{
        disabled:true,//丧失能力
        btnstate:"default",
        account:"",
        userName:"",
        password:""
    },
    //获取文本问题
    accountInput:function(e){
        var content = e.detail.value;
        console.log(content);
        if(content!=""){
            this.setData({password:password});
            // this.setData({disabled:false,btnstate:"primary",account:content});
        }
            // this.setData({disabled:true,btnstate:"default"})
        
    },
    pwdBlur:function(e){
        var password = e.detail.value;
        if(password != ""){
            this.setData({password:password});
        }
    },
    //跳转注册页面
    toRegister(){
        wx.navigateTo({
          url: '/pages/mobile/mobile',
          success(res){
            console.log(res)
          },fail(err){
            console.error(err)
          }
        })
      },
    //跳转找回密码页面
    toFindPwd(){
        wx.navigateTo({
          url: '/pages/findPwd/findPwd',
          success(res){
            console.log(res)
          },fail(err){
            console.error(err)
          }
        })
      },
      //提交表单，判断是否登录
      btnSubmit(){

      }

})