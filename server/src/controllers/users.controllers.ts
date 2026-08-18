import { Request, Response, NextFunction } from 'express'
import usersService from '~/services/users.services'
import { RegisterBody } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'thienhuy.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login success'
    })
  }

  return res.status(400).json({
    error: 'Login failed'
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
      message: 'Register success',
      result
    })
  } catch (error) {
    next(error)
  }
}
