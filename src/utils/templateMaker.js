import fs from 'fs/promises';
import handlebars from 'handlebars';
import path from 'node:path';

const pathFile = (
    await fs.readFile(path.resolve('./src/templates/verifyEmail.hbs'))
).toString();

const templateMaker = handlebars.compile(pathFile, { encoding: 'utf-8' });

export default templateMaker;
