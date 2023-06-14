// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    var busID = event.busID;

    try {
      const res = await db.collection('bus_info').where({
        busID: busID
      }).get()
      


      if (res.data.length > 0) {
        return {
          hasRecommendation: true,
          recommendation: res.data[0].recommendation
        }
      } else {
        return {
          hasRecommendation: false
        }
      }
    } catch (err) {
      console.error(err)
      return {
        hasRecommendation: false
      }
    }
  }