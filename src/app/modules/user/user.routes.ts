import express from 'express'
import studentController from './user.controller'

const router = express.Router()

router.post('/create-student', studentController.createUser)

export const userRoutes = router
