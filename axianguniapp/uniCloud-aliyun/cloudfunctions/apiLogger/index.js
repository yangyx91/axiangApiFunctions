'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const log={};
	log.eventId=formatDateToYYYYMMDD();
	log.logLevel="";
	log.creator="";
	log.exception="";
	log.message="";
	log.inputArgs="";
	log.outArgs="";
	log.logDate=formatDateToYYYYMMDDHHMMSS();
	let clientIP = context.CLIENTIP // 客户端ip信息
	let clientUA = context.CLIENTUA // 客户端user-agent
	//event为客户端上传的参数
	let body = event.body;
	//event.path="/add";
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=null){
		try{
			const param = JSON.parse(event.body);
			if(param.logLevel!=undefined ){
				log.logLevel=param.logLevel;
			}
			
			if(param.creator!=undefined ){
				log.creator=param.creator;
			}
			
			if(param.exception!=undefined ){
				log.exception=param.exception;
			}
			
			if(param.message!=undefined ){
				log.message=param.message;
			}
			
			if(param.inputArgs!=undefined ){
				log.inputArgs=param.inputArgs;
			}
			
			if(param.outArgs!=undefined ){
				log.outArgs=param.outArgs;
			}
			
		}catch(e){
			log.logLevel="Error";
			log.creator="event";
			log.exception=e.toString();
			log.inputArgs=JSON.stringify(event);
			log.message=e.message;
			log.outArgs=e.toString();
		}
	}else{
		try{
			const param = event;
			if(param.logLevel!=undefined ){
				log.logLevel=param.logLevel;
			}
			
			if(param.creator!=undefined ){
				log.creator=param.creator;
			}
			
			if(param.exception!=undefined ){
				log.exception=param.exception;
			}
			
			if(param.message!=undefined ){
				log.message=param.message;
			}
			
			if(param.inputArgs!=undefined ){
				log.inputArgs=param.inputArgs;
			}
			
			if(param.outArgs!=undefined ){
				log.outArgs=param.outArgs;
			}
			
		}catch(e){
			log.logLevel="Error";
			log.creator="event";
			log.exception=e.toString();
			log.inputArgs=JSON.stringify(event);
			log.message=e.message;
			log.outArgs=e.toString();
		}
	}
	
	
	const collection=db.collection("logs")
	const addRes= await collection.add(log);
	console.log("addRes",addRes);
	return event	
};

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/apiLogger
// https://openapi.axiangblog.com/loggersApi/v1/getLoggers