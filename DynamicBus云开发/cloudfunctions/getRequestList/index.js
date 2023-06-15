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
    return await db.collection("request_info").orderBy('requestTime', 'desc').skip(page).limit(num).get()
    .then(res => {
        // 对查询结果进行排序
        const sortedData = res.data.sort((a, b) => {
        const dateA = new Date(a.requestTime);
        const dateB = new Date(b.requestTime);
        return dateB - dateA; // 从新到旧排序
    });
        return {
            data: sortedData
        };
    });
}