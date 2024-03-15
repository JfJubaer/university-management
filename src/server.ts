import app from './app'
import mongoose from 'mongoose'
import config from './config'
import { logger, errorlogger } from './shared/logger'

main().catch(err => console.log(err))

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🛢 Database connection successful`)
    app.listen(config.port, () => {
      logger.info(`Server is  listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error(`Failed to connect database`, err)
  }
}
