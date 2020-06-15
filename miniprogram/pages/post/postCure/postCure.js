// pages/post/postCure/postCure.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    list: [],
    cureList: [],
    listCur: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    var that = this;
    db.collection("post_cure_catalog").get({
      success: function(res) {
        var resList = res.data;
        for (let i = 0; i < resList.length; i++) {
          that.data.list[i] = {};
          that.data.list[i].type = resList[i].type;
          that.data.list[i].id = resList[i]._id;
        }
        that.setData({
          list: that.data.list,
          listCur: that.data.list[0]
        });
      }
    });

    db.collection("post_cure").get({
      success: function(res) {
        var resList = res.data;
        for (let i = 0; i < resList.length; i++) {
          that.data.cureList[i] = {};
          that.data.cureList[i].id = resList[i]._id;
          that.data.cureList[i].title = resList[i].title;
          that.data.cureList[i].img = resList[i].img;
          that.data.cureList[i].description = resList[i].description;
          that.data.cureList[i].tag = resList[i].tag;
          that.data.cureList[i].typeID = resList[i].type_id;
        }
        that.setData({
          cureList: that.data.cureList
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})