/*
=================================
AUTH SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  emailLoginURL,
  forgotPasswordURL,
  googleSignupURL,
  login2faURL,
  patchRequest,
  postRequest,
  resendVerifyEmailURL,
  resetPasswordURL,
  signupURL,
  verifyEmailURL
} from "api";
import { loginData, resetPasswordData } from "types/auth";

interface signupData {
  email: string;
  password: string;
  recaptcha: string;
}

/**
 * Signup service
 * @param data - An object containing the signup information including email, password, and recaptcha token
 * @returns axios promise
 */

export const signupService = (data: signupData) => {
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
export const emailLoginService = (data: loginData) => {
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
 * @param data - An object containing new password and confirm password, token query.
 * @returns axios promise
 */
export const resetPasswordService = (data: resetPasswordData, token: string | null) => {
  return axiosInstanceUnauth.post(`${resetPasswordURL()}?token=${token}`, data);
};

/**
 * Reset password service
 * @param data - An object containing code of type string for sign up.
 * @returns axios promise
 */
export const googleSignupService = (data: { code: string }) => {
  return axiosInstanceUnauth.post(googleSignupURL(), data);
};
