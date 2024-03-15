import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/user/user.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// using cors

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', userRouter)

app.use(globalErrorHandler)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
