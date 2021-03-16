'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	let imgId="";
	let body = event.body
	if(event.isBase64Encoded){
	      body = Buffer.from(body)
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.imgId!=undefined && param.imgId!=''){
				imgId=param.imgId;
			}
			
		}catch(e){
			
		}
	}
	
	if(imgId!=''){
		const collection=db.collection("bingImgs");
		
		const docList=await collection.where({"imgId":imgId}).get();
		if (!docList.data || docList.data.length === 0) {
			return {
				status: -1,
				msg: 'bingImgs表没有数据'
			}
		}
		const res = await collection.doc(docList.data[0]._id).remove()
		if (res.deleted === 1) {
			return {
				status: 0,
				msg: '成功删除bingImgs一条数据'
			}
		} else {
			return {
				status: -2,
				msg: '删除bingImgs数据失败'
			}
		}
	}else{
		return {
			status: -2,
			msg: 'imgId为空'
		}
	}
	
};
