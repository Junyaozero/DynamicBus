// pages/news/news.js
Page({
    data: {
      dataList:[]
    },

    getData(num=6,page=0){
        wx.cloud.callFunction({
            name:"getRequestList",
            data:{
                num:num,
                page:page
            }
        }).then(res=>{
            var oldData=this.data.dataList
            // concat 连接拼接数组
            var newData=oldData.concat(res.result.data);
            console.log(res)
            this.setData({
                dataList:newData
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(6,0)
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
        console.log('触发了下拉刷新')
        wx.redirectTo({
            url: '/pages/news/news',
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() { // 触底更新
        var page=this.data.dataList.length
        this.getData(6,page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})