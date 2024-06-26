/**
 * Array of routes accessible to public
 * doesn't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];
/**
 * Array of routes not accessible to public
 * does require authentication
 * @type {string[]}
 */
export const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auht/error",
	"/auth/reset",
	"/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes starting with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
