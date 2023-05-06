// pages/news/news.js
Page({
    data: {
      array: []
    },
    onLoad: function (options) {
      var array = this.initData();
      this.setData({ array: array });
    },
    initData: function () {
      var array = [];
      var object1 = new Object();
      object1.img = '../images/list1.jpg';
      object1.title = '警惕电信诈骗！';
      object1.type = '2023/4/1';
      object1.liulan = '1234浏览';
      array[0] = object1;
  
      var object2 = new Object();
      object2.img = '../images/list2.jpg';
      object2.title = '注意！足球场施工，禁止打篮球！';
      object2.type = '2023/4/1';
      object2.liulan = '298浏览';
      array[1] = object2;
  
      var object3 = new Object();
      object3.img = '../images/list3.jpg';
      object3.title = '同学在宿舍养鳄鱼遭违纪通报！';
      object3.type = '2023/4/1';
      object3.liulan = '185浏览';
      array[2] = object3;
      return array;
    }
  })