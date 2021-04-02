'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	let postType='';
	let postTypeId='';
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.postType!=undefined && param.postType!='' ){
				postType=param.postType;
			}
			
			if(param.postTypeId!=undefined && param.postTypeId!='' ){
				postTypeId=param.postTypeId;
			}
			
			
			
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxPostTypes");
	if(postType!=''){
		let queryRes=await collection.where({
			PostTypeLevel:1
		}).orderBy("PostTypeDate", "desc").get();
		//返回数据给客户端
		return queryRes
	}
	else if(postTypeId!=''){
		let queryTypeRes=await collection.where({
			PostTypeId:postTypeId
		}).get();
		//返回数据给客户端
		return queryTypeRes
	}
	else{
		let pageRes=await collection.where({
			PostType:postType
		}).orderBy("PostTypeDate", "desc").get();
		//返回数据给客户端
		return pageRes
	}
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getWxPostTypes
// https://openapi.axiangblog.com/getWxPostTypes/v1/