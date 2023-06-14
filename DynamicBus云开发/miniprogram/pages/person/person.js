

Page({

    /**
     * 页面的初始数据
     */
    data: {
      login: {
        show: false,
        avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      }
    },
    // 登录监听
    chooseAvatar(e) {
      this.setData({
        login: {
          show: true,
          avatar: e.detail.avatarUrl,
        }
      })
    },
    // 基本信息
    basicClick() {
      wx.navigateTo({
      url: '/pages/xinxi/xinxi',           
  
        })
      console.log('基本信息监听');
      
    },
    // 匿名反馈
    feedbackClick() {
      wx.navigateTo({
        url: '../opinion/opinion',
        success(res){
          console.log(res)
        },fail(err){
          console.error(err)
        }
      })
      console.log('匿名反馈监听');
    },
    // 关于我们
    aboutClick() {
      wx.navigateTo({
        url: '../us/us',
        success(res){
          console.log(res)
        },fail(err){
          console.error(err)
        }
      })
      console.log('关于我们监听');
    },
    
    
         //退出登录
         cancledeng(){
          let that=this
        
          wx.showModal({   //提示框
            title:"退出登录",
            content:"下次再来哦！",
               
          success(res){
          if(res.confirm==true){
          
            wx.removeStorageSync('user')//删除用户缓存
            wx.removeStorageSync('isLogin')
            that.setData({
              login: {
                  show: false,
               
                }
              
          })
        
          wx.showToast({   //提示
          title:"已退出",
          icon:"none"
          })
        
          }
          }
        
          
        })
          
          },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
  
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
     let nick= wx.getStorageSync('user')
     console.log(nick,"1")
  
     if(nick){
     this.setData({
      login: {
        show: true,
        avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
     
      }
    })
  
     }
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    },
    //授权登录
    sign(){
      desc:'desc',
      success; (res) =>{
        console.log(reswx.UserInfo());
      }
    }
  })
  