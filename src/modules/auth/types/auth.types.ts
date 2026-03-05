export interface SignUpData extends SignInData {
  name: string
}

export interface SignInData {
  email: string
  password: string
}

export interface RequestPasswordResetData {
  email: string
}

export interface ResetPasswordData {
  newPassword: string
  token: string
}

export interface ChangePasswordData {
  newPassword: string
  currentPassword: string
}
