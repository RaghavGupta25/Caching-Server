import { createClient } from "redis";

const redisClient = createClient()

const connect = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
    } catch (err) {
        console.error("Could not connect to Redis", err)
    }
}

const disconnect = async () => {
    if (redisClient.isOpen) {
        try{
            await redisClient.disconnect()
        }catch(err){
            console.error("error while disconnecting", err)
        }
    }
}

export const setCache = async (key, data) => {
    await connect()
    try {
        await redisClient.set(key, data, {
            EX: 60 * 60
        })
    } catch(err){
        console.error("error in setting cache", err)
    }
    await disconnect()
}

export const getCache = async (key) => {
    await connect()
    const exist = await redisClient.exists(key)
    if(exist){
        try{
           const cachedResponse =  await redisClient.get(key)
           await disconnect()
           return cachedResponse
        } catch(err){
            console.error("error while retreiving cached value", err)
        }
    }
}

export const clearCache = async (key) => {
    await connect()
    try{
        if(key===undefined || null){
            await redisClient.flushAll();
        }else{
            await redisClient.del(key)
        }
    }catch(err){
        console.error("error in clearing cache", err)
    }
    await disconnect()
}