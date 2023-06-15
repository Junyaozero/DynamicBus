let submitCount = 0;
let lastSubmitTime = {};

Page({
  // 页面的初始数据
  data: {
    select: false,            //下拉列表初始状态是隐藏
    boardingPoint: '请选择',
    SelectTwo: false,
    dropoffPoint: '请选择'
  },

  // 点击事件
  //取反，类似开关操作，点击显示下拉列表
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  bindShowMsgTwo() {
    this.setData({
      SelectTwo: !this.data.SelectTwo
    })
  },

  // 选择上车、下车地点并赋值到这个变量到boardingPoint、dropoffPoint，
  // 选择结束，隐藏下拉列表
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

  request() {
    // 获取登录状态
    var isLogin = wx.getStorageSync('isLogin');
    if (isLogin) {
      const that = this

      // 判断上下车地点是否相同
      if (that.data.boardingPoint == that.data.dropoffPoint) {
        wx.showToast({
          title: '请重新选择',
          icon: 'error',
          duration: 2000
        })
        return
      }

      // 判断上下车地点是否有存在空
      else if (that.data.boardingPoint !== '请选择' && that.data.dropoffPoint !== '请选择') {

        //5分钟内，点击次数不能超过3次
        if (submitCount < 3) {
            submitCount++;
            setTimeout(() => {
              submitCount = 0;
            }, 5 * 60 * 1000); // 5分钟，单位为毫秒

          // 本次提交的上车地点和下车地点与上一次提交的不能相同
          if (that.data.boardingPoint === lastSubmitTime.boardingPoint && that.data.dropoffPoint === lastSubmitTime.dropoffPoint) {
            wx.showToast({
              title: '重复提交，请稍后',
              icon: 'none'
            });
            return;
          }
    
          // 更新上一次提交的上车地点和下车地点
          lastSubmitTime = {
            boardingPoint: that.data.boardingPoint,
            dropoffPoint: that.data.dropoffPoint
          };


          
        // 跳转到非tabBar页面，并传参
        wx.navigateTo({
          url: '../Viewing/Viewing?boardingPoint=' + that.data.boardingPoint + '&dropoffPoint=' + that.data.dropoffPoint,
          success(res) {
            console.log(res)
          }, fail(err) {
            console.error(err)
          }
        });


      } else {
        wx.showToast({
          title: '提交频繁，请稍后',
          icon: 'none'
        });
      }

    } else {
        wx.showToast({
          title: '请重新选择',
          icon: 'error',
          duration: 2000
        })
        return
      }
    } else {
      // 未登录，弹出提示框并跳转到登录页面
      wx.showToast({
        title: '您还没有登录',
        icon: 'error',
        duration: 2000
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../loginin/loginin'
        })
      }, 2000);
    }
  }

})






