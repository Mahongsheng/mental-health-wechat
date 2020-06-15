//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    defaultName: '对  影',
    buttonText: '开  启',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    //将用户的信息发送到数据库中
    this.saveUserDataToServer();

    // wx.switchTab({
    //   url: '/pages/treeHole/treeHole'
    // })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.saveUserDataToServer();

  },
  /**
   * 保存到发布集合中
   */
  saveUserDataToServer: function(event) {
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('openid: ', res.result.openId)
        var openid = res.result.openId;

        db.collection('user').where({
          _openid: openid
        }).get({
          success: function(res) {

            console.log(res);
            if (res.data.length == 0) {
              db.collection('user').where({
                _openid: openid
                // }).update({
              }).add({
                data: {
                  snid: "123"
                }
              });
            }
          }
        });
        wx.switchTab({
          url: '/pages/treeHole/home/home',
        })
      }

    })



  }



















})