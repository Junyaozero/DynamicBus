const db = wx.cloud.database();
const app = getApp() //获取到全局的应用实例

Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled:true,//丧失能力
        btnstate:"default",
        busID: "",
        userName:"",
        hasRecommendation: false, // 是否有推荐路线
        recommendation: "", // 推荐路线
        driverLocation: {
            latitude: 0,
            longitude: 0
        }
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
                var result = res.result
                if (result.hasRecommendation) {
                    // 拆分为站点数组
                    var recommendationArray = result.recommendation.split('->')
                    // 重组数组，三个一组用“→”连接，便于美观展示
                    var formattedRecommendationArray = [];
                    for (var i = 0; i < recommendationArray.length; i += 3) {
                        var formatted = recommendationArray.slice(i, i + 3).join(" → ");
                        formattedRecommendationArray.push(formatted);
                    }
                    this.setData({
                        hasRecommendation: true,
                        recommendation: formattedRecommendationArray
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
         // 开启位置更新服务
        wx.startLocationUpdate({
            success: (res) => {
                console.log('位置更新服务开启成功')
            },
            fail: (err) => {
                console.error('位置更新服务开启失败', err)
            }
        })

        // 监听位置变化事件
        wx.onLocationChange((res) => {
            console.log('位置变化', res)
            var latitude = res.latitude
            var longitude = res.longitude
            this.setData({
                driverLocation: {
                    latitude: latitude,
                    longitude: longitude
                }
            })

            // 调用云函数更新司机位置信息
            this.updateDriverLocation(latitude, longitude)

            // 调用云函数计算最优推荐路线
            this.calculateRecommendation(latitude, longitude)
        })

        // 每10秒更新一次位置信息和推荐路线
        setInterval(() => {
            wx.getLocation({
                type: 'gcj02',
                success: (res) => {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    this.updateDriverLocation(latitude, longitude);
                    this.calculateRecommendation(latitude, longitude);
                },
                fail: (err) => {
                    console.error('获取位置信息失败', err)
                }
            })
            }, 10000);

    },

    // 调用云函数更新司机位置信息
    updateDriverLocation(latitude, longitude) {
        var user=wx.getStorageSync('user')
        console.log(user[0].userName)
        this.setData({
            userName:user[0].userName
        })
        wx.cloud.callFunction({
            name: 'updateDriverLocation',
            data: {
                latitude: latitude,
                longitude: longitude,
                userName: this.data.userName
            },
            success: (res) => {
                console.log('司机位置更新成功', res)
            },
            fail: (err) => {
                console.error('司机位置更新失败', err)
            }
        })
    },
    // 调用云函数计算最优推荐路线
    calculateRecommendation(latitude, longitude) {
        wx.cloud.callFunction({
            name: 'calculateRecommendation',
            data: {
                busID: this.data.busID,
                driverLocation: {
                    latitude,
                    longitude
                },
                numOfPeople: 0 // 车上人数
            },
            success: (res) => {
                console.log('最优推荐路线计算成功', res)
            },
            fail: (err) => {
                console.error('最优推荐路线计算失败', err)
            }
        })
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

    },


})