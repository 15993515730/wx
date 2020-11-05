// pages/photo/photo.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  lists1:[],
  lists2:[],
  guanzhu:'+关注',
  blo:false ,
  option:'' ,
  loading: true,           
  },
  
  click(){
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        loading:false
      })
    },1000)
    var that=this
    db.collection('cook_img').where({
      type_id:options.type_id
    }).get({
      success:function(res){
      that.data.lists1=res.data
      that.setData({
        lists1:that.data.lists1,
        option:that.data.lists1[0]._id
      })
      
      
      }
    })
  db.collection('cook_step').where({
    type_id:options.type_id
  }).get({
    success:function(res){
      that.data.lists2=res.data
      that.setData({
        lists2:that.data.lists2
      })
    }
  })
  },
  attention(){ 
  this.data.blo=!this.data.blo
  if(this.data.blo==true){
    this.data.guanzhu='已关注'
    this.data.lists1[0].fans=Number(this.data.lists1[0].fans)+1
    this.setData({
      guanzhu:this.data.guanzhu,
      lists1:this.data.lists1
    })
    var that=this
    db.collection('cook_img').doc(that.data.option).update({
      data:{
      fans:that.data.lists1[0].fans
      },
      success:function(res){
        console.log(res);
      }
    })
  }else{
    this.data.guanzhu='+关注'
    this.data.lists1[0].fans=Number(this.data.lists1[0].fans)-1
    this.setData({
      guanzhu:this.data.guanzhu,
      lists1:this.data.lists1
    })
    var that=this
    db.collection('cook_img').doc(that.data.option).update({
      data:{
        fans:that.data.lists1[0].fans
      },
      success:function(res){
        console.log(res);
        
      }
    })
  }
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