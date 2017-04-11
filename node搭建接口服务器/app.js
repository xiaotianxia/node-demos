var express=require('express');
var app =express();
var request = require('request');

//设置跨域访问
app.all('*', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

var questions={
	data: [{
		data:213,
		num:444,
		age:12
	},{
		data:456,
		num:678,
		age:13
}]};

//接口test/123
app.get('/test/123',function(req,res){
	res.status(200);
	var options = {
	    method: "GET",
	    url: "http://news-at.zhihu.com/api/4/news/latest"
	};
	request(options, function (error, response, body) {
	    if (error) throw new Error(error);
	    res.json(JSON.parse(body))
	});
});

//配置服务端口
var server = app.listen(3000, function () {
	var port = server.address().port;
    console.log('App is listening at port:' + port);
})