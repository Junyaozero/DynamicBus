// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    const { latitude, longitude } = event
    try {
        await db.collection('driver_info').doc(OPENID).update({
            data: {
                driverLatitude: latitude,
                driverLongitude: longitude
            }
        })
        return {
          success: true
        }
        } catch (err) {
            console.error(err)
            return {
            success: false
            }
        }
    }