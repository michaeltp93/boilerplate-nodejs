import app from './app';
import { PORT } from './config';
import { AppLogger } from './infra/logger';

app.listen(PORT)
	.on('listening', () => AppLogger.info('server.ts', `🏃‍♂️ Server is running on PORT: ${PORT} 🚀 `))
	.on('error', (err: Error) => {
		AppLogger.error('Error', err.message);
		process.exit(1);
	});
