var rewire = require('rewire')
var expect = require('chai').expect;
var ncs = rewire('../lib/node-cnblogs-spider.js')
var requestPromise = ncs.__get__('requestPromise');

//可以设置超时的问题
describe('node-cnblogs-spider',function(){
  //设置该测试下的全部用例的超时时间
  //this.timeout(500)
  it('请求cnblog文章',function(done){
  //设置单个用例的超时时间
  //this.timeout(500)
  requestPromise('http://www.cnblogs.com/zqzjs/default.html?page=1')
	.then(function(result){
    	expect(result).to.be.not.equal(null);
	  	done();
	})
    .catch(function(err){
         done(err);
    })
 })
})
