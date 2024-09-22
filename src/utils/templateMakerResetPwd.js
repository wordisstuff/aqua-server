import fs from 'fs/promises';
import handlebars from 'handlebars';
import path from 'node:path';

const pathFile = (
    await fs.readFile(path.resolve('./src/templates/ResetPwd.hbs'))
).toString();
console.log(pathFile);

const templateMakerResetPwd = handlebars.compile(pathFile, {
    encoding: 'utf-8',
});

export default templateMakerResetPwd;
