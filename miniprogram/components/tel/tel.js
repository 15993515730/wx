// components/tel/tel.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value:null,
    loading: true,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    inputTyping(e){
      this.setData({
        value:e.detail.value.replace(/^\s+|\s+$/g,'')
      })
      if(this.data.value.length>0||this.data.value.split(" ").join("").length> 0){
        if(!e.detail.value.match(/^\s+|\s+$/g)||e.detail.value!==''){
          this.setData({
            value:e.detail.value
          })
          wx.navigateTo({
            url: '../lists/lists?value='+e.detail.value,
          })
        }
      }
      this.setData({
        value:null
      })
    },
   send(e){
   this.setData({
     value:e.detail.value.replace(/^\s+|\s+$/g,'')
   })
   },
   ipt(){
    if(this.data.value.length>0||this.data.value.split(" ").join("").length> 0){
      var that=this
        wx.navigateTo({
          url: '../lists/lists?value='+that.data.value,
        })
  }
  this.setData({
    value:null
  })
}
}
})
