// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    // event 接收前端所有数据
    var num=event.num;
    var page=event.page;
    // await 等待异步请求完成
    return await db.collection("request_info").skip(page).limit(num).get()
}