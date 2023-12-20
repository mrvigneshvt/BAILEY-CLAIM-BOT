import {DisconnectReason} from '@whiskeysockets/baileys';
import baileyObject from '@whiskeysockets/baileys';
import { useMultiFileAuthState } from '@whiskeysockets/baileys'

import  Qrcode  from 'qrcode';
import TelegramBot from 'node-telegram-bot-api';


const botToken = '6552828975:AAF-XWJKsDm4PZ9ZNkgza9dcb1XCdq6B-Q8'
const bot = new TelegramBot(botToken, { polling: true });

async function connectionLogic(){
    const {state,saveCreds} = await useMultiFileAuthState('auth_info_baileys');
    const sock = baileyObject.makeWASocket({
        printQRInTerminal: true,
        auth: state,
    })

    sock.ev.on('connection-update', async(req,res)=>{
        const {connection, lastDisconnect , qr} = update || {};

        //sock.sendMessage(Dealer,{text: `Bot Turned ON`})
        


        if(!qr){
            /*const qrImageBuffer = await Qrcode.toBuffer(qr, { errorCorrectionLevel: 'H' });

            if(qrImageBuffer){console.log(`buffer sent`)}

            const targetUserId = '1767901454';
        
            await bot.sendPhoto(targetUserId, qrImageBuffer, { caption: 'Scan the QR code to log in' });

            console.log(`qr sent to terminal`)*/
            console.log(`qr is not coming`)
            
        }

        if(connection === "close"){
            const shouldReconnect = 
            lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        }else if(connection === "open"){
            console.log(`Connection Opened`);
            sock.sendMessage('917010892470@s.whatsapp.net',{text: "Bot On waiting to catch captcha -_*");
        }

        if(shouldReconnect){
            connectionLogic();
        }
    })

    sock.ev.on('messages.upsert', async (vixyz) => {


        const groupid = '120363186646230726@g.us'
        const Dealer  = '917010892470@s.whatsapp.net'
        const Dealer1  = '2348163376700@s.whatsapp.net'

        const groupID1 = '120363132061932497@g.us'
        const groupID2 = '120363181774801103@g.us'



    if(vixyz.messages[0].key.participant === Dealer1){
        //console.log(`message received from DEaeler`)
        try{
        if (vixyz.messages[0].key.remoteJid === groupID1 || vixyz.messages[0].key.remoteJid === groupID2) {
            const videoMessage = vixyz.messages[0].message.videoMessage;
            const imageMessage = vixyz.messages[0].message.imageMessage;
            const claimerGroup = vixyz.messages[0].key.remoteJid
    
            if (videoMessage && videoMessage.caption){
                const caption = (videoMessage.caption || imageMessage.caption)
                const captcha = caption.match(/Captcha: (\w+)/);
    
                if(captcha && captcha[1]) {
                    const tier = await caption.match(/🪄 \*Tier:\* ([a-z A-Z 0-9]{1})/);
                    if(tier[1] === 'S'){
                    console.log(tier[1])
                    setTimeout(()=>{
                     sock.sendMessage(claimerGroup, { text: `#claim ${captcha[1]}` })
                    },500)
                    console.log(`message sent`);
                    sock.sendMessage(Dealer, {text: `Code Sent claimed Captcha: ${captcha[1]} and tier ${tier[1]}`})
                     } }
            }else if(imageMessage && imageMessage.caption){
                const caption = imageMessage.caption
                const captcha = caption.match(/Captcha: (\w+)/);
    
                if (captcha && captcha[1]) {
                    const tier = await caption.match(/🪄 \*Tier:\* ([a-z A-Z 0-9]{1})/);

                    if(tier[1] == 4 || tier[1] == 5 || tier[1] == 6 || tier[1] == 'S'){
                    console.log(tier[1])
                    setTimeout(()=>{
                        sock.sendMessage(claimerGroup, { text: `#claim ${captcha[1]}` })
                       },500)
                    console.log(`message sent`)
                    sock.sendMessage(Dealer, {text: `Code Sent claimed Captcha: ${captcha[1]} and tier ${tier[1]}`})


            }
        }
    }}}
catch(error){
    sock.sendMessage(Dealer, {text: `error occured=> ${error}`})
    console.log(error)

}}})
    
    sock.ev.on('creds.update', saveCreds)
}

connectionLogic()
