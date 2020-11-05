// pages/all/all.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    lists:[],
    eatList:[],
    title1:'',
    arrs: [],
  },
  onReachBottom(){
    console.log("向上滑动")
    //判断是否还有下一条数据
    if(this.QueryParmams.pagenum>=this.totalPages){
      //表示没有下一页数据
      //console.log("没有下一页数据")
      wx.showToast({title:'已经到底了'})
    }else{
      console.log("有下一页数据")
      this.QueryParmams.pagenum++;
      this.GetGoodsList();
    }
  },
  onClick(e){
    console.log(e.detail.title);
    var src=e.detail.title=='首页'?'../index/index':e.detail.title=='菜谱大全'?'../all/all':e.detail.title=='头条'?'../top/top':e.detail.title=='问答'?'../ask/ask':e.detail.title=='图片'?'../photo/photo':e.detail.title=='主题'?'../theme/theme':'../video/video'
    wx.navigateTo({
      url: src,
    })
   },
   getData() {
    var that=this
    db.collection('cook_top').skip(0).limit(5).get().then(res => {
      if(res.errMsg=='collection.get:ok') {
        wx.hideLoading()
      }
      that.setData({
        arrs: that.data.arrs.concat(res.data)
      })
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
  this.getData()
  this.setData({
    title1:options.title
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