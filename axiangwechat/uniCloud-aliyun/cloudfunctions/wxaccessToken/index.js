'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	const collection=db.collection("wxAccessTokens")
	
	//订阅号
	const mpappid='wxbe1e31d732baba4c';

	const mpqueryRes=await collection.where({"Appid":mpappid}).get()
	if(mpqueryRes.affectedDocs>0 && mpqueryRes.data!=undefined && mpqueryRes.data.length>0)
	{
		const mpapiUrl='https://openapi.axiangblog.cn/weixinToken/v1/'
		// uniCloud.httpclient 发起请求
		const mpres = await uniCloud.httpclient.request(mpapiUrl,
		{
			method: 'GET',
			dataType:"json"
		});
		
		if(mpres.data!=undefined && mpres.data.access_token!=undefined)
		{
			const upRes = await collection.doc(mpqueryRes.data[0]._id).update({
						  Appid:mpappid,
						  AccessToken:mpres.data.access_token,
						  UpdateTime:formatDateToYYYYMMDDHHMMSS()
			});
		}
	}
	
	//小程序
	const miniappid='wx16606cb75f1c42a4';
	const miniqueryRes=await collection.where({"Appid":miniappid}).get()
	if(miniqueryRes.affectedDocs>0 && miniqueryRes.data!=undefined && miniqueryRes.data.length>0){
		
		// 获取openid 请求地址
		const miniapiUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+miniappid+'&secret='+miniqueryRes.data[0].AppSecret;
		// uniCloud.httpclient 发起请求
		const minires = await uniCloud.httpclient.request(miniapiUrl,
		{
			method: 'GET',
			dataType:"json"
		});
		
		if(minires.data!=undefined && minires.data.access_token!=undefined)
		{
			const upRes = await collection.doc(miniqueryRes.data[0]._id).update({
						  Appid:miniappid,
						  AccessToken:minires.data.access_token,
						  UpdateTime:formatDateToYYYYMMDDHHMMSS()
			});
		}
	}
	
	return event
};


//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/wxaccessToken