/*
=================================
AUTH SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  patchRequest,
  resendVerifyEmailURL,
  signupURL,
  verifyEmailURL
} from "api";

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
