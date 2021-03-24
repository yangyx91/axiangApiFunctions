'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const postId=formatDateToYYYYMMDDHHMMSS();
	const postDate=formatDateToYYYYMMDD();
	const wxPost={
		"PostId":postId,
		"Title":"",
		"Description":"",
		"PostUrl":"",
		"Author":"",
		"PostDate":postDate,
		"Tags":"",
		"Thumbnail":"",
		"IsTop":false,
		"PostType":"",
		"Topic":""
	};
	
	let body = event.body;
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			if(param.Title!=undefined && param.Title!=''){
				wxPost.Title=param.Title;
			}
			if(param.Description!=undefined && param.Description!=''){
				wxPost.Description=param.Description;
			}

			if(param.PostUrl!=undefined && param.PostUrl!=''){
				wxPost.PostUrl=param.PostUrl;
			}

			if(param.Author!=undefined && param.Author!=''){
				wxPost.Author=param.Author;
			}

			if(param.Tags!=undefined && param.Tags!=''){
				wxPost.Tags=param.Tags;
			}

			if(param.Thumbnail!=undefined && param.Thumbnail!=''){
				wxPost.Thumbnail=param.Thumbnail;
			}

			if(param.IsTop!=undefined){
				wxPost.IsTop=param.IsTop;
			}

			if(param.PostType!=undefined && param.PostType!=''){
				wxPost.PostType=param.PostType;
			}
			
			if(param.Topic!=undefined && param.Topic!=''){
				wxPost.Topic=param.Topic;
			}
			
		}catch(e){
			
		}
	}
	
	
	 if(wxPost.PostUrl!=undefined && wxPost.PostUrl!=''){
		 const collection=db.collection("wxPosts");
		 const addRes= await collection.add(wxPost);
		 if(addRes.id!=undefined){
		 		  const queryRes=await collection.where({"PostId":postId}).get()
		 		  return queryRes
		 }
		 return addRes	
		 
	 }else{
		 
		 return {
			 "affectedDocs":0,
			 "data":[],
		 }
	 }
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/addWxPost
// https://openapi.axiangblog.com/addWxPost/v1/


