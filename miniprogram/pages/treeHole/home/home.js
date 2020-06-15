// pages/treeHole/treeHole.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    topics: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.cloud.init({
      env: app.globalData.evn
    })
  },

  onShow: function() {
    that.getData();
  },
  /**
   * 获取列表数据
   * 
   */
  getData: function() {
    const db = wx.cloud.database();

    db.collection('topic')
      .orderBy('date', 'desc')
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log("数据：" + res.data)
          var tem = res.data;
          var minute = 1 * 60;
          var hour = minute * 60;
          var day = hour * 24;
          var halfamonth = day * 15;
          var month = day * 30;
          var year = month * 12;
          for (let i = 0; i < tem.length; i++){

            var date = new Date(tem[i].date).getTime() / 1000;

            // tem[i].date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            var now = new Date().getTime() / 1000;

            var diffValue = now - date;
            console.log(diffValue)
            console.log(month)
            var yearC = diffValue / year;
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            

            if (yearC >= 1) {
              console.log(yearC)
              tem[i].date = "" + parseInt(yearC) + "年前";
            }
            else if (monthC >= 1) {
              console.log(monthC)
              tem[i].date = "" + parseInt(monthC) + "月前";
            }
            else if (weekC >= 1) {
              tem[i].date = "" + parseInt(weekC) + "周前";
            }
            else if (dayC >= 1) {
              tem[i].date = "" + parseInt(dayC) + "天前";
            }
            else if (hourC >= 1) {
              tem[i].date = "" + parseInt(hourC) + "小时前";
            }
            else if (minC >= 1) {
              tem[i].date = "" + parseInt(minC) + "分钟前";
            } else{
              tem[i].date = "刚刚";
            }
          }
          that.data.topics = tem;
          
          that.setData({
            topics: that.data.topics,
          })
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();

        },
        fail: function(event) {
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();
        }
      })

  },
  /**
   * item 点击
   */
  onItemClick: function(event) {
    var id = event.currentTarget.dataset.topicid;
    var openid = event.currentTarget.dataset.openid;
    console.log(id);
    console.log(openid);
    wx.navigateTo({
      url: "../holeDetail/holeDetail?id=" + id + "&openid=" + openid
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var temp = [];
    // 获取后面十条
    if (this.data.topics.length < this.data.totalCount) {
      const db = wx.cloud.database();
      db.collection('topic').get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              var tempTopic = res.data[i];
              console.log(tempTopic);
              temp.push(tempTopic);
            }

            var totalTopic = {};
            totalTopic = that.data.topics.concat(temp);

            console.log(totalTopic);
            that.setData({
              topics: totalTopic,
            })
          } else {
            wx.showToast({
              title: '没有更多数据了',
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }

  },

  /**
   * 跳转发帖页面
   */
  onPublishClick() {
    wx.navigateTo({
      url: "../publish/publish?id=" + that.data.id + "&openid=" + that.data.openid
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})