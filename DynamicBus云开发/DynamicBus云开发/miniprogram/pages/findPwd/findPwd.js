//调用获取默认环境的数据库的引用
const db = wx.cloud.database()

Page({
    data:{ 
        disabled:true,//丧失能力
        btnstate:"default",
        userName: "",
        userPwd: "",
        reUserPwd: ""
    },
     // 控制按钮失效
     ControlButton: function(e) {
        var userName = this.data.userName;
        var userPwd = this.data.userPwd;
        var reUserPwd = this.data.reUserPwd;
        if (userName !== "" && userPwd !== "" && reUserPwd !== "") {
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

       // 监听确认密码输入框
       reUserPwd: function(e) {
        var content = e.detail.value;
        this.setData({
            reUserPwd: content
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
        // 老方法处理数据 
    
        // var userName = res.detail.value.userName;
        var userPwd= res.detail.value.userPwd;
        var reUserPwd = res.detail.value.reUserPwd;
        // console.log(userName,userPwd)
    
        //解构方法处理数据
    
        var {userName,userPwd}=res.detail.value;
        //console.log(userName,userPwd)
        // 直接使用对象传递
        var resVlu = res.detail.value
        //判断密码与确认密码是否相等
        if(userPwd===reUserPwd){
            db.collection("user_info").where({
                userName: userName
            }).get().then(res => {
                console.log(res)
                if (res.data.length > 0) {
                    // 用户名存在，更新密码
                    db.collection("user_info").doc(res.data[0]._id).update({
                    data: {
                        userPwd: userPwd
                    }
                    }).then(res => {
                        console.log(res)
                        wx.hideLoading()
                        if (res.stats.updated > 0) {
                            // 更新成功，跳转到登录页面
                            wx.showToast({
                              title: '密码更新成功',
                              icon: 'success',
                              duration: 2000
                            })
                            setTimeout(function() {
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
                        } else {
                            // 更新失败，重置表单并提示错误信息
                            wx.showToast({
                              title: '密码更新失败，请重试',
                              icon: 'none',
                              duration: 2000
                            });

                             // 刷新当前页面并重置所有数据信息
                            setTimeout(function() {
                            wx.reLaunch({
                                url: '/pages/findPwd/findPwd',
                                success: function(res) {
                                    console.log("刷新成功");
                                },
                                fail: function(res) {
                                    console.log("刷新失败");
                                }
                            });
                            }, 2000);
                          }
                        })
                      } else {
                        // 用户名不存在，提示注册
                        wx.showToast({
                          title: '没有该用户，请注册',
                          icon: 'none',
                          duration: 2000
                        });
                        //延迟跳转注册页面
                        setTimeout(function() {
                        wx.navigateTo({
                            url: '/pages/mobile/mobile',
                            success(res){
                              console.log(res)
                            },fail(err){
                              console.error(err)
                            }
                          })
                        }, 2000);
                      }
            })        
        }else{
            // 输入与确认密码不一致
            wx.showToast({
                title: '输入与确认的密码不一致  请重新输入',
                icon: 'none',
                duration: 2000
            });
            this.setData({
                userName: "",
                userPwd: "",
                reUserPwd: "",
                disabled: true,
                btnstate: "default"
            });
            // 刷新当前页面并重置所有数据信息
            setTimeout(function() {
            wx.reLaunch({
                url: '/pages/findPwd/findPwd',
                success: function(res) {
                    console.log("刷新成功");
                },
                fail: function(res) {
                    console.log("刷新失败");
                }
            });
        }, 2000);
              
        }

    },


})