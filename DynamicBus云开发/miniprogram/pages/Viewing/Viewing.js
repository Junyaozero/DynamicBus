// pages/Viewing/Viewing.js
//调用获取默认环境的数据库的引用
const db = wx.cloud.database()

Page({
    async onLoad(option) {
        console.log("传递参数为", option)
        let {boardingPoint,dropoffPoint} = option
        this.setData({
            boardingPoint,
            dropoffPoint
        })
        // 获取requestID
        const countResult = await db.collection('request_info').count()
        // 时间
        let date = new Date(new Date().getTime());
        let Time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        db.collection("request_info").add({
            data:{
                boardingPoint,
                dropoffPoint,
                requestID:countResult.total,
                requsetTime: Time
            }
           
        }).then(res=>{
            console.log(res)

        })
    }
})