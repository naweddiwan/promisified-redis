const Promise   = require('bluebird');
const client    = require('redis').createClient();

client.on('connect',  function(err) {
    console.log('REDIS CONNECTED!')
    redisPromise.connected = true;
});
client.on('error',  function(err) {
    console.error('FAILED TO CONNECT WITH REDIS!')
    redisPromise.connected = false;
});

const redisPromise = {
    connected: false,
    get:    Promise.promisify(redisGetCallback),
    setex:  Promise.promisify(redisSetexCallback),
    ttl:    Promise.promisify(redisTTLCallback),
    incr:   Promise.promisify(redisIncrCallback)
};

function redisGetCallback(key, callback){
    client.get(key, function(err, res){  
        if(err) {
            return callback(err);
        }
        return callback(null, res);
    });
}
function redisSetexCallback(key, value, expirationTime, callback) {
    client.setex(key, expirationTime, value, function(err, res){
        if(err) {
            return callback(err);
        }
        return callback(null, res);
    });
}
function redisTTLCallback(key, callback){
    client.ttl(key, function(err, res){  
        if(err) {
            return callback(err);
        }
        return callback(null, res);
    });
}
function redisIncrCallback(key, callback){
    client.incr(key, function(err, res){  
        if(err) {
            return callback(err);
        }
        return callback(null, res);
    });
}
module.exports.redisPromise = redisPromise;