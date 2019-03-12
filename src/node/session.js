"use strict"

module.exports = (RedisClient, RedisStore) => {

    // Redis store options
    const redisStoreOptions = {
        client: RedisClient,
        logErrors: true,
    }

    // Session options
    return {
        store: new RedisStore(redisStoreOptions),
        secret: 'crudinthemudtakingathud', 
        saveUninitialized: true,
        rolling: true,
        resave: true,
        cookie  : {
            maxAge: 1000 * 60 * 60 * 1, // 1 hour
        },
    } 
}



