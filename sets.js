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
        //sets -> SAdd, SCard, SRem, SMembers, SIsMember
       // await client.sAdd('users', ['user1', 'user2', 'user3', 'user4', 'user5']);

        //const showUsers = await client.sMembers('users');
        //console.log(showUsers);

       // const userCount = await client.sCard('users');
       // console.log(userCount);

       // const isMember = await client.sIsMember('users', 'user1');
       // console.log(isMember);

       // const removeUser = await client.sRem('users', 'user1');
       // console.log(removeUser);

        //sorted set -> zAdd, zCard, zRange, zScore, zRem
        await client.zAdd('user', [
            { score: 100, value: 'user1' },
            { score: 2, value: 'user2' },
            { score: 31, value: 'user3' },
            { score: 4, value: 'user4' },
            { score: 5, value: 'user5' }
        ]);

        const getTopUsers = await client.zRange('user', 0, -1);
        console.log(getTopUsers);

        const userScore = await client.zRangeWithScores('user',0,-1);
        console.log(userScore);

        const userRank = await client.zRank('user', 'user1');
        console.log(userRank);
    } catch (error) {
        console.error(`Redis client not connected to the server: ${error.message}`);
    } finally {
        client.quit();
    }
}

testRedisConnection();