import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = express.Router();

import { prisma } from "../lib/prisma";
import { auth } from "../middlewares/auth";

router.post("/login", async (req, res) => {
	const username = req.body?.username;
	const password = req.body?.password;

	if (!username || !password) {
		return res
			.status(400)
			.json({ msg: "username and password are required" });
	}

	const user = await prisma.user.findFirst({
		where: { username },
	});

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET as string,
			);

			return res.json({ user, token });
		}
	}

    res.status(401).json({ msg: "unable to login" });
});

router.get("/verify", auth, async (req, res) => {
    const user = res.locals.user;
    res.json(user);
});

router.get("/users", auth, async (req, res) => {
	const users = await prisma.user.findMany();

	res.json(users);
});

router.get("/users/:id/posts", async (req, res) => {
	const userId = Number(req.params.id);
	if (!userId) {
		return res.status(400).json({ msg: "invalid user id" });
	}

	const posts = await prisma.post.findMany({
		where: { userId },
		take: 20,
		orderBy: { id: "desc" },
		include: {
			user: true,
			comments: true,
			likes: true,
		},
	});

	res.json(posts);
});

// curl -X POST localhost:8800/users -d "name=Eve&username=eve&password=password"
router.post("/users", async (req, res) => {
	const name = req.body?.name;
	const username = req.body?.username;
	const bio = req.body?.bio;
	const password = req.body?.password;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password are required" });
	}

	try {
		const hash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name,
				username,
				bio,
				password: hash,
			},
		});

		res.status(201).json(user);
	} catch (e) {
		res.status(500).json({ msg: "unable to create user" });
	}
});
