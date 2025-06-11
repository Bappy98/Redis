const redis = require("redis")

const client = redis.createClient({
    host:"localhost",
    port:6379
})

client.on("error", (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
})

async function ds() {
    try {
        await client.connect()
        //string -> set, get, del,mset, mget
        await client.set("user:name", "John Doe")
        const data =  await client.get("user:name")
        console.log(data);
        await client.mSet(["user.name",'John Doe', 'user.age', '30'])
         const data1 = await client.mGet(["user.name", "user.age"])
        const [name, age] = await client.mGet(["user.name", "user.age"])
        console.log(data1);
        
        console.log(name,age);
        
    } catch (error) {
       console.log(error);
        
    } finally {
        client.quit();
    }
}

ds();