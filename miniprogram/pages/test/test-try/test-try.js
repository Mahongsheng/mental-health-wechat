// pages/test/test-try/test-try.js

const app = getApp()

//评测结论放在了this.data.conclusion，我没有想好在前端怎么展示该结论
var ans = new Array()
Page({
  data: {
    user: null,
    cu_id: null, 
    subminted: 0,
    results: ans,
    problem: [],
    id:0,
    num:null,
    score:0,
    q_id:null,
    conclusion_list:[],
    conclusion:null,
    userid:null,
    q_name:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  onLoad: function(options) {
    //q_name接受上个页面传来的调查问卷的名字
      this.data.q_name=options.q_name;

  var a="汉密尔顿专业版抑郁测试";
    this.findProblem(a);
  },
  
 

  
  findProblem: function (a) {
    var that = this;
    const db = wx.cloud.database()
    db.collection('questionnaire').where({ questionnaire_name: a }).get({//在problem数据库中查找题目，并将题目赋值给problem数组
      success: res => {
        that.setData({
          problem: res.data[0].qnaire,
         num:res.data[0].number,
         q_id:res.data[0].questionnaire_id,
         conclusion_list:res.data[0].conclution_list,
        })
        that.data.probelm = res.data[0].qnaire
        that.data.num=res.data[0].number
       that.data.q_id=res.data[0].questionnaire_id
       that.data.conclusion_list=res.data[0].conclution_list
        console.log('数据库[this.data.problem]查询记录 成功: ', that.data.probelm)
        console.log('数量',that.data.num)  
        console.log("q_id",that.data.q_id)    
        console.log("测试结果",that.data.conclusion_list)
      }, 
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('数据库[questionnaire]查询记录 失败：', err)
      //  console.log('数据库[questionnaire]查询记录 成功: ', this.data.problem)
      }
    })
  },


  radioChange: function(e) {
    var id = e.target.dataset.id;//获取index.wxml中的data-id数据
    //console.log("id",e.target.dataset.id);
    this.data.results[id] = e.detail.value//将前端的对应题目选项选择的答案放到指定数组位置

    console.log('radio发生change事件，携带value值为：', e.detail.value, " ", this.data.results)

  },
   
  
  nextq: function () {
    if (this.data.id < this.data.num) {
      this.setData({
        id: this.data.id + 1,
      })
    }
  },
  
   
  
  lastq: function (e) {
    if (this.data.id != 0) {
      this.setData({
        id: this.data.id - 1,
      })
    } 
  },
  
   
  
  submit: function (e) {
   // console.log(e.detail.value);
    var a = e.detail.value.answer;
    console.log("aaaa",this.data.score);
    var id = this.data.id;
    ans[id] = a;
   if(a=="A"){
     this.data.score= this.data.score+1;
    
   }else if(a=="B"){
    this.data.score= this.data.score+2;
   }else if(a=="C"){
    this.data.score= this.data.score+3;
   }else if(a=="D"){
    this.data.score= this.data.score+4;
   }
   console.log("bbbbb",this.data.score);
    this.setData({
      results: ans,
    })

    console.log("答案数组",this.data.results);
  
   
  
  },
  
  
  
  //判断答题完成情况
  
  formSubmit: function() {
    var finish;
    var i = 0;
    var _this = this;
    while (i < _this.data.num) {
      if (ans[i] == "") {
        finish = 'false';
        break; 
      } else {
        finish = 'true'; 
      }
      i++;
    }
    if (finish == 'false') {
      wx.showModal({
        title: '无法提交',
        content: '您还有部分题目未完成，请检查后重新提交',
        showCancel: false,
        confirmColor: '#fcbe39',
        confirmText: "好的",
        success(res) {
          _this.setData({
            id: i,
          })
        }
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading({
          success(res) {
          
          if(_this.data.score<=_this.data.num){
            _this.data.conclusion=_this.data.conclusion_list[0].conclution;
         
          }else if(_this.data.score>_this.data.num && _this.data.score<=_this.data.num*2){
            _this.data.conclusion=_this.data.conclusion_list[1].conclution;
          }else if(_this.data.score>_this.data.num*2 && _this.data.score<=_this.data.num*3){
            _this.data.conclusion=_this.data.conclusion_list[2].conclution;
          }else if(_this.data.score>_this.data.num*3 && _this.data.score<=_this.data.num*4){
            _this.data.conclusion=_this.data.conclusion_list[3].conclution;
          }
          console.log("结论",_this.data.conclusion);
          //_this.getUserId();
            _this.answer2db();
            setTimeout(function() {
              wx.navigateTo({
                url: "/pages/test/conclusion/conclusion?conclusion="+_this.data.conclusion+"&q_name="+_this.data.q_name
              })
            }, 1500)
           
            
          }
        })
      }, 2000)
    }
  },
  
  getUserId: function(event) {
    var that=this;
   


      },

   










 
  //将用户完成的用户id、答案数组、分数和对应的测评结果上传至云数据库，
 
  answer2db: function() {
    var that=this;
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        
        that.data.userid= res.result.openId;
        console.log('openid: ', that.data.userid);
        db.collection('mytest').add({
          data: {
            userid:that.data.userid,
            results: that.data.results,
            conclusion:that.data.conclusion,
            score:that.data.score,
            questionnaire_id:that.data.q_id,
          },
          success: res =>  {
            wx.showToast({
              title: '新增记录成功',
            })
            console.log('[数据库] [新增记录] 成功')
          },
          fail:err =>  {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败' 
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
      
        })




          }
        
        });
       
        console.log('openid2: ', that.data.userid);
      

   
  
  },
 
















  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})