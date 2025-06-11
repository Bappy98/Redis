const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});
// client.on('connect', () => {
//     console.log('Redis client connected to the server');
// });

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

async function testRedisConnection() {
    try {
        await client.connect()
        console.log('Redis client connected to the server');

        await client.set('key','value')

        const extractValue = await client.get('key')
        console.log(extractValue);

        const deleteCount = await client.del('key')
        console.log(deleteCount);
        const getValue = await client.get("key")
        console.log(getValue);

        await client.set('count',"100")
        const incrementCount = await client.incr('count')
        console.log(incrementCount);
        
    } catch (error) {
        console.error(`Redis client not connected to the server: ${error.message}`);
    } finally {
        client.quit();
    }
}

testRedisConnection();