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
 * Reset password URL
 *
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
