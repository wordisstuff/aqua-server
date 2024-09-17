import nodemailer from 'nodemailer';
import { smtp } from '../constants/index.js';

const transporter = nodemailer.createTransport(smtp.auth);

export const sendEmail = async options => await transporter.sendMail(options);
