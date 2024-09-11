import { initMongoDB } from './db/initDB.js';
import { setupServer } from './server.js';
import createDirs from './utils/createDirs.js';

const bootstrap = async () => {
    await initMongoDB();
    await createDirs(['temp', 'uploads']);
    setupServer();
};

bootstrap();
