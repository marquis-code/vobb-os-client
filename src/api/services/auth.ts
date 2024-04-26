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
interface loginEmailData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Signup service
 * @returns axios promise
 */

export const signupService = (data: signupData) => {
  return axiosInstanceUnauth.post(signupURL(), data);
};
export const verifyEmailService = (data: { token: number }) => {
  return patchRequest({
    url: verifyEmailURL(),
    data: data
  });
};
export const resendVerifyEmailService = (data: { email: string }) => {
  return patchRequest({
    url: resendVerifyEmailURL(),
    data: data
  });
};
