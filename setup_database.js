import { Client, Databases, Permission, Role } from 'node-appwrite';

let client = new Client();
client
    .setEndpoint('https://appwrite.grovehub.com.br/v1')
    .setProject('69b43f620021dac456c0')
    .setKey('standard_1dcb2fcfc25e1a331d708bc83c46d80cd32d1456ee9085fa881f9c0d4b7d8ab83e1da2f0708f213860059eb2474904ef6390947893071144e1b1c6439318233f6014dc77d6a1cf064d7666786d7c3710c6e9bbe7bb5931c7d45f7f241120dfa4e96671d30d0722bff5dcb266223e9fa36fcf8504c69c3ee48cb27eb4bf7c89b4');

const databases = new Databases(client);

async function setupDB() {
    try {
        console.log("Creating database 'nexus'...");
        let db;
        try {
          db = await databases.create('nexus_db', 'Nexus');
        } catch (e) {
          if (e.code === 409) {
            console.log("Database 'nexus' already exists.");
            db = { $id: 'nexus_db' };
          } else {
            throw e;
          }
        }
        const dbId = db.$id;

        // Create Clientes Collection
        console.log("Creating collection 'clientes'...");
        try {
          await databases.createCollection(dbId, 'clientes', 'Clientes', [Permission.read(Role.any()), Permission.write(Role.any())]);
          await databases.createStringAttribute(dbId, 'clientes', 'nome', 255, true);
          await databases.createStringAttribute(dbId, 'clientes', 'plano', 255, true);
          await databases.createIntegerAttribute(dbId, 'clientes', 'leadsCount', false, 0, 1000000, 0);
          await databases.createStringAttribute(dbId, 'clientes', 'status', 255, true);
          await databases.createFloatAttribute(dbId, 'clientes', 'uptime', false, 0, 100, 100);
          await databases.createBooleanAttribute(dbId, 'clientes', 'wpConnected', false, false);
          console.log("'clientes' attributes created.");
        } catch (e) { if (e.code !== 409) throw e; }

        // Create Leads Collection
        console.log("Creating collection 'leads'...");
        try {
          await databases.createCollection(dbId, 'leads', 'Leads', [Permission.read(Role.any()), Permission.write(Role.any())]);
          await databases.createStringAttribute(dbId, 'leads', 'clienteId', 255, true); // tenant ref
          await databases.createStringAttribute(dbId, 'leads', 'nome', 255, true);
          await databases.createStringAttribute(dbId, 'leads', 'email', 255, true);
          await databases.createStringAttribute(dbId, 'leads', 'telefone', 255, true);
          await databases.createStringAttribute(dbId, 'leads', 'etapa', 255, true); // 'novos', 'em_contato', etc.
          await databases.createStringAttribute(dbId, 'leads', 'origem', 255, true);
          console.log("'leads' attributes created.");
        } catch (e) { if (e.code !== 409) throw e; }

        console.log("Database setup completed successfully.");
    } catch (e) {
        console.error(e);
    }
}
setupDB();
