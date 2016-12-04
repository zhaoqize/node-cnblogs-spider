## rewire模块配合mocha进行单元测试
## chai断言API
### githubAPI
ok: asserts that the value is truthy or not
```
expect(1).to.be.ok();
expect(true).to.be.ok();
expect({}).to.be.ok();
expect(0).to.not.be.ok();
```
be / equal: asserts === equality
```
expect(1).to.be(1)
expect(NaN).not.to.equal(NaN);
expect(1).not.to.be(true)
expect('1').to.not.be(1);
```
eql: asserts loose equality that works with objects
```
expect({ a: 'b' }).to.eql({ a: 'b' });
expect(1).to.eql('1');
```
a/an: asserts typeof with support for array type and instanceof
```
// typeof with optional `array`
expect(5).to.be.a('number');
expect([]).to.be.an('array');  // works
expect([]).to.be.an('object'); // works too, since it uses `typeof`

// constructors
expect([]).to.be.an(Array);
expect(tobi).to.be.a(Ferret);
expect(person).to.be.a(Mammal);
```

match: asserts String regular expression match
```
expect(program.version).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
```

contain: asserts indexOf for an array or string
```
expect([1, 2]).to.contain(1);
expect('hello world').to.contain('world');
```

length: asserts array .length
```
expect([]).to.have.length(0);
expect([1,2,3]).to.have.length(3);
```

empty: asserts that an array is empty or not

```
expect([]).to.be.empty();
expect({}).to.be.empty();
expect({ length: 0, duck: 'typing' }).to.be.empty();
expect({ my: 'object' }).to.not.be.empty();
expect([1,2,3]).to.not.be.empty();
```

property: asserts presence of an own property (and value optionally)

```
expect(window).to.have.property('expect')
expect(window).to.have.property('expect', expect)
expect({a: 'b'}).to.have.property('a');
```

key/keys: asserts the presence of a key. Supports the only modifier

```
expect({ a: 'b' }).to.have.key('a');
expect({ a: 'b', c: 'd' }).to.only.have.keys('a', 'c');
expect({ a: 'b', c: 'd' }).to.only.have.keys(['a', 'c']);
expect({ a: 'b', c: 'd' }).to.not.only.have.key('a');
```

throw/throwException/throwError: asserts that the Function throws or not when called

```
expect(fn).to.throw(); // synonym of throwException
expect(fn).to.throwError(); // synonym of throwException
expect(fn).to.throwException(function (e) { // get the exception object
  expect(e).to.be.a(SyntaxError);
});
expect(fn).to.throwException(/matches the exception message/);
expect(fn2).to.not.throwException();
```

withArgs: creates anonymous function to call fn with arguments

```
expect(fn).withArgs(invalid, arg).to.throwException();
expect(fn).withArgs(valid, arg).to.not.throwException();
```

within: asserts a number within a range

```
expect(1).to.be.within(0, Infinity);
```

greaterThan/above: asserts >

```
expect(3).to.be.above(0);
expect(5).to.be.greaterThan(3);
```

lessThan/below: asserts <

```
expect(0).to.be.below(3);
expect(1).to.be.lessThan(3);
```

fail: explicitly forces failure.

```
expect().fail()
expect().fail("Custom failure message")
```

### 阮一峰API
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);

## mocha的异步测试
### 使用done
```js
 describe('#find()', function() {
    it('respond with matching records', function(done) {
        db.find({ name: 'harttle' })
            .then(function(user){
                expect(user.name).to.equal('harttle');
                done();
            })
            .catch(err => done(err));
    });
});
```

### 使用promise
```js
describe('#find()', function() {
    it('respond with matching records', function() {
        return db.find({ name: 'harttle' }).then(function(user){
            expect(user.name).to.equal('harttle');
        });
    });
});
```

### 使用chai-as-promised模块简化promise
```js
var chai = require('chai');
chai.use(require("chai-as-promised"));

describe('#find()', function() {
    it('respond with matching records', function() {
        return expect(db.find({ name: 'harttle' }))
            .to.eventually.have.property('name', 'harttle');
    });
    it('should be fulfilled', function(){
        return expect(db.remove('user')).to.eventually.be.fulfilled;
    });
});
```

