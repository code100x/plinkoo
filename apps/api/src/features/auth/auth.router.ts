import passport from 'passport';
import { hash } from 'bcrypt';
import db from '@repo/db';
import type { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@repo/common/types';
import { Router } from 'express';
import type { RequestHandler } from 'express';
import { BadRequestError } from '../../errors';
import { isAuthenticated } from '../../middlewares/auth.middleware';

interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

const router: Router = Router();

// Google authentication routes
router.get('/google', (req, res, next) => {
  try {
    // Get redirect URL from query parameter or use default
    const redirectUrl =
      (req.query.redirect_to as string) || process.env.CLIENT_URL;
    const state = JSON.stringify({ redirect: redirectUrl });

    console.log('Initiating Google OAuth with redirect:', redirectUrl);

    (
      passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: encodeURIComponent(state),
      }) as RequestHandler
    )(req, res, next);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    next(error);
  }
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}?error=auth_failed`,
  }) as RequestHandler,
  (req, res) => {
    try {
      console.log('Google authentication successful for user:', req.user);

      const state = req.query.state
        ? (JSON.parse(decodeURIComponent(req.query.state as string)) as {
            redirect?: string;
          })
        : {};

      const redirectUrl = state.redirect || `${process.env.CLIENT_URL}`;
      console.log('Redirecting to:', redirectUrl);

      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google callback processing error:', error);
      res.redirect(`${process.env.CLIENT_URL}?error=callback_failed`);
    }
  }
);

// // Local authentication routes
// router.post(
//   '/login',
//   passport.authenticate('local', {
//     failureRedirect: `${process.env.CLIENT_URL}/login`,
//   }) as RequestHandler,
//   (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}`);
//   }
// );

// router.post('/register', async (req, res) => {
//   const { email, password, name } = req.body as RegisterRequestBody;

//   const hashedPassword = await hash(password, 10);
//   const user = await db.user.upsert({
//     where: { email },
//     update: {
//       password: hashedPassword,
//       name,
//     },
//     create: {
//       email,
//       password: hashedPassword,
//       name,
//     },
//   });

//   req.login(user, err => {
//     if (err) throw new BadRequestError('Error logging in');
//     res.redirect(`${process.env.CLIENT_URL}`);
//   });
// });

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      console.log('Logout error:', err);
      return next(err);
    }

    // Destroy the session
    req.session.destroy(sessionErr => {
      if (sessionErr) {
        console.log('Session destroy error:', sessionErr);
        return next(sessionErr);
      }

      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      res.json({ message: 'Logged out successfully' });
    });
  });
});

router.get('/me', isAuthenticated, (req, res) => {
  const user = req.user as User;
  if (user.password) {
    const { password: _password, ...userWithoutPassword } = user;
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, userWithoutPassword));
  }
  return res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, user));
});

export default router;
