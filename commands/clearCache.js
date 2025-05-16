import { clearCache } from "../redis.js"

export default(program) => {
    program
        .command("clear-cache")
        .option(
            "--key [key]",
            "delete a specific record",
        )
        .action(async (options) =>{
            const key = options.key
            await clearCache(key)
            console.log("cache cleared")
        })
}
