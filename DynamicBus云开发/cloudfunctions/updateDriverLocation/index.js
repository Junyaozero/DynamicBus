// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    var userName = event.userName;
    var longitude = event.longitude;
    var latitude = event.latitude;
    
        return await db.collection('driver_info').where({
            driverName: userName
        }).update({
            data: {
                driverLatitude: latitude,
                driverLongitude: longitude
            }
        })
    }