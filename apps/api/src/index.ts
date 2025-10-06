import { createServer } from './server';
import db from '@repo/db';

const port = process.env.PORT || 5000;
const app = createServer();

const server = app.listen(port);

const gracefulShutdown = async () => {
  server.close(async () => {
    await db.$disconnect();
    process.exit();
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
