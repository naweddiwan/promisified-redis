# promisified-redis
The redis npm package doesn't support promises out of the box for Node js. As of writing this file, redis is planning to support promises in v4. 

Currently we have to wrap the methods we want to use with promises using the built-in Node.js util.promisify method, but that also works on node version greater than or equal to  8;

I ran into a situation where I had a node application running on node version 5.5.0 and I hate callbacks.
So after a bit of tinkering I found something that worked for me. I have tested it with node version 5.5.0.
I used a third party library called  `bluebird` to achieve this. 

What I did is I wrapped all the default callback functions of redis using this `promisify` method of this library.

```javascript
const Promise = require('bluebird');
const client = require('redis').createClient();

client.on('connect',  function(err) {
    console.log('REDIS CONNECTED!')
});

function redisGetCallback(key, callback){
    client.get(key, function(err, res){  
        if(err) {
            return callback(err);
        }
        return callback(null, res);
    });
}

const promisifiedRedisGet = Promise.promisify(redisGetCallback);
module.exports.promisifiedRedisGet = promisifiedRedisGet;

```

Note: I have added functions that I needed, you can add any function in the similar manner.

## Running this repo on your machine
1. Install redis and start the redis-server.
2. Install the node modules. Command: `npm install`
3. Run the index.js file. Command: `npm start`
