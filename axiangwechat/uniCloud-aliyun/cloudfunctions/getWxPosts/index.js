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
	let postId='';
	let title='';
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
			
			if(param.PostId!=undefined && param.PostId!='' ){
				postId=param.PostId;
			}
			
			if(param.postId!=undefined && param.postId!='' ){
				postId=param.postId;
			}
			
			//模糊搜索
			
			if(param.title!=undefined && param.title!='' ){
				title=param.title;
			}
			
			if(param.Title!=undefined && param.Title!='' ){
				title=param.Title;
			}
			
			if(param.keywords!=undefined && param.keywords!='' ){
				title=param.keywords;
			}
			
			if(param.Keywords!=undefined && param.Keywords!='' ){
				title=param.Keywords;
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
	}
	else if(title!=''){
		const dbCmd=db.command
		const queryRes=await collection.where(db.command.or(
		{"Title":title},{"Description":title}
		)).get()
		if(queryRes.affectedDocs>0 && queryRes.data!=undefined && queryRes.data.length>0){
			return queryRes.data;
		}
	}
	else if(postId!='')
	{
		let postIdRes=await collection.where({
			PostId:postId
		}).get();
		//返回数据给客户端
		return postIdRes
	}
	else{
		let pageRes=await collection.orderBy("PostDate", "desc").skip((page-1)*pageSize).limit(pageSize).get();
		//返回数据给客户端
		return pageRes
	}
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getWxPosts
// https://openapi.axiangblog.com/getWxPostTypes/v1/