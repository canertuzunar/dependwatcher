import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport';

const config: TransportOptions = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILERPASSWORD,
  },
};

const mailTransporter: Transporter = nodemailer.createTransport(config);

function SendMail(
  repoName: string,
  message: string,
  receviers?: Array<string> | string,
): Promise<SentMessageInfo> {
  const mailOptions = {
    from: process.env.MAILER,
    to: receviers,
    subject: `${repoName}'s OutDated Packages`,
    html: message,
  };
  return mailTransporter.sendMail(mailOptions);
}

export default SendMail;
