'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	
	const appid='wx16606cb75f1c42a4';
	const secret='c7187d6ea6aa441e4a9f75c793b310cf';
	const collection=db.collection("wxAccessTokens")
	const queryRes=await collection.where({"Appid":appid}).get()
	if(queryRes.affectedDocs>0 && queryRes.data!=undefined && queryRes.data.length>0){
		
		// 获取openid 请求地址
		const apiUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret;
		// uniCloud.httpclient 发起请求
		const res = await uniCloud.httpclient.request(apiUrl,
		{
			method: 'GET',
			dataType:"json"
		});
		
		if(res.data!=undefined && res.data.access_token!=undefined)
		{
			const upRes = await collection.doc(queryRes.data[0]._id).update({
						  Appid:appid,
						  AccessToken:res.data.access_token,
						  UpdateTime:formatDateToYYYYMMDDHHMMSS()
			});
			const queryNewRes=await collection.where({"Appid":appid}).get()
			return queryNewRes.data;
		}
	}
	else
	{
		// 获取openid 请求地址
		const apiUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret;
		// uniCloud.httpclient 发起请求
		const res = await uniCloud.httpclient.request(apiUrl,
		{
			method: 'GET',
			dataType:"json"
		});
		
		if(res.data!=undefined && res.data.access_token!=undefined){
			const addRes= await collection.add({
						  Appid:appid,
						  AccessToken:res.data.access_token,
						  UpdateTime:formatDateToYYYYMMDDHHMMSS()
			});
			if(addRes.id!=undefined){
				const queryNewRes=await collection.where({"Appid":appid}).get()
				return queryNewRes.data;
			}
		}
	}
	return event
};


//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/wxaccessToken