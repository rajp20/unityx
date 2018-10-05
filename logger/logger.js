require('rootpath')();
const winston = require('winston')
const fs = require('fs')

const env = process.env.NODE_ENV;
const config = require(`config/${env}.config.js`)

module.exports = function (filename) {
  let log_level = config.log_level;

// check if directory exist
  if (!fs.existsSync(`logs`)) {
    fs.mkdirSync(`logs`); // create new directory
  }

// Set up logger
  const customColors = {
    trace: 'white',
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
  };

  let logger = new(winston.Logger)({
    colors: customColors,
    levels: {
      fatal: 0,
      crit: 1,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5
    },
    transports: [
      new(winston.transports.Console)({
        name: 'consoleLogger',
        level: log_level,
        colorize: true,
        timestamp: true
      }),
      new(winston.transports.File)({
        name: 'fileLogger',
        json: false,
        level: 'debug',
        filename: `logs/${filename}`,
        maxsize: 104857600 // 100 mb
      })
    ]
  });

  winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
  let origLog = logger.log;

  logger.log = function (level, msg) {
    if (msg instanceof Error) {
      var args = Array.prototype.slice.call(arguments);
      args[1] = msg.stack;
      origLog.apply(logger, args);
    } else {
      origLog.apply(logger, arguments);
    }
  };

  return logger;
};
