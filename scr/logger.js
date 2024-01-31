const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }),
    new transports.File({ filename: 'app.log', level: 'info' }) // Archivo de registro
  ]
});

module.exports = logger;
