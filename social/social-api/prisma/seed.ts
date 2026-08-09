import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";

import bcrypt from "bcrypt";

async function seedUsers() {
    console.log("User seeding started...");

	await prisma.user.create({
		data: {
			name: "Alice",
			username: "alice",
			bio: "First user",
			password: await bcrypt.hash("password", 10),
		},
	});

	await prisma.user.create({
		data: {
			name: "Bob",
			username: "bob",
			bio: "Second user",
			password: await bcrypt.hash("password", 10),
		},
	});

	for (let i = 0; i < 8; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const username = `${firstName.toLowerCase()}${lastName[0].toLowerCase()}`;

		await prisma.user.create({
			data: {
				name: `${firstName} ${lastName}`,
				username,
				bio: faker.person.bio(),
				password: await bcrypt.hash("password", 10),
			},
		});
	}

    console.log("User seeding done.");
}

async function seedPosts() {
	console.log("Post seeding started...");

	for (let i = 0; i < 20; i++) {
		await prisma.post.create({
			data: {
				content: faker.lorem.paragraph(),
                userId: faker.number.int({ min: 1, max: 10 }),
			},
		});
	}

	console.log("Post seeding done.");
}

async function seedComments() {
	console.log("Comment seeding started...");

	for (let i = 0; i < 40; i++) {
		await prisma.comment.create({
			data: {
				content: faker.lorem.paragraph(),
				userId: faker.number.int({ min: 1, max: 10 }),
                postId: faker.number.int({ min: 1, max: 20 }),
			},
		});
	}

	console.log("Comment seeding done.");
}

async function seed() {
    await seedUsers();
	await seedPosts();
	await seedComments();
}

seed();
