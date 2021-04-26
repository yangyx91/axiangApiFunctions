'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let PostId="";
	//event为客户端上传的参数
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.postId!=undefined && param.postId!=''){
				PostId=param.postId;
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
		
		if(PostId!=''){
			const collection=db.collection("wxPosts");
			let res=await collection.where({"PostId":PostId}).remove();
			return result
		}
		return {
			status: -1,
			msg: e.message
		}
	}
	catch(e){
		return {
			status: -1,
			msg: e.message
		}
	}
	//返回数据给客户端
	return event
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/delWxPost
//https://openapi.axiangblog.cn/wxPostApi/v1/delWxPost