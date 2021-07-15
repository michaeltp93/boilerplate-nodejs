// Lazy loading for first verify environment
const initDotenv = () => require('dotenv');

if (process.env.NODE_ENV !== 'production') {
	const dotenv = initDotenv();
	const envFound = dotenv.config();

	if (envFound.error) throw new Error("⚠️ Couldn't find .env file ⚠️");
}

/**
 * Constants
 */

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
export const LOGS = {
	directory: 'logs',
	level: process.env.LOG_LEVEL || 'silly'
};
export const API = {
	prefix: '/api/v1/inventory'
};
