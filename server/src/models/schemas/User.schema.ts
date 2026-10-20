import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

export interface UserType {
  _id?: ObjectId
  // 1. Tài khoản & Đăng nhập
  email: string
  password: string
  username?: string
  google_id?: string

  // 2. Thông tin cá nhân
  name: string
  date_of_birth: Date
  bio?: string
  location?: string
  website?: string
  avatar?: string
  cover_photo?: string

  // 3. Trạng thái xác thực & Token
  verify?: UserVerifyStatus
  email_verify_token?: string
  forgot_password_token?: string

  // 4. Thời gian hệ thống
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  // 1. Tài khoản & Đăng nhập
  email: string
  password: string
  username: string
  google_id: string

  // 2. Thông tin cá nhân
  name: string
  date_of_birth: Date
  bio: string
  location: string
  website: string
  avatar: string
  cover_photo: string

  // 3. Trạng thái xác thực & Token
  verify: UserVerifyStatus
  email_verify_token: string
  forgot_password_token: string

  // 4. Thời gian hệ thống
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id

    // 1. Tài khoản & Đăng nhập
    this.email = user.email
    this.password = user.password
    this.username = user.username || ''
    this.google_id = user.google_id || ''

    // 2. Thông tin cá nhân
    this.name = user.name || ''
    this.date_of_birth = user.date_of_birth || date
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''

    // 3. Trạng thái xác thực & Token
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''

    // 4. Thời gian hệ thống
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
