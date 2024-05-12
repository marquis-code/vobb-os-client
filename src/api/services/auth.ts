/*
=================================
AUTH SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  emailLoginURL,
  forgotPasswordURL,
  forgotPasswordVerifyURL,
  googleSignupURL,
  login2faURL,
  patchRequest,
  postRequest,
  resendVerifyEmailURL,
  resetPasswordURL,
  signupURL,
  verifyEmailURL,
  googleLoginURL
} from "api";

interface signupRequestBody {
  email: string;
  password: string;
  recaptcha: string;
}
interface emailLoginRequestBody {
  email: string;
  password: string;
  rememberMe?: boolean;
  recaptcha: string;
}
interface resetPasswordRequestBody {
  newPassword: string;
  confirmPassword: string;
}

/**
 * Signup service
 * @param data - An object containing the signup information including email, password, and recaptcha token
 * @returns axios promise
 */

export const signupService = (data: signupRequestBody) => {
  return axiosInstanceUnauth.post(signupURL(), data);
};

/**
 * Verify Email service
 * @param data - An object containing the verification token
 * @returns axios promise
 */
export const verifyEmailService = (data: { token: number }) => {
  return patchRequest({
    url: verifyEmailURL(),
    data: data
  });
};

/**
 * Resend Verification Email service
 * @param data - An object containing the email address to resend the verification email to
 * @returns axios promise
 */
export const resendVerifyEmailService = (data: { email: string }) => {
  return patchRequest({
    url: resendVerifyEmailURL(),
    data: data
  });
};

/**
 * Email login service
 * @param data -  An object containing the login information including email, password, and rememeberMe
 * @returns axios promise
 */
export const emailLoginService = (data: emailLoginRequestBody) => {
  return axiosInstanceUnauth.post(emailLoginURL(), data);
};

/**
 * 2fa login service
 * @param data - An object containing the otp sent to login email
 * @returns axios promise
 */
export const login2faService = (data: { otp: string }) => {
  return postRequest({
    url: login2faURL(),
    data: data
  });
};

/**
 * Forgot password service
 * @param data - An object containing the email to send otp to.
 * @returns axios promise
 */
export const forgotPasswordService = (data: { email: string }) => {
  return axiosInstanceUnauth.post(forgotPasswordURL(), data);
};

/**
 * Reset password service
 * @param token - token gotten from url.
 * @param otp - otp gotten from url.
 * @returns axios promise
 */
export const forgotPasswordVerifyService = ({ token, otp }) => {
  return axiosInstanceUnauth.post(forgotPasswordVerifyURL({ token, otp }));
};
/**
 * Reset password service
 * @param data - An object containing new password and confirm.
 * @returns axios promise
 */
export const resetPasswordService = (data: resetPasswordRequestBody) => {
  return postRequest({
    url: resetPasswordURL(),
    data: data
  });
};

/**
 * Google login service
 * @param data - An object containing the code of type string
 * @returns axios promise
 */
export const googleSigninService = (data: { code: string }) => {
  return axiosInstanceUnauth.post(googleLoginURL(), data);
};

/**
 * Reset password service
 * @param data - An object containing code of type string for sign up.
 * @returns axios promise
 */
export const googleSignupService = (data: { code: string }) => {
  return axiosInstanceUnauth.post(googleSignupURL(), data);
};
