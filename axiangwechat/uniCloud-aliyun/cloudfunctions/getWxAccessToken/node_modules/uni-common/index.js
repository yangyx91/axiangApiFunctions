// module.exports = function(e) {
// 	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
// 	return e
// }

module.exports={
	formatDateToYYYYMMDD,
	formatDateToYYYYMMDDHHMMSS,
	stringToArrayBuffer
}

//日期格式化
function formatDateToYYYYMMDD(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	if(month<10){
		month='0'+month;
	}else{
		month=month.toString();
	}
	
	var day=date.getDate();
	if(day<10){
		day='0'+day;
	}else{
		day=day.toString();
	}
	
	return year+'-'+month+'-'+day;
	
}

function formatDateToYYYYMMDDHHMMSS(){
	var date=new Date();
	
	const targetTimezone = -8;
	const dif = new Date().getTimezoneOffset();
	let east8time = date.getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000);
	date=new Date(east8time);
	  
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	if(month<10){
		month='0'+month;
	}else{
		month=month.toString();
	}
	
	var day=date.getDate();
	if(day<10){
		day='0'+day;
	}else{
		day=day.toString();
	}
	var hour=date.getHours().toString();
	if(date.getHours()<10){
		hour='0'+hour;
	}
	var min=date.getMinutes().toString();
	if(date.getMinutes()<10){
		min='0'+min;
	}
	var seconds=date.getSeconds().toString();
	if(date.getSeconds()<10){
		seconds='0'+seconds;
	}
	console.log(year+month+day+hour+min+seconds);
	return year+month+day+hour+min+seconds;
}

function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}