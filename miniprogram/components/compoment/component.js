// components/comment.js
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  txt:{
    type:Array
  },
  txt1:{
    type:String
  },
  com:{
    type:String
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
  le:0,
  components:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  bt(e){
  this.data.txt[e.target.dataset.x].num++
  this.setData({
    txt:this.data.txt
  }) 
  var that=this
  db.collection('cook_component').doc(that.data.txt[e.target.dataset.x]._id
  ).update({
    data:{
      num:that.data.txt[e.target.dataset.x].num++
    }
  })
  },
  del(e){ 
  this.data.txt.splice(e.target.dataset.z,1)
  this.setData({
  txt:this.data.txt,
  })
  this.triggerEvent('sendData',this.data.txt)
  this.triggerEvent('sendData1',e.target.dataset.z)
  }
   
  }
})
