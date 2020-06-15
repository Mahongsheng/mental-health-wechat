// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postElements: [{
        title: '文章',
        name: 'Article',
        discription: '心理相关的文章',
        img: 'https://6d65-mentalhealthwechat-1s5bo-1302210938.tcb.qcloud.la/post_home_image/%E6%96%87%E7%AB%A0%E5%8A%9F%E8%83%BD%E5%9B%BE%E7%89%87.jpg?sign=196ba6f8b82a109746720c497d683476&t=1591843751',
        icon: 'vipcard',
        url: '/pages/post/postArticle/postArticle'
      },
      {
        title: '音乐',
        name: 'Music',
        discription: '心理相关的音乐',
        img: 'https://6d65-mentalhealthwechat-1s5bo-1302210938.tcb.qcloud.la/post_home_image/%E9%9F%B3%E4%B9%90%E5%8A%9F%E8%83%BD%E5%9B%BE%E7%89%87.JPG?sign=95348f7ab77a1362999f9b3ec87b907d&t=1591843853',
        icon: 'newsfill',
        url: '/pages/post/postMusic/postMusic'
      },
      {
        title: '知识',
        name: 'Knowledge',
        discription: '',
        img: 'https://6d65-mentalhealthwechat-1s5bo-1302210938.tcb.qcloud.la/post_home_image/%E7%9F%A5%E8%AF%86%E5%8A%9F%E8%83%BD%E5%9B%BE%E7%89%87.jpg?sign=c4ee6ff3201e29f816d4f4057e7591a9&t=1591843878',
        icon: 'list',
        url: '/pages/post/postKnowledge/postKnowledge'
      },
      {
        title: '疗法',
        name: 'Video',
        discription: '',
        img: 'https://6d65-mentalhealthwechat-1s5bo-1302210938.tcb.qcloud.la/post_home_image/%E7%96%97%E6%B3%95%E5%8A%9F%E8%83%BD%E5%9B%BE%E7%89%87.jpg?sign=d4b7f20b9b97b8a9484660407991d2c7&t=1591843907',
        icon: 'search',
        url: '/pages/post/postCure/postCure'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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