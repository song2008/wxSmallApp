// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscart: false,
    cart: [],       //数据  
    count: 1,       //产品总数
    total: 0,       //总金额  
    goodsCount: 0,  //数量 
    edit:true,      //编辑按钮
    all:true,       //全选按钮控制
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = [
      {
        id: "1",
        count: "2",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB1izWodloHL1JjSZFwXXb6vpXa_!!0-item_pic.jpg",
        name: "女装T恤中长款大码摆裙放电饭锅电饭锅电饭锅电饭锅电饭春夏新款",
        price: "65.90",
        status: 1
      },
      {
        id: "2",
        count: "3",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2Hj3AdbFkpuFjy1XcXXclapXa_!!843317184.jpg",
        name: "火亮春秋季 男青年修身款圆领男士T恤",
        price: "68.30",
        status: 1
      },
      {
        id: "3",
        count: "2",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2GsOYr4dkpuFjy0FbXXaNnpXa_!!2656150065.jpg",
        name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00",
        status: 1
      },
      {
        id: "4",
        count: "1",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "119.00",
        status: 1
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
        status: 1
      },
      {
        id: "7",
        count: "1",
        imgUrl: "http://www.bhcztec.com/song/xdapp/public/images/goods/TB2ueyJhmvHfKJjSZFPXXbttpXa_!!1127634333.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "244.00",
        status: 1
      }
    ];
    wx.setStorageSync('cart', arr)
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    var total = this.data.total;
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      for (var i in arr) {
        total += ((arr[i].price * 100 * arr[i].count))/100;
        this.data.goodsCount += Number(arr[i].count);
      }
      total = parseFloat(total).toFixed(2);
      // 更新数据  
      this.setData({
        iscart: true,
        cart: arr,
        total:total,
        goodsCount: this.data.goodsCount
      });
    }
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
    wx.setStorageSync('cart', this.data.cart);
  },

  /**
   * 编辑购物车
  */
  editCars: function() {
    var arr = [];
    for (var i in this.data.cart){
      arr[i] = this.data.cart[i];
      arr[i].status=2;
    }
    this.setData({
      cart:arr,
      edit:false,
      all:false,
      total:0
    })
  },
  // 完成编辑
  editFinsh: function() {
    var arr = this.data.cart;
    var total = 0;
    if(arr.length>0){
      for (var i in this.data.cart) {
        arr[i] = this.data.cart[i];
        arr[i].status = 1;
        total += (arr[i].price * 100 * arr[i].count)/100;
      }
      total = parseFloat(total).toFixed(2);
    }
    
    this.setData({
      cart: arr,
      edit: true,
      all: true,
      total: total
    })
  },

  /*
    选择商品
  */
  selectGoods: function(e) {
    // console.log(e.currentTarget.id);
    var arr = this.data.cart;
    var all = this.data.all;
    var total = this.data.total;
    if (arr[e.currentTarget.id].status==1){
      arr[e.currentTarget.id].status = 2;
      all = false;
      total = total*1 - (arr[e.currentTarget.id].price * 100 * arr[e.currentTarget.id].count)/100;
    }else{
      arr[e.currentTarget.id].status = 1;
      total = total*1 + (arr[e.currentTarget.id].price * 100 * arr[e.currentTarget.id].count)/100;
    }
    // 全选按钮控制
    for(var i in arr){
      if(arr[i].status==2){
        all = false;
        break;
      }else{
        all = true;
      }
    }
    total = parseFloat(total).toFixed(2);
    this.setData({
      cart: arr,
      total:total,
      all:all
    });
  },

  // 全选按钮控制
  chouseAll: function() {
    var all = this.data.all;
    var arr = this.data.cart;
    var total = 0;
    if(all==true){
      for (var i in arr) {
        arr[i].status = 2;
        all = false;
      }
    }else{
      for (var i in arr) {
        total += ((arr[i].price * 100 * arr[i].count)) / 100;
        arr[i].status = 1;
        all = true;
      }
    }
    total = parseFloat(total).toFixed(2);
    this.setData({
      cart:arr,
      all:all,
      total:total
    });
  },

  /*
    商品加减操作
  */
  // 商品加操作
  addGoods: function(e) {
    var arr = this.data.cart;
    var total = this.data.total;
    arr[e.currentTarget.id].count = arr[e.currentTarget.id].count*1+1;
    total = (total*1 + arr[e.currentTarget.id].price*1).toFixed(2);
    this.setData({
      cart:arr,
      total:total
    });
  },
  // 商品减操作
  minGoods: function(e) {
    var arr = this.data.cart;
    var total = this.data.total;
    if (arr[e.currentTarget.id].count>1){
      arr[e.currentTarget.id].count = arr[e.currentTarget.id].count * 1 - 1;
      total = (total * 1 - arr[e.currentTarget.id].price * 1).toFixed(2);
      this.setData({
        cart: arr,
        total: total
      });
    }  
  },
  delGoods: function() {
    var arr = this.data.cart;
    var newarr = [];
    var num = 0;
    for (var i in arr){
      if(arr[i].status==2){
        newarr[num++]=arr[i];
      } 
    } 
    console.log(newarr);
    this.setData({
      cart: newarr,
    });
  }
})