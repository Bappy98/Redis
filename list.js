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
        //lists ->LPush,rPush,lRange,lPop,rPop
        //await client.lPush("notes",['note 1','note 2','note 3'])
        const showList = await client.lRange('notes',0,-1)
        console.log(showList);

        const frisNote = await client.lPop('notes')
        console.log(frisNote);
        
        
    } catch (error) {
        console.error(`Redis client not connected to the server: ${error.message}`);
        
    } finally {
        client.quit();
    }
}

testRedisConnection();