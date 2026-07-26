import { prisma } from "../lib/prisma";

async function create() {
    await prisma.role.create({
        data: { name: "User", value: 11, }
    });

    await prisma.role.create({
		data: { name: "Manager", value: 22 },
	});

    await prisma.role.create({
		data: { name: "Admin", value: 33 },
	});

    console.log("3 roles inserted...");
}

create();
