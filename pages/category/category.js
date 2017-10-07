// pages/category/category.js
Page({
  data: {
    inputTxt:'',
    goodslist:[],
    btnType:true,     //搜索分类切换
    listType: true,   //列表模式
    chouseOrder: 1,   //列表模式区分  1综合  2新品 3 价格
    priceOrderType:1, //价格排序 1 升序 2降序
    showModal:true    //模态框

  },
  onLoad: function(){
    
  },
  onShow: function() {
    var goodslist = [
      {
        id: "1",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB1izWodloHL1JjSZFwXXb6vpXa_!!0-item_pic.jpg",
        name: "女装T恤中长款大码摆裙放电饭锅电饭锅电饭锅电饭锅电饭春夏新款",
        price: "65.90",
        stock: 30
      },
      {
        id: "2",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2Hj3AdbFkpuFjy1XcXXclapXa_!!843317184.jpg",
        name: "火亮春秋季 男青年修身款圆领男士T恤",
        price: "68.30",
        stock: 7
      },
      {
        id: "3",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2GsOYr4dkpuFjy0FbXXaNnpXa_!!2656150065.jpg",
        name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00",
        stock: 10
      },
      {
        id: "4",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "119.00",
        stock: 5
      },
      {
        id: "5",
        count: "1",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "674.00",
        status: 1
      },
      {
        id: "6",
        count: "1",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "547.00",
        stock: 19
      },
      {
        id: "7",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "244.00",
        stock:10
      }
    ];
    wx.setStorageSync('goodslist', goodslist)
    this.setData({
      goodslist:goodslist
    });
  },

  // 搜索框事件
  searchClear: function() {
    this.setData({
      inputTxt:''
    });
  },
  btnChange: function() {

  },
  // 输入框聚焦时
  onFoucs: function() {
    this.setData({
      btnType:false
    });
  },
  onBlur: function() {
    this.setData({
      btnType: true
    });
  },

  // 列表模式控制
  changeList: function() {
    var listType = this.data.listType;
    this.setData({
      listType: !listType
    });
  },
  // 列表模式选择
  chouseList:function(e) {
    var chouseOrder = this.data.chouseOrder;
    var priceOrderType = this.data.priceOrderType;
    if (priceOrderType==1){
      priceOrderType=2;
    }else{
      priceOrderType=1;
    }
    if (chouseOrder==3){
      this.setData({
        priceOrderType:priceOrderType
      });
    }
    this.setData({
      chouseOrder: e.currentTarget.id,
    });
  },


  /**
   * 弹框事件
  */
  // 隐藏显示弹框
  hideModal: function () {
    this.setData({
      showModal: !this.data.showModal
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
  */
  preventTouchMove: function () {

  },

  chouseGoods: function(e) {
    this.hideModal();
  }
})
