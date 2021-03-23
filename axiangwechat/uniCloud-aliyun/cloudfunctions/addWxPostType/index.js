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
		"PostTypeId":postTypeId,
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
			if(param.PostType!=undefined && param.PostType!=''){
				wxPostType.PostType=param.PostType;
			}
			if(param.PostTypeLevel!=undefined && param.PostTypeLevel>0){
				wxPostType.PostTypeLevel=param.PostTypeLevel;
			}
			if(param.PostTypeParentId!=undefined && param.PostTypeParentId!=''){
				wxPostType.PostTypeParentId=param.PostTypeParentId;
			}
			if(param.Author!=undefined && param.Author!=''){
				wxPostType.Author=param.Author;
			}
		}catch(e){
			
		}
	}
	
	
	 if(wxPostType.PostType!=undefined && wxPostType.PostType!=''){
		 const collection=db.collection("wxPostTypes");
		 const addRes= await collection.add(wxPostType);
		 if(addRes.id!=undefined){
		 		  const queryRes=await collection.where({"PostTypeId":postTypeId}).get()
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

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/addWxPostType
// https://openapi.axiangblog.com/addWxPostType/v1/


