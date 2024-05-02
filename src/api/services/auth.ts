/*
=================================
AUTH SERVICES
=================================
*/

import { axiosInstanceUnauth, googleLoginURL, googleSignupURL, signupURL } from "api";

interface signupData {
  email: string;
  password: string;
  recaptcha: string;
}

/**
 * Signup service
 * @returns axios promise
 */

export const signupService = (data: signupData) => {
  return axiosInstanceUnauth.post(signupURL(), data);
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
 * Google Sign up service
 * @param data - An object containing the code of type string
 * @returns axios promise
 */
export const googleSignupService = (data: { code: string }) => {
  return axiosInstanceUnauth.post(googleSignupURL(), data);
};
