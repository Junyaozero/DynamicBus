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
  bindTwo() {
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
     console.log(name)
  },
  mySelectTwo(e) {
     var name = e.currentTarget.dataset.name
     this.setData({
        tihuoWayTwo: name,
          SelectTwo: false
     })
  },
  request(){
    wx.navigateTo({
        url: '../Viewing/Viewing',
        success(res){
          console.log(res)
        },fail(err){
          console.error(err)
        }
    })
  }
    
  })