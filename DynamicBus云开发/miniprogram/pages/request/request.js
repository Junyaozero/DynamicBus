// pages/request/request.js
Page({

    
    //页面的初始数据
    
    data: {
        select: false,  //先进行初始化，判断下拉列表是显示隐藏的
        boardingPoint: '请选择',  //先初始化一个值（内容）
        SelectTwo: false,  
        dropoffPoint: '请选择' 
    },
   
    
    //  点击事件
   //  点击的时候控制下拉列表是显示的
     //取反，类似开关操作
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
    
   
    //  点击的时候接收传过来的值,选中的上下车地点
    //  赋值到这个变量上boardingPoint
    //  并且隐藏下拉列表 
     
  mySelect(e) {
     var name = e.currentTarget.dataset.name
     this.setData({
        boardingPoint: name,
         select: false
     })
     
  },
  mySelectTwo(e) {
     var name = e.currentTarget.dataset.name
     this.setData({
        dropoffPoint: name,
          SelectTwo: false
     })
  },
  request(){
    // 获取登录状态
    var isLogin = wx.getStorageSync('isLogin');
    if (isLogin) {
        const that = this

        //判断上下车地点是否相同
        if(that.data.boardingPoint == that.data.dropoffPoint){
            wx.showToast({
              title: '请重新选择',
              icon: 'error',
              duration: 2000
            })
            return
        }
        
        //判断上下车地点有一个为空
        else if(that.data.boardingPoint!=='请选择' && that.data.dropoffPoint!=='请选择'){
        wx.navigateTo({
            url: '../Viewing/Viewing?boardingPoint='+that.data.boardingPoint+'&dropoffPoint='+that.data.dropoffPoint,
            success(res){
              console.log(res)
            },fail(err){
              console.error(err)
            }
        })
        }else{
            wx.showToast({
                title: '请重新选择',
                icon: 'error',
                duration: 2000
              })
              return
        }
       
        

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


   
  }


  })