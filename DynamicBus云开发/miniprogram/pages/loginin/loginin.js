//调用获取默认环境的数据库的引用
const db = wx.cloud.database()
// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');

Component({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,//丧失能力
    btnstate:"default",
    account:"",
    password:"",
    showUploadTip: false,
    tipText: isMac ? 'sh ./uploadCloudFunction.sh' : './uploadCloudFunction.bat'
  },
  properties: {
    showUploadTipProps: Boolean
  },
  observers: {
    showUploadTipProps: function(showUploadTipProps) {
      this.setData({
        showUploadTip: showUploadTipProps
      });
    }
  },
  methods: {
    onChangeShowUploadTip() {
      this.setData({
        showUploadTip: !this.data.showUploadTip
      });
    },

    copyShell() {
      wx.setClipboardData({
        data: this.data.tipText,
      });
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
       
    //跳转
    navigate(){
        wx.navigateTo({
          url: '/pages/mobile/mobile',
          success(res){
            console.log(res)
          },fail(err){
            console.error(err)
          }
        })
      },

//       //提交表单添加进数据库
//   btnSub(res){
//     console.log(res)
//     // 老方法取数据

//     // var userName = res.detail.value.userName;
//     // var userPwd= res.detail.value.userPwd;
//     // console.log(userName,userPwd)

//     //解构方法取数据

//     var {userName,userPwd}=res.detail.value;
//     //console.log(userName,userPwd)
//     // 直接使用对象传递
//     var resVlu = res.detail.value
//     db.collection("user_info").add({
//         // data:{
//         //     userName:userName,
//         //     userPwd:userPwd
//         // }
//         data:resVlu

//     }).then(res=>{
//         console.log(res)
//     })

//   }      
      
  }

});
