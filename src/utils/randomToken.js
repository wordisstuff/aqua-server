import { randomBytes } from 'crypto';

const randomToken = (num, code) => randomBytes(num).toString(code);
export default randomToken;
