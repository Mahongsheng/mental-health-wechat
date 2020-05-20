// pages/treeHole/treeHole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImage: [
      { url: '../../images/pictures/lunbo1.jpg' },
      { url: '../../images/pictures/lunbo2.jpg' },
      { url: '../../images/pictures/lunbo3.jpg' }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    doctors: [{
      name: "扁鹊",
      title: "神经内科主任：扁鹊",
      level: "专家号",
      description: "扁鹊在诊视疾病中，已经应用了中医全面的诊断技术，即后来中医总结的四诊法：望诊、闻诊、问诊和切诊，当时扁鹊称它们为望色、听声、写影和切脉。他精于望色，通过望色判断病证及其病程演变和预后。扁鹊精于内、外、妇、儿、五官等科，应用砭刺、针灸、按摩、汤液、热熨等法治疗疾病，被尊为医祖。",
      image: "../../images/pictures/bianque.jpg",
      others: "十年经验"
    },
    {
      name: "华佗",
      title: "神经内科副主任：华佗",
      level: "专家号",
      description: "华佗是中国医学史上为数不多的杰出外科医生之一，他善用麻醉、针、灸等方法，并擅长开胸破腹的外科手术。外科手术的方法并非建立在“尊儒”的文化基础上的中医学的主流治法，在儒家的“身体发肤，受之父母”的主张之下，外科手术在中医学当中并没有大规模的发展起来。",
      image: "../../images/pictures/huatuo.jpg",
      others: "五年经验"
    },
    {
      name: "张仲景",
      title: "神经内科副主任：张仲景",
      level: "普通号",
      description: "建安年间，他行医游历各地，亲眼目睹了各种疫病流行对百姓造成的严重后果，也借此将自己多年对伤寒症的研究付诸实践，进一步丰富了自己的经验，充实和提高了理性认识。经过数十年含辛茹苦的努力，终于写成了一部名为《伤寒杂病论》的不朽之作。这是继《黄帝内经》之后，又一部最有影响的光辉医学典籍。",
      image: "../../images/pictures/zhangzhongjing.jpg",
      others: "五年经验"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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