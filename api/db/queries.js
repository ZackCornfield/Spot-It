const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTarget(image, name, x, y) {
    return await prisma.target.create({
        data: {
            image,
            name,
            xCoords: x,
            yCoords: y
        }
    });
}

async function getRandomTargets(limit) {
    return await prisma.$queryRaw`SELECT * FROM "Target" ORDER BY RANDOM() LIMIT ${limit}`;
}

async function isGuessCorrect(name, x, y) {
    const target = await prisma.target.findFirst({
        where: {
            name: name,
            xCoords: { gte: Math.floor(x) - 2, lte: Math.ceil(x) + 2 },
            yCoords: { gte: Math.floor(y) - 5, lte: Math.ceil(y) + 5 },
        }
    });

    return target !== null;
}

async function createPlayer(name, score) {
    return await prisma.player.create({
        data: { name, score }
    });
}

async function updatePlayer(name, score) {
    const existingPlayer = await playerExists(name);

    if (existingPlayer && score < existingPlayer.score) {
        return await prisma.player.update({
            where: { name },
            data: { score }
        });
    }

    return existingPlayer;
}

async function getAllPlayers() {
    return await prisma.player.findMany({
        orderBy: { score: 'asc' },
        take: 5,
    });
}

async function playerExists(name) {
    return await prisma.player.findUnique({
        where: { name },
        select: { score: true }
    });
}

module.exports = {
    createTarget,
    getRandomTargets,
    isGuessCorrect,
    createPlayer,
    updatePlayer,
    playerExists,
    getAllPlayers
};