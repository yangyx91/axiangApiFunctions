'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const a='wxbe1e31d732baba4c';
	const appid='wx16606cb75f1c42a4';
	const collection=db.collection("wxAccessTokens")
	const dbCmd=db.command
	const queryRes=await collection.where(db.command.or(
	{"Appid":appid},{"Appid":a}
	)).get()
	if(queryRes.affectedDocs>0 && queryRes.data!=undefined && queryRes.data.length>0){
		return queryRes.data;
	}
	return event
};


//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/getWxAccessToken
// https://openapi.axiangblog.com/getWxAccessToken/v1/