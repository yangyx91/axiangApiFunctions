'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let page=1;
	let pageSize=10;
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.page!=undefined && param.page>=1){
				page=param.page;
			}
			
			if(param.pageSize!=undefined && param.pageSize>=1){
				pageSize=param.pageSize;
			}
		}catch(e){
			
		}
	}
	
	const collection=db.collection("bingImgs");
	const pageRes=await collection.orderBy("imgId", "desc").skip((page-1)*pageSize).limit(pageSize).get();
	//返回数据给客户端
	return pageRes
};

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/getBingImgs
// https://openapi.axiangblog.com/bingImgsApi/v1/getBingImgs