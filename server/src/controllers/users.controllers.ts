import { Request, Response, NextFunction } from 'express'
import usersService from '~/services/users.services'
import { RegisterBody } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as any
  const user_id = user._id.toString()
  const result = await usersService.login(user_id)
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body)

    return res.json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}
