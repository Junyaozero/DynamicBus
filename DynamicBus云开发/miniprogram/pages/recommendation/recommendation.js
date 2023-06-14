const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled:true,//丧失能力
        btnstate:"default",
        busID: "",
        hasRecommendation: false, // 是否有推荐路线
        recommendation: "" // 推荐路线
    },

    // 控制按钮失效
    ControlButton: function(e) {
        var busID = this.data.busID;
        if (busID !== "") {
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
      
      // 监听巴士序号输入框
      busID: function(e) {
        var content = e.detail.value;
        this.setData({
          busID: content
        });
        this.ControlButton();
      },

      // 查看当前busID的推荐路线
      look(res){
        console.log(res)
        wx.showLoading({
          title: '数据加载中……',
          mask:true
        })
        wx.cloud.callFunction({
          name: 'getRecommendation',
          data: {
            busID: this.data.busID
          },
          success: (res) => {
            console.log(res)
            wx.hideLoading()
            const result = res.result
            if (result.hasRecommendation) {
              this.setData({
                hasRecommendation: true,
                recommendation: result.recommendation
              })
            } else {
              this.setData({
                hasRecommendation: false
              })
              wx.showToast({ 
                title: '巴士信息错误',
                icon: 'none',
                duration: 2000 
              }) 
            }
          },
          fail: (err) => {
            console.error(err)
            wx.hideLoading()
            wx.showToast({ 
              title: '数据加载失败',
              icon: 'none',
              duration: 2000 
            }) 
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

    }
})