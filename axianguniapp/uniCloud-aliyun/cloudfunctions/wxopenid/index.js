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
		dataType:"json",
		data: {
			'grant_type' : 'authorization_code',
			'appid'	  : 'wx16606cb75f1c42a4', //你自己小程序的appid
			'secret'  : 'c7187d6ea6aa441e4a9f75c793b310cf', // 在小程序管理平台 -> 开发 -> 开发设置中
			'js_code' : code // wx.login 拿到的code
		}
	});
	//返回数据给客户端
	return res.data
};

//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
//https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/wxopenid