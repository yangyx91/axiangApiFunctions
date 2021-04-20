'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let page=1;
	let pageSize=50;
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			if(param.page!=undefined && param.page>1){
				page=param.page;
			}
			if(param.pageSize!=undefined && param.pageSize>0){
				pageSize=param.pageSize;
			}
		}
		catch(e){
			//return {
				//status: -1,
				//msg: e.message
			//}
		}
	}
	
	  if(pageSize > 100){
		throw new Error('单页数据不可超过100条')
	  }
	  const res = await db.collection('wxUploads')
	  .orderBy("UploadDate", "desc")
	  .skip((page-1)*pageSize)
	  .limit(pageSize)
	  .get()
	  if(res!=null){
		  return res;
	  }
	  
	 return event
};


//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getUploadImgs
//https://openapi.axiangblog.cn/getUploadImg/v1/