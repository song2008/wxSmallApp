//app.js
App({
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null,
    ShopId: 7071211
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              // console.log({encryptedData: res.encryptedData, iv: res.iv, code: code})
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              // https://www.bhcztec.com/song/xdapp/public/api/login/DecodeUserInfo
              // https://www.bhcztec.com/wxapp/index.php?r=songtest/decodeUserInfo
              wx.request({
                url: 'https://www.bhcztec.com/song/xdapp/public/api/login/DecodeUserInfo',//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: function (res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  console.log(res);
                  that.globalData.openid = res.data.openId
                  that.globalData.userInfo = res.data
                },
                fail: function () {
                  console.log('系统错误')
                }
              });
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  }
})