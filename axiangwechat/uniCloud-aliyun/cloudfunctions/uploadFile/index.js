'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	let imgId="";
	let imgUrl="";
	let imgName="";
	let imgBase64="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			if(param.imgId!=undefined && param.imgId!=''){
				imgId=param.imgId;
			}
			if(param.imgUrl!=undefined && param.imgUrl!=''){
				imgUrl=param.imgUrl;
			}
			if(param.imgName!=undefined && param.imgName!=''){
				imgName=param.imgName;
			}
			if(param.imgBase64!=undefined && param.imgBase64!=''){
				imgBase64=param.imgBase64;
			}
		}
		catch(e){
			return {
				status: -1,
				msg: e.message
			}
		}
	}
	
	try{
		
		if(imgBase64!=''&& imgBase64.length>4 && (imgId!=''||imgName!='')){
			
			const fs = require("fs");
			let uploadRes = await uniCloud.uploadFile({
			    cloudPath: imgName,
			    fileContent: Buffer.from(imgBase64, "base64")
			});
			
			return uploadRes;
		}
		
		if(imgUrl!=''&& (imgId!=''||imgName!='')){
			// uniCloud.httpclient 发起请求
			const res = await uniCloud.httpclient.request(imgUrl,
			{
				method: 'GET'
			});
			
			if(res.data!=null){
				
				let result = await uniCloud.uploadFile({
				    cloudPath: imgName,
				    fileContent: res.data
				});
				return result;
			}
			else{
				return {
				status: -1,
				msg: e.message
			  }
			}
		}
		
	}
	catch(e){
		return {
			status: -1,
			msg: e.message
		}
	}
	return event;
};


//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/upload
//https://openapi.axiangblog.com/uploadImg/v1/

