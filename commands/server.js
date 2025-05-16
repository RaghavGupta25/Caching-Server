import express from "express"
import responseMiddleware from "../middleware/responseMiddleware.js"

export default (program) => {
  program
    .command("start")
    .description("start the caching server")
    .option(
      "--port <port-number>",
      "",
      "3000"
    )
    .requiredOption(
      "--origin <origin>",
      "state the url you want to access",
    )
    .action(async (options) => {
      const port = Number(options.port)
      const origin = options.origin

      const app = express()
      app.use(responseMiddleware(origin))
      app.listen(port, async () => {
        console.log("caching server enabled")
      })
    })
}