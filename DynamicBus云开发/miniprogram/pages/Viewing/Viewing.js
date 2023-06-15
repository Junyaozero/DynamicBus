const db = wx.cloud.database()

Page({
    data:{
      userName : ""
    },
  async onLoad(option) {
    console.log("传递参数为", option)
    let { boardingPoint, dropoffPoint } = option
    this.setData({
      boardingPoint,
      dropoffPoint,
    })

    //获取本地缓存中‘user’存入userName
    var user=wx.getStorageSync('user')
    var user1 = user[0]
    this.setData({
        userName:user1.userName
    })     

    db.collection('request_info').where({
        userName: this.data.userName
    }).get().then(res =>{
        console.log(res)
        if (res.data.length > 0) {
            // 用户名存在，更新请求
            db.collection('request_info').where({
                userName: this.data.userName
            }).update({
                data: {
                  boardingPoint:boardingPoint,
                  dropoffPoint:dropoffPoint,
                  requestTime: new Date()
                }
            })
              } else {
                // 用户名不存在，新建请求
                db.collection("request_info").add({
                    data: {
                      userName: this.data.userName,
                      boardingPoint:boardingPoint,
                      dropoffPoint:dropoffPoint,
                      requestTime: new Date()
                    }
                  }).then(res => {
                    console.log(res)
                  }).catch(err => {
                    console.error(err)
                  })
              }
    })
    this.count()
   
  },

  async count(){
       // 查询各个上车地点的数量
    const countResult1 =  await db.collection('request_info').where({
        boardingPoint: '明德楼'
      }).count()
      this.setData({
        count1: countResult1.total
      })
  
      const countResult2 = await db.collection('request_info').where({
          boardingPoint: '弘毅楼'
        }).count()
        this.setData({
          count2: countResult2.total
        })
      
        const countResult3 = await db.collection('request_info').where({
          boardingPoint: '天佑楼'
        }).count()
        this.setData({
          count3: countResult3.total
        })
      
        const countResult4 = await db.collection('request_info').where({
          boardingPoint: '艺悦楼'
        }).count()
        this.setData({
          count4: countResult4.total
        })
      
        const countResult5 = await db.collection('request_info').where({
          boardingPoint: '知行楼'
        }).count()
        this.setData({
          count5: countResult5.total
        })
      
        const countResult6 = await db.collection('request_info').where({
          boardingPoint: '求是楼'
        }).count()
        this.setData({
          count6: countResult6.total
        })
      
        const countResult7 = await db.collection('request_info').where({
          boardingPoint: '南苑'
        }).count()
        this.setData({
          count7: countResult7.total
        })
      
        const countResult8 = await db.collection('request_info').where({
          boardingPoint: '校医务室'
        }).count()
        this.setData({
          count8: countResult8.total
        })
      
        const countResult9 = await db.collection('request_info').where({
          boardingPoint: '第二食堂'
        }).count()
        this.setData({
          count9: countResult9.total
        })
  }

})






















