import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import db from '@repo/db';
import type { User } from '@prisma/client';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `${process.env.API_BASE_URL || 'http://localhost:5000'}/api/v1/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      const profileInfo = {
        googleId: profile.id,
        name: profile.displayName,
        picture: profile.photos?.[0].value || null,
      };

      try {
        console.log('Processing Google profile:', {
          id: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
        });

        const email = profile.emails?.[0].value;
        if (!email) {
          console.error('No email provided by Google OAuth');
          return done(new Error('No email provided by Google'), undefined);
        }

        // Find the user by email
        let user = await db.user.findFirst({
          where: { email },
        });
        
        if (!user) {
          console.log('Creating new user for email:', email);
          user = await db.user.create({
            data: {
              ...profileInfo,
              email,
            },
          });
        } else {
          console.log('Updating existing user:', user.id);
          user = await db.user.update({
            where: { id: user.id },
            data: profileInfo,
          });
        }

        console.log('User authentication successful:', user.id);
        done(null, user);
      } catch (err) {
        console.error('Google OAuth processing error:', err);
        done(err, undefined);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !(await compare(password, user.password || ''))) {
          done(null, false, { message: 'Invalid email or password' });
          return;
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
