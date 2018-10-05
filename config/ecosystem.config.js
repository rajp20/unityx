let ecosystem = {}

// APPS
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

// DEPLOY
ecosystem.deploy = {}
// Prod Deploy
production = {}
production.user = "rajpatel0820"
production.host = ["unityx.io"]
production.ref = "origin/master"
production.repo = "git@github.com:rajp20/unityx.git"
production.path = "/home/rajpatel0820/unityx"
production.ssh_options = "StrictHostKeyChecking=no"
production["pre-setup"] = "sudo npm i -g pm2 &&" +
    "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - &&" +
    "sudo apt-get install -y nodejs &&" +
    "sudo apt-get install -y build-essential &&" +
    "sudo apt-get install libcap2-bin &&" +
    "sudo setcap cap_net_bind_service=+ep `readlink -f which\ node`"
production["post-deploy"] = "npm i && pm2 startOrRestart config/ecosystem.config.js --env production"
production.env = {}
production.env.NODE_ENV = "production"
ecosystem.deploy.production = production

module.exports = ecosystem
