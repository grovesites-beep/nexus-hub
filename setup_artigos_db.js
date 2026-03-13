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
            await databases.createCollection(dbId, 'artigos', 'Artigos', [Permission.read(Role.any()), Permission.write(Role.any())]);
            await databases.createStringAttribute(dbId, 'artigos', 'cliente', 255, true);
            await databases.createStringAttribute(dbId, 'artigos', 'titulo', 255, true);
            await databases.createStringAttribute(dbId, 'artigos', 'status', 255, true); // a_fazer, escrevendo, em_revisao, publicado
            await databases.createStringAttribute(dbId, 'artigos', 'data', 255, false);
            console.log("Artigos collection created");
        } catch(e) {
            if (e.code !== 409) throw e;
            console.log("Artigos collection exists");
        }

        // await attributes creation
        await new Promise(r => setTimeout(r, 2000));
        
        await databases.createDocument(dbId, 'artigos', ID.unique(), {
            cliente: 'Empresa XYZ',
            titulo: '5 Dicas de Marketing Digital para 2026',
            status: 'a_fazer',
            data: '20/03'
        });
        await databases.createDocument(dbId, 'artigos', ID.unique(), {
            cliente: 'Clínica Sorriso',
            titulo: 'Mitos e verdades sobre implantes',
            status: 'em_revisao'
        });
        console.log("Seeding completed.");
    } catch(e) {
        console.error(e);
    }
}
setup();
