let config = {}

config.port = 8080
config.ssl_port = 10443
config.domain = "example.com"
config.log_level = "debug"
config.ssl_server = 'https://acme-staging-v02.api.letsencrypt.org/directory'

module.exports = config