'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	let imgId="";
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
		}catch(e){
			return {
				status: -1,
				msg: e.message
			}
		}
	}
	
	if(imgId!=''){
		const collection=db.collection("bingImgs");
		let res=await collection.where({"imgId":imgId}).remove();
		return res
		
	}else{
		return {
			status: -2,
			msg: 'imgId为空'
		}
	}
};


// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/delBingImgs
// https://openapi.axiangblog.cn/bingImgsApi/v1/delBingImgs
