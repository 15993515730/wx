// pages/ask/ask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  active:3
  },
  onClick(e){
    console.log(e.detail.title);
    var src=e.detail.title=='首页'?'../index/index':e.detail.title=='菜谱大全'?'../all/all':e.detail.title=='头条'?'../top/top':e.detail.title=='问答'?'../ask/ask':e.detail.title=='图片'?'../photo/photo':e.detail.title=='主题'?'../theme/theme':'../video/video'
    wx.navigateTo({
      url: src,
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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