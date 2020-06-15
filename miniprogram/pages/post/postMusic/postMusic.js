var app = getApp()
var util = require('../../../utils/util.js')
const db = wx.cloud.database();
//用于控制头像旋转 css 暂不可用
var intervalPic = null,
  loading = false,
  startTouchX = 0,
  endTouchX = 0,
  currentPosition = 0,
  currentDuration = 0;
Page({
  data: {
    hidden: true

      // 程序中使用到底属性初始化值\
      ,
    sliderVisibility: 'hidden',
    curPosition: '00:00',
    musicTypeTitle: '频道选择',
    singername: '未知',
    songname: '未知',
    singerpic: '../../../images/postMusicImg/logo_music.png',
    songHash: '',
    singerPicRotate: 0,
    selectIndex: -1,
    musicTypes: [{
      type: 'calm',
      src: "../../../images/postMusicImg/motionImg/calm",
      title: '平静'
    }, {
      type: 'happy',
      src: "../../../images/postMusicImg/motionImg/happy",
      title: '愉快'
    }, {
      type: 'puzzled',
      src: "../../../images/postMusicImg/motionImg/puzzled",
      title: '困惑'
    }, {
      type: 'surprised',
      src: "../../../images/postMusicImg/motionImg/surprised",
      title: '惊讶'
    }, {
      type: 'angry',
      src: "../../../images/postMusicImg/motionImg/angry",
      title: '愤怒'
    }, {
      type: 'scared',
      src: "../../../images/postMusicImg/motionImg/scared",
      title: '恐惧'
    }, {
      type: 'sad',
      src: "../../../images/postMusicImg/motionImg/sad",
      title: '悲伤'
    }, {
      type: 'smiling',
      src: "../../../images/postMusicImg/motionImg/smiling",
      title: '爱心'
    }],
    playList: [],
    curMusicInfo: {}
  }
  //用于节省内存
  // onHide : function(){ this.clearRotate(); }
  // ,onShow : function(){ this.bindRotate(); }
  ,
  onLoad: function() {
    var that = this,
      // autoplay = wx.getStorageSync(app.key.isAutoPlay);
      autoplay = wx.getStorageSync(true);
    // app.getLastPlayInfo(function(res) {
    //   if (res.url) {
    //     that.setData({
    //       songHash: res.songHash,
    //       singername: res.singername,
    //       songname: res.songname,
    //       singerpic: res.singerpic || '../../../images/postMusicImg/logo_music.png'
    //     });

    //     that.setData({
    //       curMusicInfo: {
    //         dataUrl: res.url,
    //         title: res.songname,
    //         singer: res.singername,
    //         coverImgUrl: res.singerpic || ''
    //       }
    //     });
    //     var _type = res.type,
    //       types = that.data.musicTypes;
    //     for (var i = 0, len = types.length; i < len; i++) {
    //       if (types[i]['type'] == _type) {
    //         that.setData({
    //           selectIndex: i
    //         });
    //         break;
    //       }
    //     }
    //     if (res.status == 'play' && autoplay) {
    //       that.play();
    //     }
    //   }
    // });

    //如果不自动播放 且重新进入时 先暂停其他背景音乐
    // if (!autoplay) {
    //   wx.pauseBackgroundAudio();
    // }

    wx.onBackgroundAudioStop(function(e) {
      that.playNext();
    });
    wx.onBackgroundAudioPause(function(e) {
      that.clearRotate();
      app.setLastPlayInfo({
        status: 'pause'
      });
    });
    wx.onBackgroundAudioPlay(function(e) {
      that.setData({
        sliderVisibility: 'hidden'
      });

      that.clearRotate();
      that.bindRotate();

      //设置最后一次播放信息
      // app.setLastPlayInfo({
      //   status: 'play',
      //   'type': that.data.musicTypes[that.data.selectIndex]['type'],
      //   songHash: that.data.songHash,
      //   singername: that.data.singername,
      //   songname: that.data.songname,
      //   url: e.dataUrl,
      //   singerpic: that.data.singerpic || ''
      // });

      //TODO 记录播放历史【可以与lastplayinfo合并 暂不处理】
      // app.recordPlayInfo({
      //   'type': that.data.musicTypes[that.data.selectIndex]['type'],
      //   hash: that.data.songHash,
      //   singername: that.data.singername,
      //   songname: that.data.songname,
      //   alum: that.data.singerpic || '',
      //   url: e.dataUrl,
      //   lasttime: (new Date()).getTime() //最后一次播放时间
      // });

    });
  },
  catchtouchstart: function(e) {
    startTouchX = e.touches[0].screenX;
    endTouchX = 0;
    currentPosition = 0;
  },
  catchtouchmove: function(e) {
    endTouchX = e.touches[0].screenX;
    //快进控制 
    var that = this;

    if (endTouchX > 0 && startTouchX < endTouchX) {
      wx.getBackgroundAudioPlayerState({
        success: function(res) {
          if (typeof res.duration == 'undefined') {
            return;
          }

          if (currentPosition == 0) {
            currentPosition = res.currentPosition;
            // wx.pauseBackgroundAudio();
          }
          currentPosition += 1;
          if (currentPosition > res.duration) {
            currentPosition = res.duration;
          }
          that.setData({
            curPosition: util.formatString('当前: {0}/总时长: {1}秒', parseInt(currentPosition), parseInt(res.duration)),
            sliderVisibility: 'visible'
          });
        }
      })
    }
  },
  catchtouchend: function(e) {
    //判定为向左滑
    if (endTouchX > 0 && endTouchX - startTouchX < 30) {
      this.playNext();
    }
    // right
    if (endTouchX > 0 && startTouchX < endTouchX) {
      this.play(currentPosition);
    }

  },
  loadErrorHandler: function(e) {
    this.setData({
      singerpic: '../../../images/postMusicImg/logo_music.png'
    });
  },
  settingHandler: function(e) {
    wx.navigateTo({
      url: '../setting/setting'
    });
  },
  musicTypeHandler: function(e) {
    if (loading) {
      return;
    } //加载中 暂不允许继续

    var index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      selectIndex: index
    });
    this.playNext();
  },
  playOrPauseHandler: function() {
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        if (res.status == 1) {
          wx.pauseBackgroundAudio();
        } else
        if (res.status == 0) {
          that.play(res.currentPosition);

        }
      }
    });
  },
  playNext: function() {
    var that = this,
      _type = that.data.musicTypes[that.data.selectIndex]['type'];
    if (loading) {
      return;
    }
    loading = true;
    that.setData({
      musicTypeTitle: '歌曲切换中...'
    });
    db.collection('post_music').where({
      type: _type
    }).get({
      success: function(res) {
        if (res.data.length != 0) {
          var music = res.data[0];

          that.setData({
            singername: music.singer_name,
            songname: music.song_name,
            singerpic: music.image || '../../../images/postMusic/logo_music.png'
          });
          that.setData({
            singerPicRotate: 0
          });
          that.setData({
            curMusicInfo: {
              dataUrl: music.url,
              title: music.song_name,
              singer: music.singer_name,
              coverImgUrl: music.image || '../../../images/postMusic/logo_music.png'
            }
          });

          that.play();
          loading = false;
          that.setData({
            musicTypeTitle: '频道选择'
          });
        } else {
          this.fail();
        }
      },
      fail: function() {
        loading = false;
        that.playNext();
      }
    })
    loading = false;
  },
  play: function(position) {
    var that = this;
    wx.playBackgroundAudio(that.data.curMusicInfo);
    //用于控制继续播放
    if (typeof position != 'undefined') {
      wx.seekBackgroundAudio({
        position: position
      })
    }
    that.bindRotate();
  },
  clearRotate: function() {
    if (intervalPic != null) {
      clearInterval(intervalPic);
      intervalPic = null;
    }
  },
  bindRotate: function() {
    var that = this;
    intervalPic = setInterval(function() {
      if (that.data.singerPicRotate == 360) {
        that.setData({
          singerPicRotate: 0
        });
      }
      that.setData({
        singerPicRotate: (that.data.singerPicRotate + 1)
      });
    }, 80);
  }
})