const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

async function testRedisConnection() {
    try {
        await client.connect();
        //hashes -> hSet, hGet, hDel, hMGet, hMSet, hKeys, hVals, hGetAll, hExists, hLen, hIncrBy, hIncrByFloat

        await client.hSet('product1', {
            name: 'Laptop',
            price: 1000,
            quantity: 10
        })

        const product = await client.hGetAll('product1');
        console.log(product);

        const getPrice = await client.hGet('product1', 'price');
        console.log(getPrice);

        const quantity = await client.hIncrBy('product1', 'quantity', 5);
        console.log(quantity);

    } catch (error) {
        console.error(`Redis client not connected to the server: ${error.message}`);
    } finally {
        client.quit();
    }
}

testRedisConnection();