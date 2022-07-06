import { createTransport } from 'nodemailer';

export const transport = createTransport({
  service: process.env.NODEMAILER_SERVICE,
  from: process.env.NODEMAILER_FROM,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASSWORD,
  },
});

export default transport;
