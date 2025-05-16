#!/usr/bin/env node

import { Command } from "commander"
import start from "./commands/server.js"
import clearCache from "./commands/clearCache.js"

const program = new Command()

program
    .name("caching-proxy")
    .description("this server caches responses from the origin server to facilitate faster response")
    .version("1.0.0")

start(program)
clearCache(program)

program.parse(process.argv)