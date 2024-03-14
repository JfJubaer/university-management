import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudent = async (user: IUser): Promise<IUser | null> => {
  const id = await generateStudentId()
  user.id = id
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_st_pass as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to make a user')
  }
  return createdUser
}

export default {
  createStudent,
}
