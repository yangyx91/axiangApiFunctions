'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let page=1;
	let pageSize=10;
	let postType='';
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
			
			if(param.postType!=undefined && param.postType!='' ){
				postType=param.postType;
			}
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxPosts");
	if(postType!=''){
		let queryRes=await collection.where({
			PostType:postType
		}).orderBy("PostDate", "desc").skip((page-1)*pageSize).limit(pageSize).get();
		//返回数据给客户端
		return queryRes
	}else{
		let pageRes=await collection.orderBy("PostDate", "desc").skip((page-1)*pageSize).limit(pageSize).get();
		//返回数据给客户端
		return pageRes
	}
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getWxPosts
// https://openapi.axiangblog.com/getWxPosts/v1/