export interface loginData {
  email: string;
  password: string;
  rememberMe: boolean;
  recaptcha: string;
}

export interface resetPasswordData {
  newPassword: string;
  confirmPassword: string;
}
