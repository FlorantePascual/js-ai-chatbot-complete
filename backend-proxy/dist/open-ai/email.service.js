"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor() {
        this.logger = new common_1.Logger('EventHandler');
    }
    async sendEmail(parsedArgs, emailTo) {
        const { name, email, message } = parsedArgs;
        if (!name) {
            return "Error: Missing name";
        }
        if (!email) {
            return "Error: Missing email";
        }
        if (!message) {
            return "Error: Missing message";
        }
        const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
        const mailOptions = {
            from: "AI Bot <" + SMTP_USER + ">",
            to: emailTo,
            subject: "New message from " + name + " - " + email,
            text: message,
        };
        let result = "Email sent successfully";
        const mailTransport = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === '465' ? true : false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            }
        });
        try {
            const response = await mailTransport.sendMail(mailOptions);
            this.logger.log("Email sent: " + JSON.stringify(response));
        }
        catch (error) {
            this.logger.error("Error sending email: " + JSON.stringify(error));
            result = "Error sending email";
        }
        return result;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map