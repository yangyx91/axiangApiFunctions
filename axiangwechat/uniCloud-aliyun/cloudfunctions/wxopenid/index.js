'use strict';
exports.main = async (event, context) => {
	
	let code="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.code!=undefined && param.code!=''){
				code=param.code;
			}
			
		}catch(e){
			
		}
	}
	
	// 获取openid 请求地址
	const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
	// uniCloud.httpclient 发起请求
	const res = await uniCloud.httpclient.request(apiUrl,
	{
		method: 'POST',
		contentType:'json',
		dataType:'json',
		data: {
			'grant_type' : 'authorization_code',
			'appid'	  : 'wx16606cb75f1c42a4', //你自己小程序的appid
			'secret'  : 'c7187d6ea6aa441e4a9f75c793b310cf', // 在小程序管理平台 -> 开发 -> 开发设置中
			'js_code' : code // wx.login 拿到的code
		}
	});
	
	// let callFunctionResult = await uniCloud.callFunction({
	//     name: "apiLogger",
	//     data: { 
	// 	logLevel: "Info",
	// 	creator: "wxopenid",
	// 	exception: "",
	// 	message: "",
	// 	inputArgs:'js_code:'+code,
	// 	outArgs: res.data,
	// 	},
	// })
	//返回数据给客户端
	return res.data
};

//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/wxopenid