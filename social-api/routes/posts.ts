import express from "express";

export const router = express.Router();

import { prisma } from "../lib/prisma";

import { auth } from "../middlewares/auth";

router.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany({
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

router.get("/posts/:id", async (req, res) => {
	const id = req.params.id;
    
	const posts = await prisma.post.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			user: true,
			comments: {
				include: {
					user: true,
				},
			},
			likes: true,
		},
	});

	res.json(posts);
});

router.post("/posts", auth, async (req, res) => {
    const content = req.body?.content;
    if(!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    const id = res.locals.user.id as number;

    const post = await prisma.post.create({
        data: { content, userId: id }
    });

    res.status(201).json(post);
});

router.delete("/posts/:id", auth, async (req, res) => {
	const id = Number(req.params.id);
	const userId = res.locals.user.id as number;

	const post = await prisma.post.findFirst({ where: { id } });
	if (!post) {
		return res.status(404).json({ msg: "post not found" });
	}
	if (post.userId !== userId) {
		return res.status(403).json({ msg: "forbidden" });
	}

	await prisma.$transaction([
		prisma.like.deleteMany({ where: { postId: id } }),
		prisma.comment.deleteMany({ where: { postId: id } }),
		prisma.post.delete({ where: { id } }),
	]);

	res.json({ msg: "post deleted" });
});

router.post("/posts/:id/like", auth, async (req, res) => {
	const postId = Number(req.params.id);
	const userId = res.locals.user.id as number;

	const post = await prisma.post.findFirst({ where: { id: postId } });
	if (!post) {
		return res.status(404).json({ msg: "post not found" });
	}

	const existing = await prisma.like.findFirst({
		where: { userId, postId },
	});
	if (existing) {
		return res.status(400).json({ msg: "already liked" });
	}

	const like = await prisma.like.create({
		data: { userId, postId },
	});

	res.status(201).json(like);
});

router.delete("/posts/:id/like", auth, async (req, res) => {
	const postId = Number(req.params.id);
	const userId = res.locals.user.id as number;

	const like = await prisma.like.findFirst({
		where: { userId, postId },
	});
	if (!like) {
		return res.status(404).json({ msg: "like not found" });
	}

	await prisma.like.delete({ where: { id: like.id } });
	res.json({ msg: "unliked" });
});

router.post("/posts/:id/comments", auth, async (req, res) => {
	const postId = Number(req.params.id);
	const content = req.body?.content;
	if (!content) {
		return res.status(400).json({ msg: "content is required" });
	}

	const post = await prisma.post.findFirst({ where: { id: postId } });
	if (!post) {
		return res.status(404).json({ msg: "post not found" });
	}

	const userId = res.locals.user.id as number;
	const comment = await prisma.comment.create({
		data: { content, userId, postId },
		include: { user: true },
	});

	res.status(201).json(comment);
});

router.delete("/comments/:id", auth, async (req, res) => {
	const id = Number(req.params.id);
	const userId = res.locals.user.id as number;

	const comment = await prisma.comment.findFirst({ where: { id } });
	if (!comment) {
		return res.status(404).json({ msg: "comment not found" });
	}
	if (comment.userId !== userId) {
		return res.status(403).json({ msg: "forbidden" });
	}

	await prisma.comment.delete({ where: { id } });
	res.json({ msg: "comment deleted" });
});
