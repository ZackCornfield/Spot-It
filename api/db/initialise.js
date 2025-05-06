const { createTarget, createPlayer, updatePlayer, playerExists } = require('./queries');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const targets = [
    {
        name: "Squirrel Girl",
        image: `${IMAGE_BASE_URL}/assets/images/squirrel-girl.jpg`,
        xCoords: 100,
        yCoords: 100,
    },
    {
        name: "Spot",
        image: `${IMAGE_BASE_URL}/assets/images/spot.jpg`,
        xCoords: 200,
        yCoords: 200,
    },
    {
        name: "Colossus",
        image: `${IMAGE_BASE_URL}/assets/images/colossus.jpg`,
        xCoords: 300,
        yCoords: 300,
    },
    {
        name: "Medusa",
        image: `${IMAGE_BASE_URL}/assets/images/medusa.jpg`,
        xCoords: 400,
        yCoords: 400,
    },
    {
        name: "Rocket Racoon",
        image: `${IMAGE_BASE_URL}/assets/images/rocket-racoon.jpg`,
        xCoords: 500,
        yCoords: 500,
    },
    {
        name: "Black Knight",
        image: `${IMAGE_BASE_URL}/assets/images/black-knight.jpg`,
        xCoords: 600,
        yCoords: 600,
    },
    {
        name: "Gamora",
        image: `${IMAGE_BASE_URL}/assets/images/gamora.jpg`,
        xCoords: 700,
        yCoords: 700,
    },
    {
        name: "Thanos",
        image: `${IMAGE_BASE_URL}/assets/images/thanos.jpg`,
        xCoords: 800,
        yCoords: 800,
    },
    {
        name: "thor",
        image: `${IMAGE_BASE_URL}/assets/images/thor.jpg`,
        xCoords: 900,
        yCoords: 900,
    },
    {
        name: "Doctor Doom",
        image: `${IMAGE_BASE_URL}/assets/images/doctor-doom.jpg`,
        xCoords: 1000,
        yCoords: 1000,
    }
];

const playerNames = [
    "player1", "player2", "player3", "player4", "player5"
];

async function initializeDb() {
    try {
        console.log('Clearing existing targets...');
        await prisma.target.deleteMany();

        console.log('Clearing existing players...');
        await prisma.player.deleteMany();

        console.log('Clearing complete. Creating data...');
        console.log('Seeding initial targets...');

        for (const target of targets) {
            await createTarget(target.image, target.name, target.xCoords, target.yCoords);
        }

        console.log('Creating 5 initial players...');
        const players = playerNames.map((name) => ({
            name: name,
            score: Math.floor(Math.random() * (200 - 30 + 1)) + 30, // Random score between 30 and 200
        }));

        for (const player of players) {
            const existingPlayer = await playerExists(player.name);
            if (existingPlayer) {
                await updatePlayer(player.name, player.score);
            } else {
                await createPlayer(player.name, player.score);
            }
        }

        console.log('Database initialization complete!');
    } catch (error) {
        console.error('Error during database initialization:', error);
    } finally {
        await prisma.$disconnect();
    }
}

initializeDb();