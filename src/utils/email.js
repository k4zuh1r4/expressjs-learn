import nodemailer from 'nodemailer';

export class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `k4zuh1r4 <${process.env.EMAIL_FROM}>`
    }
    newTransport() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_FROM,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    async send(template, subject) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Deez',
            text: '<h2>Sending email on Node.js</h2>'
        }
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('welcome', 'Welcome to deez nuts.');
    }
}