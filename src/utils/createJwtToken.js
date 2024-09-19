import { smtp } from '../constants/index.js';
import jwt from 'jsonwebtoken';

const createJwtToken = id => jwt.sign({ id }, smtp.jwtSecret);

export default createJwtToken;
