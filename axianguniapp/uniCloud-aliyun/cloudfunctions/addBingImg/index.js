'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	const bingDailyImgApi 
	= 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
	const dailyImg={};
	 const res=await uniCloud.httpclient.request(bingDailyImgApi,{
		 method: 'Get',
		 data: {},
		 contentType: 'json', // 指定以application/json发送data内的数据
		 dataType: 'json' // 指定返回值为json格式，自动进行parse
	 });
	 
	 if(res.status!=undefined && res.status==200 && res.data!=undefined 
	 && res.data.images!=undefined && res.data.images.length>0
	 ){
		 var bingImg=res.data.images[0];
		 dailyImg.imgId = bingImg.startdate,
		 dailyImg.CreateDate =formatDateToYYYYMMDD(),
		 dailyImg.Creator = "admin",
		 dailyImg.Domain = "https://www.bing.com",
		 dailyImg.Title = bingImg.copyright,
		 dailyImg.Url = "https://www.bing.com" + bingImg.url,
		 dailyImg.UrlBase = "https://www.bing.com" + bingImg.urlbase
	 }
    const collection=db.collection("bingImgs")
	const queryRes=await collection.where({"imgId":bingImg.startdate}).get()
	
	if(queryRes.affectedDocs>0 && queryRes.data!=undefined && queryRes.data.length>0){
		return queryRes;
	}
	else
	{
	  const addRes= await collection.add(dailyImg);
	  if(addRes.id!=undefined){
		  const queryRes=await collection.where({"imgId":bingImg.startdate}).get()
		  return queryRes
	  }
	  return addRes	
	}
};

//		//console.log(queryRes.data[0]._id);
		//const delRes=await collection.doc(queryRes.data[0]._id).remove()
//let clientIP = context.CLIENTIP // 客户端ip信息
//let clientUA = context.CLIENTUA // 客户端user-agent
// // promise方式
// uniCloud.callFunction({
//     name: 'test',
//     data: { a: 1 }
//   })
//   .then(res => {});

// // callback方式
// uniCloud.callFunction({
//     name: 'test',
//     data: { a: 1 },
//     success(){},
//     fail(){},
//     complete(){}
// });

//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html

// 以下代码在云函数 loginWithWechat/index.js 中
// exports.main = async (event, context) => {
//    // 获取openid 请求地址
// 	const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
//   // uniCloud.httpclient 发起请求
// 	const res = await uniCloud.httpclient.request(apiUrl,
// 	{
// 		method: 'GET',
// 		dataType:"json",
// 		data: {
// 			'grant_type' : 'authorization_code',
// 			'appid'	  : '', //你自己小程序的appid
// 			'secret'  : '', // 在小程序管理平台 -> 开发 -> 开发设置中
// 			'js_code' : event.js_code // wx.login 拿到的code
// 		}
// 	});
// 	//返回数据给客户端
// 	return res
// };

