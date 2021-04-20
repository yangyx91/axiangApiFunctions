'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const postTypeId=formatDateToYYYYMMDDHHMMSS();
	const postTypeDate=formatDateToYYYYMMDD();
	const wxPostType={
		"PostTypeId":"",
		"PostType":"",
		"PostTypeLevel":1,
		"PostTypeParentId":"",
		"Author":"",
		"PostTypeDate":postTypeDate
	};
	
	let body = event.body;
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			if(param.PostTypeId!=undefined && param.PostTypeId!=''){
				wxPostType.PostTypeId=param.PostTypeId;
			}
			
			if(param.postTypeId!=undefined && param.postTypeId!=''){
				wxPostType.PostTypeId=param.postTypeId;
			}
			
			if(param.PostType!=undefined && param.PostType!=''){
				wxPostType.PostType=param.PostType;
			}
			
			if(param.postType!=undefined && param.postType!=''){
				wxPostType.PostType=param.postType;
			}
			
			if(param.PostTypeLevel!=undefined && param.PostTypeLevel>0){
				wxPostType.PostTypeLevel=param.PostTypeLevel;
			}
			
			if(param.postTypeLevel!=undefined && param.postTypeLevel>0){
				wxPostType.PostTypeLevel=param.postTypeLevel;
			}
			
			if(param.PostTypeParentId!=undefined && param.PostTypeParentId!=''){
				wxPostType.PostTypeParentId=param.PostTypeParentId;
			}
			
			if(param.postTypeParentId!=undefined && param.postTypeParentId!=''){
				wxPostType.PostTypeParentId=param.postTypeParentId;
			}
			
			if(param.Author!=undefined && param.Author!=''){
				wxPostType.Author=param.Author;
			}
			
			if(param.author!=undefined && param.author!=''){
				wxPostType.Author=param.author;
			}
			
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxPostTypes");
	 if(wxPostType.PostType!=undefined && wxPostType.PostType!=''&& wxPostType.PostTypeId==''){
		 wxPostType.PostTypeId=postTypeId;
		 const addRes= await collection.add(wxPostType);
		 if(addRes.id!=undefined){
		 		  const queryRes=await collection.where({"PostTypeId":postTypeId}).get()
		 		  return queryRes
		 }
		 return addRes	
		 
	 }else if(wxPostType.PostType!=undefined && wxPostType.PostType!=''&& wxPostType.PostTypeId!=''){
		 
		 const queryPostRes=await collection.where({"PostTypeId":wxPostType.PostTypeId}).get()
		 if(queryPostRes.affectedDocs>0 && queryPostRes.data!=undefined && queryPostRes.data.length>0)
		 {
		 	 const upRes = await collection.doc(queryPostRes.data[0]._id).update(wxPostType);
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

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/addWxPostType
// https://openapi.axiangblog.cn/wxPostTypeApi/v1/addWxPostType
// https://openapi.axiangblog.cn/wxPostTypeApi/v1/editWxPostType


