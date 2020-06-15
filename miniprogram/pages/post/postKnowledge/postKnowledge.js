// miniprogram/pages/post/postKnowledge/postKnowledge.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knowledge: {
      id: '',
      title: '',
      img: '',
      description: '',
      tag: '',
      authorID: '',
      authorName: '',
      createTime: ''
    },
    knowledgeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    db.collection('post_knowledge').get({
      success: function(res) {
        var list = res.data;
        list.map(function(item, index) {     // 遍历bai数du组zhidao

          var knowledge = {
            id: item._id,
            title: item.title,
            img: item.img,
            description: item.description,
            tag: item.tag,
            authorID: item.author_id,
            authorName: item.author_name,
            createTime: item.create_time
          }
          that.data.knowledgeList.push(knowledge);
        });
        that.setData({
          knowledgeList: that.data.knowledgeList
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