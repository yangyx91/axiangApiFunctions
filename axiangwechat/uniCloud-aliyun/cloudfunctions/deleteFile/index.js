'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let list=[];
	let imgId="";
	let imgUrl="";
	let imgName="";
	let imgBase64="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.imgUrl!=undefined && param.imgUrl!=''){
				imgUrl=param.imgUrl;
				list.push(imgUrl);
			}
			
		}
		catch(e){
			return {
				status: -1,
				msg: e.message
			}
		}
	}
	
	try{
		
		if(imgUrl!=''&& list.length>0){
			
			// 云函数删除文件示例代码
			let result = await uniCloud.deleteFile({
			    fileList: list
			});
			
			const collection=db.collection("wxUploads");
			let res=await collection.where({"FileID":imgUrl}).remove();
			return result
		}
	}
	catch(e){
		return {
			status: -1,
			msg: e.message
		}
	}
	return event;
};


//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/deleteUploadImg
//https://openapi.axiangblog.cn/deleteUploadImg/v1/

