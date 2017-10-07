//waterfall.js
"use strict";
//获取应用实例
var app = getApp();
Page({
	data: {
		keywords:"请在此输入搜索内容",
		search:'',
		//下拉
		page: 1,
		size: 20,
		list1:[],
		list2:[],
		hasMore: false
	},
	handleLoadMore: function() {
		var self = this;
		if(self.data.hasMore){
			app.api.selectList("test/getList", self.data.page++, self.data.size, self.data.search).then(function(res) {
				if(res.isSuccess){
					var arr1 =[],arr2 =[];
					for(var i=0,len=res.list.length;i<len;i++){
						if(i%2!=0){
							arr1.push(res.list[i])
						}else{
							arr2.push(res.list[i])
						}
					}
					self.setData({
						list1: self.data.list1.concat(arr1),
						list2: self.data.list1.concat(arr2)
					}) 
				}else{
					self.setData({
						hasMore: false
					}) 
				}
			}).catch(function(err) {
				self.setData({
					keywords: "获取数据异常"
				}), console.error(err)
			})
		}
		
	},
	handleSearch: function(a) {
		console.log(a)
		a.detail.value && (this.setData({
			list1:[],
			list2:[],
			page: 1
		}), this.setData({
			keywords: "加载中...",
			hasMore: true,
			search: a.detail.value
		}), this.handleLoadMore())
	},
	onLoad:function(options){
		// 页面初始化 options为页面跳转所带来的参数
		var self = this;
		app.api.selectList("test/getList",1,10,self.data.search).then(function(res){
			var arr1 =[],arr2 =[];
			for(var i=0,len=res.list.length;i<len;i++){
				if(i%2!=0){
					arr1.push(res.list[i])
				}else{
					arr2.push(res.list[i])
				}
			}
			self.setData({
				list1: self.data.list1.concat(arr1),
				list2: self.data.list1.concat(arr2),
				hasMore:true
			})
		})
	},
	onReady:function(){
		// 页面渲染完成
	},
	onShow:function(){
		// 页面显示
	},
	onHide:function(){
		// 页面隐藏
	},
	onUnload:function(){
		// 页面关闭
	},
	onPullDownRefresh: function() {
		// 页面下拉刷新
		var self = this;
		self.setData({
		 	list1:[],
		 	list2:[],
		 	page: 1
		 }), self.onLoad().then(function() {
			return app.wechat.original.stopPullDownRefresh()
		})
	}
  
})