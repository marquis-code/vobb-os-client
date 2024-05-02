/*
=================================
AUTH URLS
=================================
*/

/**
 * Signup URL
 *
 * @returns url string
 *
 */

export const signupURL = () => `auth/register`;
export const verifyEmailURL = `auth/verify`;
export const resendVerifyEmailURL = `auth/resend`;

/**
 * Google login URL
 *
 * @returns url string
 *
 */
export const googleLoginURL = () => `/auth/google/login`;
