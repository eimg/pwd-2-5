import { prisma } from "../lib/prisma";

async function remove() {
    const role = await prisma.role.delete({
        where: { id: 2 },
    });

    console.log("deleted: " + role.name);
}

remove();
