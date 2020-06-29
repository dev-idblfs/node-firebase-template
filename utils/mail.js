const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const send = (to = [], subject = '', message = '') => {
    return new Promise(async (resolve, reject) => {
        const oauth2Client = new OAuth2(
            "592452834645-bnnn1rga2hercpvdj89ngv5raeq8nvb3.apps.googleusercontent.com", // ClientID
            "DuRm_JXm2foGB8o6Lfi3YJnN", // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
            refresh_token: "4/1QESMGSMEaPv_ND48rFnOwON53r6cV5LJB3RJt2QZjLElU_-fmBmgUsH90XhiTtmD161QVGfWrOfT0tWpjkW9Fk"
        });

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "testyoyo8@gmail.com",
                clientId: "592452834645-bnnn1rga2hercpvdj89ngv5raeq8nvb3.apps.googleusercontent.com",
                clientSecret: "DuRm_JXm2foGB8o6Lfi3YJnN",
                refreshToken: "1//04CnWXDWrXdBSCgYIARAAGAQSNwF-L9Ir6FH3u7QGv8KrupXmPulseLsVXqXFEAl1ORTl37wl8cEQee00hZSpsvJIL5QK_qNcSdI",
                accessToken: 'ya29.a0AfH6SMCMhvxVmf7FPoSiIjTLsI6fSbPZbwZMEPT2liB1_d9NiZuV8aSsr5nfxzGhKoP9pAm8_DJGx5xYoSl3mTT4P8WOUlOknmZeMpwISkcXqnrNy1sAtgXkPLgpHB-vBsGJssWdwwSGi1p7SzrFEkPSORkSJAE8rAg'
            }
        });

        const mailOptions = {
            from: 'Divyanshu <mr.divyanshu96@gmail.com>',
            to: to,
            subject: subject,
            generateTextFromHTML: true,
            html: message
        };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
            smtpTransport.close();
        });
    })
}

module.exports = {
    send: send
}