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
            await databases.createCollection(dbId, 'artigo_templates', 'Artigo Templates', [Permission.read(Role.any()), Permission.write(Role.any()), Permission.delete(Role.any())]);
            await databases.createStringAttribute(dbId, 'artigo_templates', 'nome', 255, true);
            await databases.createStringAttribute(dbId, 'artigo_templates', 'descricao', 1000, false);
            await databases.createStringAttribute(dbId, 'artigo_templates', 'conteudo', 100000, false);
            console.log("artigo_templates collection created with attributes");
        } catch(e) {
            if (e.code !== 409) throw e;
            console.log("artigo_templates collection exists");
        }

        // wait for attributes
        await new Promise(r => setTimeout(r, 2000));
        
        try {
            await databases.createDocument(dbId, 'artigo_templates', ID.unique(), {
                nome: 'Artigo Listicle (Top 10)',
                descricao: 'Estrutura focada em listas com introdução, 10 itens e conclusão.',
                conteudo: '<h2>Introdução</h2><p>...</p><h2>1. Item</h2><p>...</p>'
            });
            await databases.createDocument(dbId, 'artigo_templates', ID.unique(), {
                nome: 'Estudo de Caso',
                descricao: 'Problema, Solução e Resultados com depoimentos.',
                conteudo: '<h2>Problema</h2><p>...</p><h2>Solução</h2><p>...</p><h2>Resultados</h2><p>...</p>'
            });
            console.log("Initial templates inserted");
        } catch(e) {
            console.log("Could not insert initial templates", e.message);
        }
        
    } catch(e) {
        console.error(e);
    }
}
setup();
