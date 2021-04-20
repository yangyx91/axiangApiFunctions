'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const miniProgramAppid='wxbe1e31d732baba4c';
	const wxAppid='wx16606cb75f1c42a4';
	//限定返回字段
	const collection=db.collection("wxAccessTokens").field({
		"Appid":true,
		"AccessToken":true,
		"UpdateTime":true,
		"Name":true,
		"Type":true,
		 "_id": false
	})
	const dbCmd=db.command
	const queryRes=await collection.where(db.command.or(
	{"Appid":wxAppid},{"Appid":miniProgramAppid}
	)).get()
	if(queryRes.affectedDocs>0 && queryRes.data!=undefined && queryRes.data.length>0){
		return queryRes.data;
	}
	return event
};


//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getWxAccessToken
// https://openapi.axiangblog.cn/getWxAccessToken/v1/