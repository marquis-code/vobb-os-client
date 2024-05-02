export interface loginData {
  email: string;
  password: string;
  rememberMe?: boolean;
  recaptcha: string;
}
export interface forgotPasswordParams {
  token: string | null;
  otp: string | null;
}
export interface resetPasswordData {
  newPassword: string;
  confirmPassword: string;
}
