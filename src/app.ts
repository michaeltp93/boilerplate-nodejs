import 'reflect-metadata';
import express, { Application, json, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import compression from 'compression';

import './alias-modules';
import { AppLogger } from '@/infra/logger';
import { container, registerDependencies } from '@/infra/di';
import { APIRouter } from '@/infra/api';
import { API, ENVIRONMENT } from '@/config';
import { frameguard, hidePoweredBy, noSniff, xssFilter } from 'helmet';
import { loadEnv } from '@sap/xsenv';
import { notFound } from './infra/helpers';

class App {
	private _app: Application;
	private _apiRouter: APIRouter;

	constructor() {
		// Start the Application Logger
		AppLogger.configureLogger();
		// DI Configuration
		registerDependencies();
		// Start API Router
		this._apiRouter = new APIRouter(container);
		// Configure Express Server - Middlewares
		this._app = express();
		// Body Parser
		this._app.use(json({ limit: '50mb' }));
		this._app.use(urlencoded({ limit: '50mb', extended: true }));
		// CORS
		this._app.use(cors());

		// Only producction middlewares
		if (ENVIRONMENT === 'production') {
			// Compression
			this._app.use(compression());
			//Helmet
			this._app.use(xssFilter());
			this._app.use(noSniff());
			this._app.use(hidePoweredBy());
			this._app.use(frameguard({ action: 'deny' }));
		}
		// Get XSUAA Credentials
		loadEnv();

		// Load API Routes
		this._app.use(API.prefix, this._apiRouter.routes());

		// Home Backend Handler (TODO: redirect to home or documentation files)
		this._app.use('/', (_: Request, res: Response) => notFound(res));
		// API Default Handler
		this._app.use('/api', (_: Request, res: Response) => notFound(res));
		// Backend Default Handler
		this._app.use((_: Request, res: Response) => notFound(res));
	}

	public get app(): Application {
		return this._app;
	}
}

export default new App().app;
