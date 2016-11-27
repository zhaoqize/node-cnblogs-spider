var toMarkdown = require('to-markdown');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var Promise = require('bluebird')

//爬取href
function requestPromise(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        })

    })
}

function getHref(result) {
    var $ = cheerio.load(result);
    var domArry = $('#content .post h2 a');
    var hrefArry = [];
    for (var i = 0; i < domArry.length; i++) {
        hrefArry.push(domArry[i].attribs.href)
    }
    return hrefArry;
}

//Promise all([promise,promise,promise,]) 数组全部执行且无序
//Promise some() 
//Promise any()
//Promise map(array,callback,{concurrency:int}) 数组全部执行且无序,参数concurrency设置并发数
//Promise each() 和Promise.mapSeries方法类似，都是顺序执行
//Promise mapSeries()  和Promise.map类似，只不过是顺序执行的
function getArticle(urls) {
    Promise.map(urls, function(item, index, length) {
            var streamWrite;

            requestPromise(item)
                .then(function(result) {
                    var $ = cheerio.load(result);
                    return {
                        title: $('#cb_post_title_url').text(),
                        body: $('#cnblogs_post_body').toString(),
                        time: $('#post-date').toString(),
                        mdtime: $('#post-date').text()
                    };
                })
                .then(function(result) {
                		console.log('['+ index +']  ['+result.title+']')
                		//注意文件名
                        streamWrite = fs.createWriteStream('./Articles/' + (result.title).replace(/(》|《|\s|“|”|"|<|>)/g,'') + '.md');
                    var str = toMarkdown(result.body, {
                        converters: [{
                            filter: ['span', 'div', 'pre', 'code', 'hr'],
                            replacement: function(content, node) {
                                if ((node.tagName).toLowerCase() === 'code') {
                                    return '```js' + content + '```'
                                }
                                return content;
                            }
                        }]
                    })
                    var mdTitle = '---' +
                        'title: ' + result.title +
                        'data: ' + result.mdtime +
                        'tags: 原创' +
                        '---'; streamWrite.write(mdTitle + str)
                       
                })
        .catch(function(err) {
            console.log(err);
        })


    })
}

function getAllArticles(url) {
    for (var i = url.length - 1; i >= 0; i--) {
        requestPromise(url[i])
            .then(function(result) {
                return getHref(result);
            })
            .then(function(result) {
                getArticle(result)
            })
            .catch(function(err) {
                console.log(err);
            })
    }

}

getAllArticles([
    'http://www.cnblogs.com/zqzjs/default.html?page=1',
    'http://www.cnblogs.com/zqzjs/default.html?page=2',
    'http://www.cnblogs.com/zqzjs/default.html?page=3',
    'http://www.cnblogs.com/zqzjs/default.html?page=4',
    'http://www.cnblogs.com/zqzjs/default.html?page=5',
    'http://www.cnblogs.com/zqzjs/default.html?page=6',
    'http://www.cnblogs.com/zqzjs/default.html?page=7',
])

//错误处理
process.on('error',function(err){
	console.error('[error]',err);
})
process.on('exit',function(err){
	console.log('[exit]',err);
})
process.on('uncaughtException',function(err){
	console.warn('[uncaughtException]',err);
})