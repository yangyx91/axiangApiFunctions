'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS,
	stringToArrayBuffer
}=require('uni-common');
exports.main = async (event, context) => {
	
	const bingDailyImgApi = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
	const dailyImg={};
	 const res=await uniCloud.httpclient.request(bingDailyImgApi,{
		 method: 'Get',
		 data: {},
		 contentType: 'json', // 指定以application/json发送data内的数据
		 dataType: 'json' // 指定返回值为json格式，自动进行parse
	 });
	 
	 if(res.status!=undefined 
	 && res.status==200 
	 && res.data!=undefined 
	 && res.data.images!=undefined
	 && res.data.images.length>0
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
	 return dailyImg;
};




