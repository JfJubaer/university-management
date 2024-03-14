import { Request, Response } from 'express'
import studentService from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    // const { user } = req.body
    const result = studentService.createStudent({
      role: 'student',
      id: '2',
      password: 'string',
    })
    res.send(result)
  } catch (error) {
    res.status(400)
  }
}

export default {
  createUser,
}
