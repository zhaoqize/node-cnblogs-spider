[![Build Status](https://travis-ci.org/zhaoqize/node-cnblogs-spider.svg?branch=master)](https://travis-ci.org/zhaoqize/node-cnblogs-spider)

[![NPM](https://nodei.co/npm/node-cnblogs-spider.png?downloads=true)](https://nodei.co/npm/node-cnblogs-spider/)

## spider_cnblogs
用来爬取博客园的文章
并将文章转成.md存储至本地

## 使用的轮子

```js
var request = require('request');
var toMarkdown = require('to-markdown');
var cheerio = require('cheerio');
var Promise = require('bluebird')
```
to-markdown用来将html转md的轮子

cheerio类似于Sizzle的nodejs的实现

bluebird是对es6种Promise方法的封装与ose展库

## nodejs的异常与错误处理需要注意
这两篇文章值得一看:

[[译] NodeJS 错误处理最佳实践](https://segmentfault.com/a/1190000002741935)

[Nodejs异步异常处理domain](http://blog.fens.me/nodejs-core-domain/)

## 注意点
使用Promise尽量脱离回调地狱，使得代码可读性更高

html转md格式的轮子还是有缺陷的,不然完美展现出.md

生成本地文件使用的是stream实现，效率更高。但是要注意文件的命名规范。

## 截图 
![image](http://images.cnblogs.com/cnblogs_com/zqzjs/885846/o_2016-11-27_171319.png)
