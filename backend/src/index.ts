import express from "express";
import { outcomes } from "./outcomes";
import cors from "cors";
import authRoute from './router/auth';
import plinkooRoute from './router/plinkoo'
import session from 'express-session';
import dotenv from "dotenv";
import passport from "passport";
import {initPassport} from "./passport";

const app = express();

dotenv.config();
app.use(
    session({
        secret: process.env.COOKIE_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    }),
);

initPassport();
app.use(passport.initialize());
app.use(passport.authenticate('session'));

const allowedHosts = process.env.ALLOWED_HOSTS
    ? process.env.ALLOWED_HOSTS.split(',')
    : [];

app.use(
    cors({
        origin: allowedHosts,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    }),
);

app.use('/auth', authRoute);
app.use("/plinkoo", plinkooRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
