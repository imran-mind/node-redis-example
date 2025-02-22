const redis = require('redis');

const redisClient = redis.createClient({
    password: 'GUKa20ZEUy0JqpzGSO75dYy5weRftxzx',
    socket: {
        host: 'redis-18888.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18888
    }
});

(async () => {
    try {
        await redisClient.connect();
        redisClient.on('error', (err) => {
            console.error('Redis connection error: ', err);
        })
        console.log('Redis connected...');
    } catch (err) {
        console.log('Error while connecting redis', err);
    }
})()

module.exports = redisClient;
