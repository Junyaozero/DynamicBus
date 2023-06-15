//创建了一个指向云数据库的实例 
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    message: "",
    contact: ""
  },

    // 监听反馈信息输入框
    message: function(e) {
        var content = e.detail.value;
        this.setData({
            message: content
        });
      },

     // 监听联系方式输入框
     contact: function(e) {
        var content = e.detail.value;
        this.setData({
            contact: content
        });
      },


   formSubmit(res) {
    var message = res.detail.value.message;
    var contact= res.detail.value.contact;
    let regPhone = /^1[3578]\d{9}$/;//手机号格式校验
    let regEmail = /^[a-z\d_\-\.]+@[a-z\d_\-]+\.[a-z\d_\-]+$/i;//邮箱格式校验
    if (message == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不能为空!',
      })
      return false
    }
    if (contact == "") {
      wx.showModal({
        title: '提示',
        content: '手机号或者邮箱不能为空!',
      })
      return false
    }
    if(contact == "" && message == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容,手机号或者邮箱不能为空!',
      })
      return false
    }
    if ((!regPhone.test(contact) && !regEmail.test(contact)) || (regPhone.test(contact) && regEmail.test(contact))) { //验证手机号或者邮箱的其中一个对
      wx.showModal({
        title: '提示',
        content: '您输入的手机号或者邮箱有误!',
      })
      return false
    } else {

        db.collection("feedback_info").add({
             data:{
                message:message,
                contact:contact
                }
        }).then(res=>{
            console.log(res)
            if (res._id) {
                // 反馈成功
                wx.showToast({ 
                title: '反馈成功', 
                icon: 'success',
                duration: 2000 
            }) 
            this.setData({
                loading: true
              })
        }  else {
            // 反馈失败
            wx.showToast({
                title: '反馈失败，请稍后再试',
                icon: 'error',
                duration: 2000 
            });
        }
    
        })
    }
}
})
