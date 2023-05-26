import passport from "passport";
import passportJwt from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../db/user";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET,
		},
		async (payload, done) => {
			const user = await getUser(payload.email);
			if (user) return done(null, user);
			return done(null, false);
		}
	)
);
