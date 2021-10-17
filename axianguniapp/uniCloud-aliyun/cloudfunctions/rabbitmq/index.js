
'use strict';
//云函数暂时不支持import写法，只能用require导入
const amqp = require('amqplib/callback_api');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const CLOUDAMQP_URL="amqps://vkhuqkge:KgBlV_7kL21jNsrX7oiX2XyW99ujBswo@gerbil.rmq.cloudamqp.com/vkhuqkge";
	const exchange="";
	const routingKey="queue1";
	const content=Buffer.from("123456");
	try {
	    amqp.connect(CLOUDAMQP_URL, function(err, conn) {  
	         if (err) {
	           console.error("[AMQP]", err.message);
	         }
	         conn.on("error", function(err) {
	           if (err.message !== "Connection closing") {
	             console.error("[AMQP] conn error", err.message);
	           }
	         });
	         conn.on("close", function() {
	           console.error("[AMQP] reconnecting");
	         });
	         console.log("[AMQP] connected");
	         
			 conn.createChannel(function(err, ch) {
			     if (err != null){
					 console.error(err);
					 //process.exit(1);
				 }
			     ch.assertQueue(routingKey);
			     ch.sendToQueue(routingKey, content);
				
				// ch.consume(routingKey, function(msg) {
				// 	if (msg !== null) {
				// 		console.log(msg.content.toString());
				// 		//ch.ack(msg);
				// 		return;
				// 	  }
				// 	});
			   
			   //   ch.assertQueue(routingKey, { durable: true }, function(err, _ok) {
			   //        ch.consume(routingKey, function(msg) {if (msg !== null) {
						// 	console.log(msg.content.toString());
						// 	ch.ack(msg);
						//   }
						// });
			   //      console.log("Worker is started");
			   //    });
			   
			   //conn.close();
			   console.log('event : ', event);
			   //process.exit(1);
			   return;
	         });
			  console.log('event2 : ', event);
		   return;
		  });
	  } catch (e) {
	    console.error("ERROR", e);
	   
	  }
	
	console.log('event1 : ', event);
	
	//返回数据给客户端
	return event
};
