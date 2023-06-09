// pages/request/request.js
Page({

    
    //页面的初始数据
    
    data: {
      select: false,  //先进行初始化，判断下拉列表的显示隐藏
      tihuoWay: '请选择',  //先初始化一个值（内容），点击选择下拉列表后的值赋值到这个变量上显示到页面上
      SelectTwo: false,  
      tihuoWayTwo: '请选择' 
    },
   
    
    //  点击事件
    //  点击的时候控制下拉需要显示的列表是显示还是隐藏
     
    bindShowMsg() {
      this.setData({
          select:!this.data.select
      })
  },
    bindShowMsgTwo() {
      this.setData({
        SelectTwo:!this.data.SelectTwo
      })
  },
    
   
    //  点击的时候接收传过来的值
    //  赋值到这个变量上tihuoWay
    //  并且隐藏下拉列表 
     
  mySelect(e) {
     var name = e.currentTarget.dataset.name
     this.setData({
        tihuoWay: name,
         select: false
     })
     
  },
  mySelectTwo(e) {
     var name = e.currentTarget.dataset.name
     this.setData({
        tihuoWayTwo: name,
          SelectTwo: false
     })
  },
  request(){
    // 获取登录状态
    var isLogin = wx.getStorageSync('isLogin');
    if (isLogin) {
        wx.navigateTo({
            url: '../Viewing/Viewing',
            success(res){
              console.log(res)
            },fail(err){
              console.error(err)
            }
        })
    } else{
        // 未登录，弹出提示框并跳转到登录页面
        wx.showToast({ 
            title: '您还没有登录', 
            icon: 'error',
            duration: 2000 
            }) 
        setTimeout(function() {
            wx.switchTab({
                url: '../loginin/loginin'
            })
        }, 2000);
    }


   
  },


  })