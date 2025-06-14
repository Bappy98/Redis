// pub/sub=>
    //-pullisher ->send ->channel ->subcriber will recieve the message


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
        await client.connect()

        const subcriber = client.duplicate()
        await subcriber.connect()

        await subcriber.subscribe('dummy',(message,channel)=>{
            console.log(`Received message from ${channel} : ${message}`);
            
        })

        
        await client.publish('dummy','some dummy data') 
        await client.publish('dummy','some dummy new data') 

        await new Promise((resolve)=>setTimeout(resolve,1000))
        await subcriber.unsubscribe('dummy')
        await subcriber.quit()

        //pipelining & transactions

        const multi = client.multi()

        multi.set('transaction1','1')
        multi.set('transaction2','2')

        multi.get('transaction1')
        multi.get('transaction2')

        const result = await multi.exec()
        console.log(result);

        
        

    } catch (error) {
        console.error(`Redis client not connected to the server: ${error.message}`); 
    } finally {
        client.quit();
    }
}

testRedisConnection();