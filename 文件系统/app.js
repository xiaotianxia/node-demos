var express=require('express');
var app =express();
var fs = require("fs");
var util = require('util');
var buf = new Buffer(1024);

app.get('/', function (request, response) {
	console.log(util.isArray([]));
	console.log("准备打开文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
	   	if (err) {
	   	    return console.error(err);
	   	}
	   	console.log("文件打开成功！");
	   	console.log("准备读取文件！");
	   	fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
	      	if (err){
	         	console.log(err);
	      	}

	      	// 仅输出读取的字节
	      	if(bytes > 0){
	      		var content = buf.slice(0, bytes).toString();
	         	console.log(content);
	         	response.send(content);
	      	}

	      // 关闭文件
	      	fs.close(fd, function(err){
	         	if (err){
	            	console.log(err);
	         	} 
	         	console.log("文件关闭成功");
	      	});
	   	});
	});
});
app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});