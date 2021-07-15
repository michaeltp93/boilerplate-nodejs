import app from './app';
import { PORT } from './config';

app.listen(PORT)
	.on('listening', () => console.log(`🏃‍♂️ Server is running on PORT: ${PORT} 🚀 `))
	.on('error', (err: Error) => {
		console.log(err);
		process.exit(1);
	});
