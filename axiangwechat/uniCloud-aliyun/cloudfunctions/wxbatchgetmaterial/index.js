'use strict';
const {
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS
}=require('uni-common');
const db=uniCloud.database()
exports.main = async (event, context) => {
	let count=1;
	let offset='0';
	let searchRes=0;
	let body = event.body;
	if(event.isBase64Encoded){
	      body = Buffer.from(body);
	}
	if(body!=''){
		try{
			const param = JSON.parse(body);
			//event为客户端上传的参数
			
			if(param.offset!=undefined && param.offset!=''){
				offset=param.offset;
			}
			if(param.count!=undefined && param.count>0){
				count=param.count;
			}
		}catch(e){
			
		}
	}
	
	const collection=db.collection("wxAccessTokens")
	const postsCollection=db.collection("wxPosts")
	//订阅号
	const mpappid='wxbe1e31d732baba4c';
	const mpqueryRes=await collection.where({"Appid":mpappid}).get()
	

	if(mpqueryRes.affectedDocs>0 && mpqueryRes.data!=undefined && mpqueryRes.data.length>0)
	{
		let access_token=mpqueryRes.data[0].AccessToken;
			
			
		// 获取openid 请求地址
		const apiUrl = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+access_token;
		// uniCloud.httpclient 发起请求
		const res = await uniCloud.httpclient.request(apiUrl,
		{
			method: 'POST',
			contentType:'json',
			dataType:'json',
			data: {
				'type': 'news',
				'offset': offset,
				'count': count
			}
		});
		
		if(res.data!=undefined 
		&& res.data.total_count>0 
		&& res.data.item!=undefined 
		&& res.data.item.length>=0){
			
			for (var i = 0; i < res.data.item.length; i++) {
				
				var media=res.data.item[i];
				
				if(media.media_id!=undefined 
				&& media.content!=undefined 
				&& media.content.news_item!=undefined
				&& media.content.news_item.length>=0
				)
				//判断media_ids是否存在
				searchRes=await postsCollection.where({"media_id":media.media_id}).count();
				if(searchRes.affectedDocs!=undefined && searchRes.total==0){
					
					for (var j = 0; j < media.content.news_item.length; j++) {
						
						var post=media.content.news_item[j];
						let callFunctionResult = await uniCloud.callFunction({
						    name: "addWxPost",
						    data: { 
								"PostId":"",
								"Title":post.title,
								"Description":post.digest,
								"PostUrl":post.url,
								"Author":post.author,
								"Tags":"",
								"Thumbnail":post.thumb_url,
								"IsTop":false,
								"PostType":"",
								"Topic":"",
								"Content":post.content,
								"media_id":media.media_id
							}
						})
					}
				}
				return searchRes;
			}
		}
		return res;
	}

	//返回数据给客户端
	return event
};

//https://5f910eba-d66b-4a7f-803e-46465dd1179a.bspapp.com/http/wxbatchgetmaterial
//https://openapi.axiangblog.cn/weixinToken/v1/batchgetmaterial