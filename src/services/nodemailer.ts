import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

require('dotenv').config();

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

/* 
    CREDENCIAIS DO GOOGLE

    Para o envio de e-mail funcionar é necessario configurar as suas credenciais
    em https://console.cloud.google.com/ e permitir a autenticação com o Oauth2.
    
    Após configurar acesse o link https://developers.google.com/oauthplayground
    no primeiro passo, adicione https://mail.google.com/ como escopo.
    

*/

const credentials = {
    clienteID: process.env.CLIENTID,
    secretKey: process.env.SECRETKEY,
    refresh_token: process.env.REFRESHTOKEN,
    redirectUrl: process.env.REDIRECTURL 
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
                user: process.env.EMAILUSER,
                clientId: credentials.clienteID,
                clientSecret: credentials.secretKey,
                refreshToken: credentials.refresh_token,
                accessToken,
            }
        } as SMTPTransport.Options)

        const mailOptions : Mail.Options = {
            from: `Alef Master < ${process.env.EMAILUSER}>`,
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