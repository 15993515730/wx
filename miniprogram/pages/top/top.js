// pages/top/top.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrs1:[],
    arrs:[],
    lists:[],
    lists1:[],
    loading: true,
    msg:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: '',
    openID:'',
    count:1
  },
  test(e){
    this.setData({
      msg:e.detail.value.replace(/^\s+|\s+$/g,'')
    })
    this.data.lists=e.detail.value
    this.setData({
    lists:this.data.lists
    })
  },
  send(){
    var that=this
    if(this.data.msg!==''){
    db.collection('cook_component').add({
      data:{
        component:that.data.lists,
        img:that.data.avatarUrl,
        num:0
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        that.data.openID=res._id
        that.setData({
          openID:that.data.openID
        })
        console.log(that.data.openID);
        
      },
    })
}
    if(this.data.lists.length==0&&this.data.msg==''){
    this.setData({
    arrs:this.data.arrs
    })
  }
   if(this.data.lists.length>0){
      this.data.arrs.push({
        img:this.data.avatarUrl,
        component:this.data.lists,
        num:0
      })
      this.setData({
        arrs:this.data.arrs,
        msg:null,
        lists:[]
      })
    }
  },
  getData(e){
  this.data.arrs=e.detail
  this.setData({
    arrs:this.data.arrs
  })
  },
  getData1(e){
   console.log(e.detail);  
   db.collection('cook_component').doc(this.data.lists1[e.detail]._id).remove({
     success:function(res){
       console.log(res);
       
     }
   })
  },
  // bindGetUserInfo: function(e) {
  //   console.log(e.detail.userInfo)
  //   this.setData({
  //     avatarUrl:e.detail.userInfo.avatarUrl
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        loading:false
      })
    },1000)
    db.collection('cook_component').get().then(res=>{
    this.data.arrs=res.data
     this.setData({
       arrs:this.data.arrs
     })
    })
    db.collection('cook_component').get().then(res=>{
      this.data.lists1=res.data
       this.setData({
         lists1:this.data.lists1
       })
      })
    db.collection('cook_top').where({
    _id:options.id
    }).get().then(res=>{
      this.data.arrs1=res.data
      this.setData({
      arrs1:this.data.arrs1
      })
      var browse=Number(this.data.arrs1[0].browse)+1
      db.collection('cook_top').doc(options.id).update({
        data:{
          browse:browse
        }
      })
      
    })
    var that=this
    // that.arrs1[0].browse=Number(that.arrs1[0].browse)+1
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              // console.log(res.userInfo.avatarUrl)
              that.data.avatarUrl=res.userInfo.avatarUrl
              that.setData({
              avatarUrl:that.data.avatarUrl
              })
              
            }
          })
        }
      }
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