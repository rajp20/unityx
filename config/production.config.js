let config = {}

config.port = 80
config.ssl_port = 443
config.domain = "unityx.io"
config.log_level = "debug"
config.ssl_server = 'https://acme-v02.api.letsencrypt.org/directory'

module.exports = config