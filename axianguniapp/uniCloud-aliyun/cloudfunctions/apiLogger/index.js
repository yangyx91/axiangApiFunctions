'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return event
};


// logId = this.LogId,
//                 eventId = this.EventId,
//                 logDate = this.LogDate,
//                 creator = this.CurrentMethodName,
//                 logLevel = LogLevel.Debug.ToString(),
//                 exception = "",
//                 message = message,
//                 args = System.Text.Json.JsonSerializer.Serialize(args)

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/addBingImg

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/dailyBingImg

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/getBingImgs

// https://72617af9-beba-4a09-8f3a-1e026fd1eff9.bspapp.com/http/apiLogger


// http(s)://openapi.axiangblog.com/addBingImg/v1.0/add

// http(s)://openapi.axiangblog.com/dailyBingImg/v1.0/get

// http(s)://openapi.axiangblog.com/getBingImgs/v1.0/getimgs

// http(s)://openapi.axiangblog.com/apiLogger/v1.0/loginfo