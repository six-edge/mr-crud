"use strict"

module.exports = RedisStore => {

    // Redis client options
    const redisOptions = {
        url: process.env.REDIS_URL,
        logErrors: true,
    }

    // Session options
    return {
        store: new RedisStore(redisOptions),
        secret: 'crudinthemudtakingathud', 
        saveUninitialized: true,
        rolling: true,
        resave: true,
        cookie  : {
            maxAge: 1000 * 60 * 60 * 1, // 1 hour
        },
    } 
}



