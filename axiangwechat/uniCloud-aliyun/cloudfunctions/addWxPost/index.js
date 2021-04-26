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
		"PostId":"",
		"Title":"",
		"Description":"",
		"PostUrl":"",
		"Author":"",
		"PostDate":postDate,
		"Tags":"",
		"Thumbnail":"",
		"IsTop":false,
		"PostType":"",
		"Topic":"",
		"media_id":""
	};
	
	if(event.PostId!=undefined && event.PostId!=''){
		wxPost.PostId=event.PostId;
	}
	
	if(event.Title!=undefined && event.Title!=''){
		wxPost.Title=event.Title;
	}
	
	if(event.Description!=undefined && event.Description!=''){
		wxPost.Description=event.Description;
	}
	
	if(event.PostUrl!=undefined && event.PostUrl!=''){
		wxPost.PostUrl=event.PostUrl;
	}
	
	if(event.Author!=undefined && event.Author!=''){
		wxPost.Author=event.Author;
	}
	
	
	if(event.Tags!=undefined && event.Tags!=''){
		wxPost.Tags=event.Tags;
	}
	
	
	if(event.Thumbnail!=undefined && event.Thumbnail!=''){
		wxPost.Thumbnail=event.Thumbnail;
	}
	
	if(event.IsTop!=undefined){
		wxPost.IsTop=event.IsTop;
	}
	
	if(event.PostType!=undefined && event.PostType!=''){
		wxPost.PostType=event.PostType;
	}
	
	if(event.Topic!=undefined && event.Topic!=''){
		wxPost.Topic=event.Topic;
	}
	
	if(event.Content!=undefined && event.Content!=''){
		wxPost.Content=event.Content;
	}
	
	if(event.media_id!=undefined && event.media_id!=''){
		wxPost.media_id=event.media_id;
	}
	
	let body = event.body;
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.PostId!=undefined && param.PostId!=''){
				wxPost.PostId=param.PostId;
			}
			
			if(param.postId!=undefined && param.postId!=''){
				wxPost.PostId=param.postId;
			}
			
			if(param.Title!=undefined && param.Title!=''){
				wxPost.Title=param.Title;
			}
			if(param.title!=undefined && param.title!=''){
				wxPost.Title=param.title;
			}
			if(param.Description!=undefined && param.Description!=''){
				wxPost.Description=param.Description;
			}
			if(param.description!=undefined && param.description!=''){
				wxPost.Description=param.description;
			}

			if(param.PostUrl!=undefined && param.PostUrl!=''){
				wxPost.PostUrl=param.PostUrl;
			}
			
			if(param.postUrl!=undefined && param.postUrl!=''){
				wxPost.PostUrl=param.postUrl;
			}

			if(param.Author!=undefined && param.Author!=''){
				wxPost.Author=param.Author;
			}
			
			if(param.author!=undefined && param.author!=''){
				wxPost.Author=param.author;
			}

			if(param.Tags!=undefined && param.Tags!=''){
				wxPost.Tags=param.Tags;
			}
			
			if(param.tags!=undefined && param.tags!=''){
				wxPost.Tags=param.tags;
			}

			if(param.Thumbnail!=undefined && param.Thumbnail!=''){
				wxPost.Thumbnail=param.Thumbnail;
			}
			
			if(param.thumbnail!=undefined && param.thumbnail!=''){
				wxPost.Thumbnail=param.thumbnail;
			}

			if(param.IsTop!=undefined){
				wxPost.IsTop=param.IsTop;
			}
			
			if(param.isTop!=undefined){
				wxPost.IsTop=param.isTop;
			}

			if(param.PostType!=undefined && param.PostType!=''){
				wxPost.PostType=param.PostType;
			}
			
			if(param.postType!=undefined && param.postType!=''){
				wxPost.PostType=param.postType;
			}
			
			if(param.Topic!=undefined && param.Topic!=''){
				wxPost.Topic=param.Topic;
			}
			
			if(param.topic!=undefined && param.topic!=''){
				wxPost.Topic=param.topic;
			}
			
			if(param.PostDate!=undefined && param.PostDate!=''){
				wxPost.PostDate=param.PostDate;
			}
			
			if(param.postDate!=undefined && param.postDate!=''){
				wxPost.PostDate=param.postDate;
			}
			
			if(param.content!=undefined && param.content!=''){
				wxPost.Content=param.content;
			}
			
			if(param.Content!=undefined && param.Content!=''){
				wxPost.Content=param.Content;
			}
			
			if(param.media_id!=undefined && param.media_id!=''){
				wxPost.media_id=param.media_id;
			}
			
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxPosts");
	 if(wxPost.PostUrl!=undefined && wxPost.PostUrl!=''&& wxPost.PostId==''){
		 
		 wxPost.PostId=postId;
		 const addRes= await collection.add(wxPost);
		 if(addRes.id!=undefined){
		 		  const queryRes=await collection.where({"PostId":postId}).get()
		 		  return queryRes
		 }
		 return addRes	
		 
	 }
	 else if(wxPost.PostUrl!=undefined && wxPost.PostUrl!=''&& wxPost.PostId!=''){
		 
		 const queryPostRes=await collection.where({"PostId":wxPost.PostId}).get()
		 if(queryPostRes.affectedDocs>0 && queryPostRes.data!=undefined && queryPostRes.data.length>0)
		 {
			const upRes = await collection.doc(queryPostRes.data[0]._id).update(wxPost);
			return upRes
		 }
	 }
	 else{
		 return {
			 "affectedDocs":0,
			 "data":[],
		 }
	 }
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/addWxPost
// https://openapi.axiangblog.cn/wxPostApi/v1/addWxPost
// https://openapi.axiangblog.cn/wxPostApi/v1/editWxPost


