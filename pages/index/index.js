//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  toPainting: function () {
    wx.navigateTo({
      url: '../painting/painting',
    })
  },

  toPainting2: function () {
    wx.navigateTo({
      url: '../painting2/painting2',
    })
  },

  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.navigateTo({
      url: '../painting2/painting2',
    })
  }
})
