import winston from 'winston'
import Transports from 'winston-mongodb'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const env = process.env.LEVEL || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, status, payload }) => {
    // `${timestamp} ${level}: ${message}`

    let infoLog = `${timestamp} ${level}: ${message}`
    if (status) {
      infoLog += `| ${status}`
    }

    if (payload) {
      infoLog += `| response: ${payload}`
    }

    return infoLog
  })
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
  new Transports.MongoDB({
    level: level,
    db: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    collection: process.env.DB_LOGGER_COLLECTION,
    options: {
      useUnifiedTopology: true
    }
  })
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

export default logger
