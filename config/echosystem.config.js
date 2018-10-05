let ecosystem = {}

ecosystem.apps = []

let unityx = {}
unityx.name = "unityx"
unityx.script = "src/server.js"
unityx.watch = true
unityx.ignore_watch = ["logs"]
// Dev Env
unityx.env = {}
unityx.env.NODE_ENV = "development"
unityx.env.NODE_PATH = "."
// Prod Env
unityx.env_production = {}
unityx.env_production.NODE_ENV = "production"
unityx.env_production.NODE_PATH = "."
ecosystem.apps.push(unityx)

module.exports = ecosystem