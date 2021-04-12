'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const postId=formatDateToYYYYMMDDHHMMSS();
	const postDate=formatDateToYYYYMMDD();
	const wxGuestBook={
		"PostId":"",
		"PostGroupId":"",
		"OpenId":"",
		"NickName":"",
		"HeadImgUrl":"",
		"Title":"",
		"Detail":"",
		"Attachment":"",
		"IsQuestion":false,
		"IsAnswer":false,
		"Topic":"",
		"PostDate":postDate
	};
	
	let body = event.body;
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.PostId!=undefined && param.PostId!=''){
				wxGuestBook.PostId=param.postId;
			}
			
			if(param.PostGroupId!=undefined && param.PostGroupId!=''){
				wxGuestBook.PostGroupId=param.PostGroupId;
			}
			
			if(param.OpenId!=undefined && param.OpenId!=''){
				wxGuestBook.OpenId=param.OpenId;
			}
			
			if(param.NickName!=undefined && param.NickName!=''){
				wxGuestBook.NickName=param.NickName;
			}
			
			if(param.HeadImgUrl!=undefined && param.HeadImgUrl!=''){
				wxGuestBook.HeadImgUrl=param.HeadImgUrl;
			}
			
			if(param.Title!=undefined && param.Title!=''){
				wxGuestBook.Title=param.Title;
			}
			
			if(param.Detail!=undefined && param.Detail!=''){
				wxGuestBook.Detail=param.Detail;
			}
			
			if(param.Attachment!=undefined && param.Attachment!=''){
				wxGuestBook.Attachment=param.Attachment;
			}
			
			if(param.IsQuestion!=undefined && (param.IsQuestion==true || param.IsQuestion==false)){
				wxGuestBook.IsQuestion=param.IsQuestion;
			}
			
			if(param.IsAnswer!=undefined && (param.IsAnswer==true || param.IsAnswer==false )){
				wxGuestBook.IsAnswer=param.IsAnswer;
			}
			
			if(param.Topic!=undefined && param.Topic!=''){
				wxGuestBook.Topic=param.Topic;
			}
			
			
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxGuestBooks");
	 if(wxGuestBook.PostUrl!=undefined && wxGuestBook.PostUrl!=''&& wxGuestBook.PostId==''){
		 
		 wxGuestBook.PostId=postId;
		 const addRes= await collection.add(wxGuestBook);
		 if(addRes.id!=undefined){
		 		  const queryRes=await collection.where({"PostId":postId}).get()
		 		  return queryRes
		 }
		 return addRes	
		 
	 }
	 else{
		 
		 return {
			 "affectedDocs":0,
			 "data":[],
		 }
	 }
};

// https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/addWxGuestBook
// https://openapi.axiangblog.com/addWxGuestBook/v1/


