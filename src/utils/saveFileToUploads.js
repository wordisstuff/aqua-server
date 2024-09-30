import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/constants.js';
import { authDb, tps } from '../constants/index.js';

const saveFileToUploads = async file => {
    try {
        await fs.rename(
            path.join(TEMP_UPLOAD_DIR, file.filename),
            path.join(UPLOAD_DIR, file.filename),
        );
    } catch (err) {
        console.error('Error renaming file:', err);
    }

    return `${tps.domain}${authDb.port}/uploads/${file.filename}`;
};
export default saveFileToUploads;
