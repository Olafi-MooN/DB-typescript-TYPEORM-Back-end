import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';


interface typeSendEmail {
    (email: typeConfigSendEmail, messageError?: string, messageSucess?: string): Promise<boolean>
}

interface typeConfigSendEmail {
    object: {
        emailTo: string,
        subject: string,
        subjectDescription: string,
        html: string,
    }
}

const credentials = {
    clienteID: "1027847045403-cajko784q9rak2ilsaah03hcjprrclve.apps.googleusercontent.com",
    secretKey: "3X1hHVCEXEycCO2XycbW9fsi",
    refresh_token: "1//04S16brZbMz1SCgYIARAAGAQSNwF-L9Ir5vcWUXdgBOCRM-WAnX0-K5dhyMSLMgBKm5uDwa5wkS4OPOm_cOjMQwh1kXg9g6jtWkU",
    redirectUrl: "https://developers.google.com/oauthplayground" 
}
    
const oauth2Client = new google.auth.OAuth2(credentials.clienteID, credentials.secretKey, credentials.redirectUrl);

    oauth2Client.setCredentials({
        refresh_token: credentials.refresh_token
    });

   
const configSendEmail = async (config: typeConfigSendEmail) => {
    try {
        
        const accessToken = await oauth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'alefmastertutor@gmail.com',
                clientId: credentials.clienteID,
                clientSecret: credentials.secretKey,
                refreshToken: credentials.refresh_token,
                accessToken,
            }
        } as SMTPTransport.Options)

        const mailOptions : Mail.Options = {
            from: 'Alef Master <alefmastertutor@gmail.com>',
            to: config.object.emailTo,
            subject: config.object.subject,
            text: config.object.subjectDescription,
            html: config.object.html
        }

        const result = await transport.sendMail(mailOptions);

        return result;

    } catch (error) {
        return error
    }
}

const sendEmail: typeSendEmail = async (config,  messageError, messageSucess) => {
    let state: boolean;
    
    configSendEmail(config).then(
        result => {
            console.log( messageSucess || 'E-mail enviado com sucesso! \n'+ result)
            state = true;
            return 
        }
    ).catch(
        error => {
            console.log( messageError || 'Ocorreu um erro ao enviar o e-mail'+error)
            state = false;
            return 
        }
    )

    return state;
}

export { sendEmail };