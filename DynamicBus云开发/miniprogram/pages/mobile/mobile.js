//调用获取默认环境的数据库的引用
const db = wx.cloud.database()

Page({
    data: {
        disabled: true,
        btnstate: "default",
        buttonState: 0,
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

    //提交表单添加进数据库
    btnSubmit(res){
        console.log(res)
        wx.showLoading({
            title: '数据加载中……',
            mask:true
         })
        // 老方法取数据 

        // var userName = res.detail.value.userName;
        // var userPwd= res.detail.value.userPwd;
        // console.log(userName,userPwd)

        //解构方法取数据

        var {userName,userPwd}=res.detail.value;
        //console.log(userName,userPwd)
        // 直接使用对象传递
        var resVlu = res.detail.value

        db.collection("user_info").where({
            userName: userName
        }).get().then(res=>{
            console.log(res)
            if(res.data.length > 0){
                // 用户名已存在，提示用户并等待2秒跳转并刷新登录页面
                wx.showToast({
                    title: '该用户已存在',
                    icon: 'none',
                    duration: 2000
                });
                setTimeout(function(){
                    wx.switchTab({
                        url: '/pages/loginin/loginin',
                        success: function(res) {
                        console.log("跳转成功");
                        },
                        fail: function(res) {
                            console.log("跳转失败");
                        }
                    });
                }, 2000);
            }else{
                // 用户名不存在，可以添加到数据库中
                db.collection("user_info").add({
                // data:{
                //      userName:userName,
                //     userPwd:userPwd
                // }
                data:resVlu
               
                }).then(res=>{
                    console.log(res)
                    wx.hideLoading()
                    if (res._id) {
                        // 注册成功，跳转到登录页面
                        wx.showToast({ 
                        title: '注册成功', 
                        icon: 'success',
                        duration: 2000 
                        }) 
                        //setTimeout函数来延迟跳转到登录页面,延迟2秒
                        setTimeout(function(){
                            wx.switchTab({
                                url: '/pages/loginin/loginin' ,
                                success: function(res) {
                                    console.log("跳转成功");
                                },
                                fail: function(res) {
                                    console.log("跳转失败");
                                }
                            });
                        }, 2000);
                
                    } else {
                        // 注册失败，重置表单并提示错误信息
                        wx.showToast({
                            title: '注册失败，请重试',
                            icon: 'none',
                            duration: 2000 
                        });
                        this.setData({
                            userName: "",
                            userPwd: "",
                            disabled: true,
                            btnstate: "default"
                        });
                    }
                })
            }
        })
    }
})
