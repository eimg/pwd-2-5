import { prisma } from "../lib/prisma";

async function update() {
    const role = await prisma.role.update({
        where: { id: 2 },
        data: { name: "Editor" }
    });

    console.log(role);
}

update();
