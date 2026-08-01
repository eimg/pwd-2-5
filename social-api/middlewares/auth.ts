import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export async function auth(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) {
	const authorization = req.headers?.authorization;
	const token = authorization?.split(" ")[1];

	if (token) {
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string,
			) as { id: number; };

			if (decoded) {
				const user = await prisma.user.findFirst({
					where: { id: decoded.id, },
				});

				res.locals.user = user;
				return next();
			}
		} catch (e) {
			return res.status(401).json({ msg: "Invalid token" });
		}
	} else {
		return res.status(401).json({ msg: "Access token required" });
	}
}
