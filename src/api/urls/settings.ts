/*
=================================
SETTINGS URLS
=================================
*/

const prefix = "/settings/acc";

/* 
SECURITY URLS
*/

/**
 * Change password URL
 * @returns url string
 *
 */
export const changePasswordProfileURL = () => `${prefix}/change-password`;

/**
 * Send 2fa code URL
 * @returns url string
 *
 */
export const send2faCodeURL = () => `${prefix}/send-2fa-code`;

/**
 * Toggle 2fa status URL
 * @returns url string
 *
 */
export const toggle2faStatusURL = () => `${prefix}/toggle-2fa`;

/**
 * Fetch login history URL
 * @returns url string
 *
 */
export const fetchLoginHistoryURL = ({ page, limit }) =>
  `${prefix}/login-history?page=${page}&limit=${limit}`;
