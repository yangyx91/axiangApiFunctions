'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let postId="";
	let imgBase64="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.PostId!=undefined && param.PostId!=''){
				postId=param.PostId;
			}
			
			if(param.postId!=undefined && param.postId!=''){
				postId=param.postId;
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
		
		if(postId!=''){
			
			const collection=db.collection("wxGuestBooks");
			let res=await collection.where({"PostId":postId}).remove();
			return result
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


//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/deleteWxGuestBook
//https://openapi.axiangblog.com/deleteWxGuestBook/v1/

