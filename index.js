import { initDB } from './db/initDB.js';
import { setupServer } from './server.js';
import createDirs from './utils/createDirs.js';

const bootstrap = async () => {
    await initDB();
    await createDirs(['temp', 'uploads']);
    setupServer();
};

bootstrap();