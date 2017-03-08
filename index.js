var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

//简单爬虫，抓取cnode官网文章题目信息
app.get('/', function (req, res) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
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