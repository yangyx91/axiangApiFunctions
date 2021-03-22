'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	let eventId="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.eventId!=undefined && param.eventId!=''){
				eventId=param.eventId;
			}
			
		}catch(e){
			return {
				status: -1,
				msg: e.message
			}
		}
	}
	
	if(eventId!=''){
		const collection=db.collection("logs");
		
		let res=await collection.where({"eventId":eventId}).remove();
		
		return res
	}else{
		return {
			status: -2,
			msg: 'eventId为空'
		}
	}
	
};


// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/delLogger
// https://openapi.axiangblog.com/delLogger/v1
