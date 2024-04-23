/*
=================================
AUTH SERVICES
=================================
*/

import { axiosInstanceUnauth, signupURL } from "api";

interface signupData {
  email: string;
  password: string;
}
/**
 * Signup service
 * @returns axios promise
 */

export const signupService = (data: signupData) => {
  return axiosInstanceUnauth.post(signupURL(), data);
};
