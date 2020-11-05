//index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp()
Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    loading: true,
    productList:[],
    active: 0,
    lists:[],
    newList:[],
    hotList:[],
    lists1:[],
    eatList:[],
    authors:[],
    typic:[],
    page:1,
    news:[],
    hot:[],
    select:[],
    cate:[],
    newcate:[],
    num:0,
    value:''
  },
  onReachBottom(){
    console.log("向上滑动")
    //判断是否还有下一条数据
      wx.showToast({title:'已经到底了'})
  },
  cli(){
    if(this.data.page==5){
      Toast('亲，这是最后一页了！');
      this.data.page=5
      this.setData({
        page:this.data.page
      })
    }else{
  this.setData({
    page:++this.data.page,
    authors:null
  })
}
  var count=(this.data.page-1)*5
  db.collection('cook_top').skip(count).limit(5).get().then(res=>{
    this.data.authors=res.data
    this.setData({
    authors:this.data.authors
    })
  })
  },
  getData(i){
    var that=this
    db.collection('cook_all').where({
      type_id:i
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
       that.data.lists1.push(res.data)
       that.setData({
        lists1: that.data.lists1
       })
      }
    })
  },
  onLoad: function() {
    let products=[1,2,3,4,5,6,7,8,9,10]
    setTimeout(()=>{
      this.setData({
        productList:products,
        loading:false
      })
    },60000000)
    db.collection('cook_list').get().then(res => {
    this.data.lists=res.data.splice(0,4)
    this.data.newList=res.data.splice(4,4)
    this.data.hotList=res.data.splice(8,4)
    this.setData({
      lists:this.data.lists,
      newList:this.data.newList,
      hotList:this.data.hotList
    })  
})
  db.collection('cook_typic').get().then(res=>{
  this.data.typic=res.data
  this.setData({
    typic:this.data.typic
  })
})
db.collection('cook_new').get().then(res=>{
  this.data.news=res.data
  this.setData({
    news:this.data.news
  })
})
db.collection('cook_hot').get().then(res=>{
  this.data.hot=res.data
  this.setData({
    hot:this.data.hot
  })
  console.log(this.data.hot);
  
})
db.collection('cook_top').skip(0).limit(5).get().then(res=>{
  this.data.authors=res.data
  this.setData({
  authors:this.data.authors
  })
})
var that=this
db.collection('cook_shipin').where({
  type_id:1
})
.get({
  success: function(res) {
    // res.data 是包含以上定义的两条记录的数组
   that.data.select=res.data
   that.setData({
   select: that.data.select
   })
  }
})
db.collection('cook_shipin').where({
  type_id:1
})
.get({
  success: function(res) {
    // res.data 是包含以上定义的两条记录的数组
   that.data.select=res.data
   that.setData({
   select: that.data.select
   })
  }
})
db.collection('cook_shipin').where({
  type_id:2
})
.get({
  success: function(res) {
    // res.data 是包含以上定义的两条记录的数组
   that.data.cate=res.data
   that.setData({
   cate: that.data.cate
   })
  }
})
db.collection('cook_shipin').where({
  type_id:3
})
.get({
  success: function(res) {
    // res.data 是包含以上定义的两条记录的数组
   that.data.newcate=res.data
   that.setData({
   newcate: that.data.newcate
   })
  }
})
this.getData(1)
this.getData(2)
this.getData(3)
this.getData(4)
this.getData(5)
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  onReady() {
    this.setData({
      loading:false,
    });
    console.log(this.data.loading);
  },
})
