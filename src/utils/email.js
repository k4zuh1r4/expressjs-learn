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
        let html = 'Welcome'
        if (template == 'passwordReset') {
            html =
                "<div style='font-family: Arial, sans-serif; line-height: 1.5;'><h2>Password Reset Request</h2><p>We received a request to reset your password. Click the link below to set a new password:</p><a href='${this.url}' style='display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none;'>Reset Password</a><p>If you did not request a password reset, please ignore this email. This link will expire in 1 hour.</p><p>Thank you,</p><p>Your Company Name</p></div>"
        }
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Deez',
            html
        }
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('welcome', 'Welcome to deez nuts.');
    }
    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
    }
}