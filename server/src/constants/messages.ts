export const USERS_MESSAGES = {
  // ==================== LỖI VALIDATION CHUNG ====================
  VALIDATION_ERROR: 'Validation error',

  // ==================== HỌ VÀ TÊN ====================
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',

  // ==================== EMAIL ====================
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_INCORRECT: 'Email is incorrect',

  // ==================== MẬT KHẨU ====================
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  PASSWORD_IS_INCORRECT: 'Password is incorrect',

  // ==================== XÁC NHẬN MẬT KHẨU ====================
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_MATCH_PASSWORD: 'Confirm password must match password',

  // ==================== NGÀY SINH ====================
  DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be a valid ISO8601 date',

  // ==================== ĐĂNG KÝ / ĐĂNG NHẬP / ĐĂNG XUẤT ====================
  REGISTER_SUCCESS: 'Register success',
  LOGIN_SUCCESS: 'Login success',
  LOGOUT_SUCCESS: 'Logout success',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_VERIFIED: 'User not verified',

  // ==================== TOKENS (ACCESS & REFRESH) ====================
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',

  // ==================== XÁC THỰC EMAIL ====================
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  EMAIL_VERIFY_RESEND_SUCCESS: 'Email verify resend success',

  // ==================== QUÊN & ĐỔI MẬT KHẨU ====================
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check your email to reset your password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  NEW_PASSWORD_MUST_BE_DIFFERENT: 'The new password must be different from the old password',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',

  // ==================== GOOGLE OAUTH ====================
  GOOGLE_CREDENTIALS_NOT_PROVIDED: 'Google credentials not provided',
  GOOGLE_ID_TOKEN_INVALID: 'Invalid Google ID token',
  GOOGLE_EMAIL_UNAVAILABLE: 'Google account email is unavailable',
  GOOGLE_EMAIL_NOT_VERIFIED: 'Google email not verified',

  // ==================== HỒ SƠ NGƯỜI DÙNG (PROFILE) ====================
  GET_ME_SUCCESS: 'Get me success',
  UPDATE_ME_SUCCESS: 'Update me success',
  GET_PROFILE_SUCCESS: 'Get profile success',

  // Username
  USERNAME_MUST_BE_STRING: 'Username must be a string',
  USERNAME_INVALID:
    'Username must be 5 to 20 characters long, start with a letter, contain only letters, numbers and dots, and cannot have consecutive dots',
  USERNAME_ALREADY_EXISTS: 'Username already exists',

  // Bio, Location, Website, Avatar
  BIO_MUST_BE_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be from 0 to 200',
  LOCATION_MUST_BE_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be from 0 to 200',
  WEBSITE_MUST_BE_STRING: 'Website must be a string',
  WEBSITE_LENGTH: 'Website length must be from 0 to 200',
  IMAGE_MUST_BE_STRING: 'Image must be a string',
  IMAGE_LENGTH: 'Image length must be from 0 to 400',

  // ==================== THEO DÕI (FOLLOW / UNFOLLOW) ====================
  FOLLOW_SUCCESS: 'Follow success',
  INVALID_USER_ID: 'Invalid followed user id',
  FOLLOWED: 'Followed',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success'
} as const

export const MEDIAS_MESSAGES = {
  FILE_IS_REQUIRED: 'Image is required and must be a valid image file',
  UPLOAD_IMAGE_SUCCESSFULLY: 'Upload image successfully',
  IMAGE_NOT_FOUND: 'Image not found',
  UPLOAD_VIDEO_SUCCESSFULLY: 'Upload video successfully',
  VIDEO_NOT_FOUND: 'Video not found',
  VIDEO_IS_REQUIRED: 'Video is required and must be a valid video file'
} as const
