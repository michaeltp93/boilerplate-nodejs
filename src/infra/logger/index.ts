import { createLogger, transports, Logger, format } from 'winston';
//@ts-ignore
import cfLogging from 'cf-nodejs-logging-support';
import { LOGS, ENVIRONMENT } from '@/config';

export class AppLogger {
	private static logger: Logger;
	private static logDirectory = LOGS.directory;

	private static SetLogger() {
		const logLevels = {
			error: 0,
			warn: 1,
			info: 2,
			debug: 3
		};

		const logFormat = format.printf(({ level, message, timestamp }) => {
			return `${timestamp} ${level}: ${message}`;
		});

		this.logger = createLogger({
			level: LOGS.level || 'info',
			levels: logLevels,
			format: format.combine(format.json(), format.timestamp(), logFormat),
			transports: [
				cfLogging.createWinstonTransport(),
				new transports.File({
					filename: `${AppLogger.logDirectory}/error.log`,
					level: 'error'
				}),
				new transports.File({
					filename: `${AppLogger.logDirectory}/info.log`,
					level: 'info'
				})
			],
			exitOnError: false
		});

		if (ENVIRONMENT !== 'production') {
			this.logger.add(new transports.Console());
		}
	}

	public static configureLogger(): void {
		this.SetLogger();
	}

	private static GetValue(name: string, value: string | Record<any, any>) {
		if (typeof value === 'string') {
			return `${name} - ${value}`;
		} else {
			return `${name} - ${JSON.stringify(value)}`;
		}
	}

	public static debug(name: string, value: string | Record<any, any>): void {
		this.logger.log('debug', this.GetValue(name, value));
	}

	public static error(name: string, value: string | Record<any, any>): void {
		this.logger.log('error', this.GetValue(name, value));
	}

	public static warn(name: string, value: string | Record<any, any>): void {
		this.logger.log('warn', this.GetValue(name, value));
	}

	public static info(name: string, value: string | Record<any, any>): void {
		this.logger.log('info', this.GetValue(name, value));
	}
}
