import 'express-async-errors';
import 'dotenv/config';

import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import { authRouter, gameRouter, userRouter } from './routes';
import './config/passport';
import notFoundMiddleware from './middlewares/not-found';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import { rateLimitRequests } from './middlewares/rateLimit.middleware';

export const createServer = (): Express => {
  const app = express();

  // Trust proxy (CRITICAL for Nginx reverse proxy)
  app.set('trust proxy', 1);

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Use env variable with fallback
        credentials: true, // Allow cookies and other credentials
      })
    )
    .use(
      session({
        secret: process.env.COOKIE_SECRET || 'secr3T',
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          domain:
            process.env.NODE_ENV === 'production'
              ? process.env.COOKIE_DOMAIN
              : undefined,
        },
        resave: false,
        saveUninitialized: false,
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    // Global lightweight rate limiter to protect endpoints
    .use(
      rateLimitRequests({
        windowMs: 60 * 1000,
        max: 300,
        message: 'Too many requests - global limit',
      })
    )
    .get('/health', (_, res) => {
      return res.status(StatusCodes.OK).json({ ok: true });
    })
    .use('/api/v1/auth', authRouter)
    .use('/api/v1/games', gameRouter)
    .use('/api/v1/user', userRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};
