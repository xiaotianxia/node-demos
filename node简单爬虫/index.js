/*
*简单爬虫，抓取cnode官网文章题目信息
*superagent是个http方面的库，可以发起get或post请求
*cheerio可以理解成Node.js版的jquery，用来从网页中以css selector取数据，使用方式跟jquery一样
*/

var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    avatar: $element.find('.user_avatar img').attr('src'),
                    title: $element.find('.topic_title').attr('title'),
                    href: $element.find('.topic_title').attr('href')
                });
            });
            console.log(items);
            res.send(items);
        });
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});