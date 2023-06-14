//调用获取默认环境的数据库的引用
const db = wx.cloud.database()

Page({
    data:{
        disabled:true,//丧失能力
        btnstate:"default",
        userName: "",
        userPwd: ""
    },
     
      // 控制按钮失效
      ControlButton: function(e) {
        var userName = this.data.userName;
        var userPwd = this.data.userPwd;
        if (userName !== "" && userPwd !== "") {
          this.setData({
            disabled: false,
            btnstate: "primary"
          });
        } else {
          this.setData({
            disabled: true,
            btnstate: "default"
          });
        }
      },
      
      // 监听用户名输入框
      userName: function(e) {
        var content = e.detail.value;
        this.setData({
          userName: content
        });
        this.ControlButton();
      },
      
      // 监听密码输入框
      userPwd: function(e) {
        var content = e.detail.value;
        this.setData({
          userPwd: content
        });
        this.ControlButton();
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
      btnSubmit(res){
        console.log(res)
        wx.showLoading({
            title: '数据加载中……',
            mask:true
          })
        db.collection("user_info").where({
            userName: this.data.userName, 
            userPwd: this.data.userPwd
        }).get()
        .then(res=>{
            console.log(res)
            wx.hideLoading()
            if(res.data.length > 0){ 
                // 登录成功，保存登录状态到本地存储中

                wx.setStorageSync('user',res.data);           //11111111111

                wx.setStorageSync('isLogin', true);
                wx.showToast({ 
                title: '登录成功', 
                icon: 'success',
                duration: 500 
                }) 
                // 判断是否为管理员或司机
                if(res.data[0].isAdminOrDriver === 2){
                    wx.showModal({
                        title:'提示',
                        content:'是否查看推荐路线？',
                        success: function(res){
                            if(res.confirm){
                                wx.navigateTo({
                                  url: '/pages/recommendation/recommendation',
                                  success(res){
                                      console.log(res)
                                  },
                                  fail(err){
                                      console.err(err)
                                  }
                                })
                            }
                        }
                    })
                }else{
                     //setTimeout函数来延迟跳转到登录页面,延迟2秒
                    setTimeout(function(){
                        wx.switchTab({
                        url: '/pages/request/request' 
                    });
                    }, 2000);
                }
               
            }else{ 
                wx.showToast({ 
                    title: '用户名或密码错误',
                    icon: 'none',
                    //提示框显示2000ms
                    duration: 2000 
                }) 
                
            }



        })
      }

})