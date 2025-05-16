import axios from "axios";
import { getCache, setCache } from "../redis.js";

export default (origin) => {
    return async (req, res) => {
        console.log("reached middleware")
        const key = `${origin}${req.originalUrl}`;
        const cachedResponse = await getCache(key)

        if (cachedResponse) {
            res.set("X-Cache", "Hit")
            console.log(cachedResponse, "HIT")
            return res.send(cachedResponse)
        }

        try {
            const response = await axios.get(key)
            const result = {
                data: response.data,
                headers: response.headers
            }
            await setCache(key, JSON.stringify(result))
            res.set("X-Cache", "Miss")
            console.log(result)
            return res.send(result)
        } catch (err) {
            console.error("error while fetching from origin server", err)
            return res.status(500).send("Internal Server Error")
        }
    }
}