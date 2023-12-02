// painting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prevPosition: [0, 0],
    btnInfo: [
      {
        type: 'width',
        background: 'url("https://s1.ax1x.com/2022/05/25/XkS46f.png") white no-repeat; background-size: 30px 30px;'
      },
      {
        type: 'color',
        background: 'url("https://s1.ax1x.com/2022/05/25/XkSqts.png") white no-repeat; background-size: 24px 24px;background-position: 3px 3px;'
      },
      {
        type: 'clear',
        background: 'url("https://s1.ax1x.com/2022/05/25/XkppBF.png") white no-repeat; background-size: 20px 20px;background-position: 5px 5px;'
      },
      {
        type: 'save',
        background: 'url("https://s1.ax1x.com/2022/05/25/Xkpj5d.png") white no-repeat; background-size: 20px 20px;background-position: 5px 5px;'
      }
    ],
    width: false,
    color: false,
    clear: false,
    r: 33,
    g: 33,
    b: 33,
    w: 2,
    eraser: false,
    canvasHeight: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ctx = wx.createCanvasContext('myCanvas');
    ctx.rect(0, 0, 500, 800);
    ctx.setFillStyle('white');
    ctx.fill();
    ctx.draw();
  },

  touchStart: function (e) {
    this.setData({
      prevPosition: [e.touches[0].x, e.touches[0].y]
    })
  },

  touchMove: function (e) {
    let ctx = wx.createCanvasContext('myCanvas');

    if (!this.data.eraser) {
      ctx.setStrokeStyle("rgb(" + this.data.r + ', ' + this.data.g + ', ' + this.data.b + ')');
      ctx.setLineWidth(this.data.w);
    } else {
      ctx.setStrokeStyle('white');
      ctx.setLineWidth(10);
    }
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
    ctx.moveTo(this.data.prevPosition[0], this.data.prevPosition[1]);
    ctx.lineTo(e.touches[0].x, e.touches[0].y);
    ctx.stroke();
    ctx.draw(true);

    this.setData({
      prevPosition: [e.touches[0].x, e.touches[0].y]
    })
  },

  touchEnd: function (e) {
    
  },

  //点击事件
  tapBtn: function (e) {
    let btnType = e.target.dataset.type;

    if (btnType == 'width') {
      this.setData({
        width: !this.data.width,
        color: false,
        clear: false,
        eraser:false,
        canvasHeight: (!this.data.width) ? 130 : 50
      })
    } else if (btnType == 'color') {
      this.setData({
        width: false,
        color: !this.data.color,
        clear: false,
        canvasHeight: (!this.data.color) ? 205 + this.data.w : 50
      })
    } else if (btnType == 'clear') {
      this.setData({
        width: false,
        color: false,
        clear: !this.data.clear,
        canvasHeight: (!this.data.clear) ? 120 + this.data.w : 50
      })
    } else if (btnType == 'save') {
      this.setData({
        width: false,
        color: false,
        clear: false,
        canvasHeight: 50
      })

      //canvas保存图片到本地
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',

        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (r) {
              console.log(r)
            },
            fail(error){
              console.log("图片保存失败!");
              wx.showToast({
                title: '保存失败',
                icon: 'error'
              })
              //没开启保存权限
              if(error.errMsg === "saveImageToPhotosAlbum:fail auth deny")
              {
                  // 获取保存权限
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      }else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
              }
            }
          })
        }
      })
    }
  },

  //选择颜色
  changeColor: function (e) {
    if (e.target.dataset.color == 'r') {
      this.setData({
        r: e.detail.value
      })
    } else if (e.target.dataset.color == 'g') {
      this.setData({
        g: e.detail.value
      })
    } else if (e.target.dataset.color == 'b') {
      this.setData({
        b: e.detail.value
      })
    }
  },

  changeWidth: function (e) {
    this.setData({
      w: e.detail.value
    })
  },

  //页面清空
  clearCanvas: function () {
    let ctx = wx.createCanvasContext('myCanvas');
    ctx.rect(0, 0, 500, 800);
    ctx.setFillStyle('white');
    ctx.fill();
    ctx.draw();
    this.setData({
      clear: false,
      canvasHeight: 50
    })
  },

  //选择橡皮擦
  chooseEraser: function () {
    this.setData({
      eraser: !this.data.eraser,
      clear: false,
      canvasHeight: 50
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})