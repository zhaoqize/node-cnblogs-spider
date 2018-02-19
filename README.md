[![Build Status](https://travis-ci.org/zhaoqize/node-cnblogs-spider.svg?branch=master)](https://travis-ci.org/zhaoqize/node-cnblogs-spider)
[![GitHub license](https://img.shields.io/github/license/zhaoqize/weex-cnode.svg)](https://github.com/zhaoqize/weex-cnode/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![Travis](https://img.shields.io/badge/oschina-%E6%94%B6%E5%BD%95-orange.svg)](https://www.oschina.net/search?scope=project&q=node-cnblogs-spider)

[![NPM](https://nodei.co/npm/node-cnblogs-spider.png?downloads=true)](https://nodei.co/npm/node-cnblogs-spider/)

## spider_cnblogs
spider_cnblogs 是专门爬取博客园的文章并自动将文章转成 `.md` 存储至本地的爬虫。


## 示例
![image](http://images.cnblogs.com/cnblogs_com/zqzjs/885846/o_2016-11-27_171319.png)

## 使用
```js
var request = require('request');
var toMarkdown = require('to-markdown');
var cheerio = require('cheerio');
var Promise = require('bluebird')
```

## 依赖
[to-markdown]() 将`html`转`md`

[cheerio]() 类似于`Sizzle`的`nodejs`的实现

[bluebird]() 是对`es6`种`Promise`方法的封装与`ose`展库


## 文档
- [[译] NodeJS 错误处理最佳实践](https://segmentfault.com/a/1190000002741935)
- [Nodejs异步异常处理domain](http://blog.fens.me/nodejs-core-domain/)
- 使用Promise尽量脱离回调地狱，使得代码可读性更高
- html转md格式的包还是有缺陷的,不然完美展现出`.md`
- 生成本地文件使用的是stream实现，效率更高。但是要注意文件的命名规范。

## License
MIT
