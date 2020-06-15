// pages/test/test.js
//totalclass是所有调查问卷的类型，已在控制台打印，调用findClass()函数
//questionnaire_list是列出某种类型的调查问卷，调用findList（‘类型名称’）

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0, 
    list: [],
    load: true,
    totalclass:[],
    questionnaire_list: [],
    q_name:null,//点击之后将该值传上
  },
  /**
  * 跳转到评测子页面
  */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    //this.findClass();
   
   
    let list = [{}];
    var that = this;
    const db = wx.cloud.database();
    db.collection('questionnaire_list').where({flag:true}).get({
      success: function(res) {
        var resList = res.data;
        for (let i = 0; i < resList.length; i++) {
          that.data.list[i] = {};
          that.data.list[i].class = resList[i].class;
          that.data.list[i].id = resList[i].c_id;
          console.log("aaa",resList[i].class,resList[i].c_id);
        }
        that.setData({
          list: that.data.list,
          listCur: that.data.list[0]
        });
      }
    });
//findClass()将所有的问卷类别读出来
//findList()通过问卷类别参数将该种类所有的问卷名字都读出来，然后将改问卷名称作为参数传到test-try

db.collection('questionnaire_list').get({
  success: function(res) {
    var resList = res.data;
    for (let i = 0; i < resList.length; i++) {
       
        for(let j = 0; j < resList[i].questionnaire.length; j++){
          let k=i*2+j;
          that.data.questionnaire_list[k] = {};
         that.data.questionnaire_list[k].id = resList[i].questionnaire[j].q_id;
      that.data.questionnaire_list[k].description = resList[i].questionnaire[j].description;
      that.data.questionnaire_list[k].tag = resList[i].questionnaire[j].tag;
      that.data.questionnaire_list[k].title =resList[i].questionnaire[j].questionnaire_name;
     }
     console.log( that.data.questionnaire_list);
    }
    that.setData({
      questionnaire_list: that.data.questionnaire_list
    });
  }
});
    //var a="抑郁症";
    
    //this.findList(a);



  },
  


  findClass: function() {
    var that = this;
    const db = wx.cloud.database() 
    db.collection('questionnaire_list').where({flag:true}).get({//并将类型列表赋值给class数组
      success: res => { 
        that.setData({
         totalclass: res.data,
        })
        //this.data.totalclass = res.data[0].class
      for(var i=0;i<2;i++){
        that.data.totalclass[i]= res.data[i].class;
      }
        console.log('数据库[this.data.class]查询记录 成功: ', that.data.totalclass)
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('数据库[的class]查询记录 失败：', err)
        //console.log('数据库[的class]查询记录 成功: ', this.data.class)
      }
    })
  },

//根据class名称进行查询
  findList: function(a) {
    const db = wx.cloud.database()
    db.collection('questionnaire_list').where({class:a}).get({
      success: res => {
        this.setData({
          questionnaire_list: res.data[0].questionnaire,
        })
        this.data.questionnaire_list = res.data[0].questionnaire
     
        console.log('数据库[this.data.questionnaire_list]查询记录 成功: ', this.data.questionnaire_list )
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('数据库[questionnaire_list]查询记录 失败：', err)
       // console.log('数据库[questionnaire_list]查询记录 成功: ', this.data.questionnaire_list)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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
          tabHeight = tabHeight ;
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