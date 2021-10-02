const Promise = require('bluebird');
const redis = require('./redis').redisPromise;
function main(){
    Promise.coroutine(function*(){
        yield redis.setex('test_key', 'test_value', 1000);  
        const res = yield redis.get('test_key');
        console.log(res);
    })().catch(error => {
        console.error({ERROR: error.stack});
    })
}

main();