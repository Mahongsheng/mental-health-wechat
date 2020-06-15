var that
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    id: '',
    openid: '',
    isLike: false,
    content: '',
    user: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    that = this;
    if(that.data.id == ''){
      that.data.id = options.id;
      that.data.openid = options.openid;
    }

    // 获取话题信息
    db.collection('topic').doc(that.data.id).get({
      success: function(res) {
        var tem = res.data;
        var minute = 1 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year = month * 12;


          var date = tem.date / 1000;

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
            tem.date = "" + parseInt(yearC) + "年前";
          }
          else if (monthC >= 1) {
            console.log(monthC)
            tem.date = "" + parseInt(monthC) + "月前";
          }
          else if (weekC >= 1) {
            tem.date = "" + parseInt(weekC) + "周前";
          }
          else if (dayC >= 1) {
            tem.date = "" + parseInt(dayC) + "天前";
          }
          else if (hourC >= 1) {
            tem.date = "" + parseInt(hourC) + "小时前";
          }
          else if (minC >= 1) {
            tem.date = "" + parseInt(minC) + "分钟前";
          } else{
            tem.date = "刚刚";
          }
        
        that.data.topic = tem;
        console.log("************************"+tem)
        that.setData({
          topic: that.data.topic,
        })
      }

    })

    // 获取收藏情况
    db.collection('collect')
      .where({
        _openid: that.data.openid,
        _id: that.data.id

      })
      .get({
        success: function(res) {
          if (res.data.length > 0) {
            that.refreshLikeIcon(true)
          } else {
            that.refreshLikeIcon(false)
          }
        },
        fail: console.error
      })

                // 获取回复列表
    that.getReplay()
  },

  onShow: function() {
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          user : res.userInfo
        })
        
        console.log(that.data.user)
      }
    })
  },

  getReplay: function() {

    console.log("id:" + that.data.id)
    // 获取回复列表
    db.collection('replay')
      .where({
        r_id: that.data.id
      })
      .get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log(res)
          console.log(res)
          that.setData({
            replays: res.data
          })
        },
        fail: console.error
      })
  },
  /**
   * 刷新点赞icon
   */
  refreshLikeIcon(isLike) {
    that.data.isLike = isLike
    that.setData({
      isLike: isLike,
    })
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;

    wx.previewImage({
      //当前显示图片
      current: this.data.topic.images[index],
      //所有图片
      urls: this.data.topic.images
    })
  },
  /**
   * 喜欢点击
   */
  onLikeClick: function(event) {
    console.log(that.data.isLike);
    if (that.data.isLike) {
      // 需要判断是否存在
      that.removeFromCollectServer();
    } else {
      that.saveToCollectServer();
    }
  },
  /**
   * 添加到收藏集合中
   */
  saveToCollectServer: function(event) {
    db.collection('collect').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.id,
        date: new Date(),
      },
      success: function(res) {
        that.refreshLikeIcon(true)

      },
    })
  },
  /**
   * 从收藏集合中移除
   */
  removeFromCollectServer: function(event) {
    db.collection('collect').doc(that.data.id).remove({

      success: that.refreshLikeIcon(false),
    });
  },

  /**
   * 跳转回复页面
   */
  onReplayClick() {
    wx.navigateTo({
      url: "../reply/reply?id=" + that.data.id + "&openid=" + that.data.openid
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  
  bindKeyInput(e) {
    that.data.content = e.detail.value;

  },

  saveReplay: function() {

    db.collection('replay').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        date: new Date(),
        r_id: that.data.id,
        u_id: that.data.openid,
        user: that.data.user
      },
      success: function(res) {
        wx.showToast({
          title: '回复成功！',
        })
        // i；
        // wx.navigateBack({
        //   url: "holeDetail?id=" + that.data.id + "&openid=" + that.data.openid
        // })
        //   wx.navigateTo({
        //     url: "holeDetail?id=" + that.data.id + "&openid=" + that.data.openid
        //   })
        // var data = {"id": this.data.id, "openid": this.data.openid}
        // console.log(data)
        
        that.setData({
          content:""
        })
        that.onLoad()
        that.onShow()
      },
      fail: console.error
    })
  }
})