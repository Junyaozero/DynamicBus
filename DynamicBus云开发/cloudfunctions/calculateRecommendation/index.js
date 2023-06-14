// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 计算两个经纬度之间的距离
function calculateDistance(lat1, lon1, lat2, lon2) {
    // 地球半径，单位为千米
    const R = 6371 
    // 差值
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    // 纬度差值的一半的正弦平方加上纬度的三角函数的乘积
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    // 两个经度差值的一半的正弦平方
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var distance = R * c
    return distance
}

// 将角度转换为弧度
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

// 云函数入口函数
exports.main = async (event, context) => {
    var busID = event.busID;
    try {
        // 获取司机当前位置经纬度
        var { latitude, longitude } = event.driverLocation

        // 查询所有站点信息，储存到对象中
        var { data: stations } = await db.collection('station_info').get()

        // map() 遍历数组 async 异步函数 并返回一个新的Promise数组promises
        // Promise对象代表了一个异步操作的最终完成或失败，避免回调地狱（多函数嵌套混乱）
        var promises = stations.map(async (station) => {
            // 解构赋值
            var { stationLatitude, stationLongitude, _id, stationName } = station

            // 计算司机到每个站点的距离
            var distance = calculateDistance(latitude, longitude, stationLatitude, stationLongitude)

            // 查询每个站点的上车人数
            var boardingInfo = await db.collection('request_info').where({
                boardingPoint: stationName
            }).count()

             // 查询每个站点的下车人数
            var dropoffInfo = await db.collection('request_info').where({
                dropoffPoint: stationName
            }).count()

            // 计算优先级
            var priority = 0.2 * boardingInfo + 0.1 * event.numOfPeople * dropoffInfo + 0.7 * distance

            return {
                stationName,
                priority
            }
        })

        // 根据优先级排序
        // Promise.all(promises) 将会等待所有的 Promise 都解决后才会继续执行
        // sort() 排序; (a, b) => b.priority - a.priority 比较a,b优先级进行降序排序
        var recommendationList = (await Promise.all(promises)).sort((a, b) => b.priority - a.priority)

        // 生成最优推荐路线的字符串
        var recommendation = recommendationList.map((item) => item.stationName).join('->')

        // 将最优推荐路线存储到数据表"bus_info"的"recommendation"字段中
        await db.collection('bus_info').where({
                busID: busID
            }).update({
            data: {
                // 转换为字符串格式; slice(1, -1)去掉前后双引号
                recommendation: JSON.stringify(recommendation).slice(1, -1)
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

