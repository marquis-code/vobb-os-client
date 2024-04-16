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
 * login service
 * @returns axios promise
 */

export const loginService = (data: signupData) => {
  return axiosInstanceUnauth.post(signupURL(), data);
};
