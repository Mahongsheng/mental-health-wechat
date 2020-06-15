// miniprogram/pages/post/postArticleDetail/postArticleDetail.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      title: '',
      createTime: '',
      authorName: ''
    },
    markdown_content: 'aaa',
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;

    db.collection('post_article').where({
      _id: id
    }).get({
      success: function(res) {
        var _article = res.data[0];
        wx.request({
          url: _article.content,
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
          article: {
            title: _article.title,
            createTime: _article.create_time,
            authorName: _article.author_name,
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