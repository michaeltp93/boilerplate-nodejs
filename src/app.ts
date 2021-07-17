import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';

import './alias-modules';
import { AppLogger } from './infra/logger';

class App {
	private _app: Application;

	constructor() {
		// Start the Application Logger
		AppLogger.configureLogger();
		// Configure Express Server - Middlewares
		this._app = express();
		this._app.use(json({ limit: '50mb' }));
		this._app.use(urlencoded({ limit: '50mb', extended: true }));
		this._app.use(cors());

		// Only producction middlewares
	}

	public get app(): Application {
		return this._app;
	}
}

export default new App().app;
