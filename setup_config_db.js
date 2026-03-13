import { Client, Databases, Permission, Role, ID } from 'node-appwrite';

let client = new Client();
client
    .setEndpoint('https://appwrite.grovehub.com.br/v1')
    .setProject('69b43f620021dac456c0')
    .setKey('standard_1dcb2fcfc25e1a331d708bc83c46d80cd32d1456ee9085fa881f9c0d4b7d8ab83e1da2f0708f213860059eb2474904ef6390947893071144e1b1c6439318233f6014dc77d6a1cf064d7666786d7c3710c6e9bbe7bb5931c7d45f7f241120dfa4e96671d30d0722bff5dcb266223e9fa36fcf8504c69c3ee48cb27eb4bf7c89b4');

const databases = new Databases(client);
const dbId = 'nexus_db';

async function setup() {
    try {
        try {
            await databases.createCollection(dbId, 'admin_config', 'Admin Config', [Permission.read(Role.any()), Permission.write(Role.any())]);
            await databases.createStringAttribute(dbId, 'admin_config', 'nome_agencia', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'favicon', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'primaryColor', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'bgColor', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'borderRadius', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'globalFont', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'loaderSpinner', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'cssCustom', 5000, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'loginLayout', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'loginTitulo', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'loginSubtitulo', 255, false);
            await databases.createBooleanAttribute(dbId, 'admin_config', 'hidePoweredBy', false);
            await databases.createStringAttribute(dbId, 'admin_config', 'dominio', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'pdfHeader', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'emailFooter', 5000, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'pushIcon', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'broadcastMsg', 1000, false);
            await databases.createBooleanAttribute(dbId, 'admin_config', 'broadcastActive', false);
            await databases.createStringAttribute(dbId, 'admin_config', 'evoUrl', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'evoKey', 255, false);
            await databases.createStringAttribute(dbId, 'admin_config', 'evoAgencia', 255, false);

            console.log("admin_config collection created");
        } catch(e) {
            if (e.code !== 409) throw e;
            console.log("admin_config collection exists");
        }

        // await attributes creation
        await new Promise(r => setTimeout(r, 2000));
        
        try {
            await databases.createDocument(dbId, 'admin_config', 'global', {
                nome_agencia: 'NexusHub',
                primaryColor: '#18181b',
                bgColor: '#fafafa',
                borderRadius: '0.5rem',
                globalFont: 'Inter',
                loaderSpinner: 'spinner',
                loginLayout: 'card',
                loginTitulo: 'Acesse sua conta',
                loginSubtitulo: 'Selecione seu perfil para entrar',
                hidePoweredBy: false,
                emailFooter: '<p>Enviado por Sua Agência</p>',
                broadcastMsg: 'Manutenção programada para o servidor principal nesta sexta-feira às 23h.',
                broadcastActive: true,
                evoUrl: 'https://api.seuservidor.com',
                evoKey: 'global_key_secret_123',
                evoAgencia: '5511999999999'
            });
            console.log("Global config created");
        } catch(e) {
            console.log("Global config might already exist", e.message);
        }
        
    } catch(e) {
        console.error(e);
    }
}
setup();
