import fs from 'node:fs/promises';
import path from 'node:path';

const createDirs = async folders => {
    console.log('Cтрорюю автоматично', folders);
    for (let folder of folders) {
        try {
            await fs.access(path.resolve(`./src/${folder}`));
            console.log(`${folder} already exists.`);
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.mkdir(path.resolve(`./src/${folder}`));
                console.log(`${folder} created.`);
            }
        }
    }
};
export default createDirs;