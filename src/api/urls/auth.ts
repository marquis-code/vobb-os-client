/*
=================================
AUTH URLS
=================================
*/
import { forgotPasswordParams } from "types";

/**
 * Signup URL
 *
 * @returns url string
 *
 */
export const signupURL = () => `/auth/register`;

/**
 * Verify Email URL
 *
 * @returns url string
 *
 */
export const verifyEmailURL = () => `/auth/verify`;

/**
 * Resend Verify email URL
 *
 * @returns url string
 *
 */
export const resendVerifyEmailURL = () => `/auth/resend`;

/**
 * Email login URL
 *
 * @returns url string
 *
 */
export const emailLoginURL = () => `/auth/login`;

/**
 * 2fa login URL
 *
 * @returns url string
 *
 */
export const login2faURL = () => `/auth/2fa/login`;

/**
 * Forgot Password URL
 *
 * @returns url string
 *
 */
export const forgotPasswordURL = () => `/auth/forgot-password`;

/**
 * Forgot Password URL
 * @param token gotten from url params.
 * @param otp gotten from the url params.
 * @returns url string
 *
 */
export const forgotPasswordVerifyURL = ({ token, otp }: forgotPasswordParams) =>
  `/auth/forgot-password/verify?token=${token}&otp=${otp}`;

/**
 * Reset password URL
 * @returns url string
 *
 */
export const resetPasswordURL = () => `/auth/new-password`;

/**
 * Google sign up URL
 *
 * @returns url string
 *
 */
export const googleSignupURL = () => `/auth/google/register`;

/**
 * Refresh token URL
 *
 * @returns url string
 *
 */
export const refreshTokenURL = () => `/user/token/refresh`;
