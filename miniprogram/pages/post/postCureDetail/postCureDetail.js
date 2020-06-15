// pages/post/postCureDetail/postCureDetail.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cure: {
      title: '',
      tag: '',
      createTime: '',
    },
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    console.log(id);
    db.collection('post_cure').where({
      _id: id
    }).get({
      success: function(res) {
        var _cure = res.data[0];

        wx.request({
          url: _cure.content,
          success: function(res) {
            let result = app.towxml(res.data, 'markdown', {
              theme: 'light', // 主题，默认`light`
            });
            that.setData({
              content: result
            })
          }
        });

        that.setData({
          cure: {
            title: _cure.title,
            tag: _cure.tag,
            createTime: _cure.create_time
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  }
})