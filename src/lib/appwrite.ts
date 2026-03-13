import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://appwrite.grovehub.com.br/v1';
const project = import.meta.env.VITE_APPWRITE_PROJECT || '69b43f620021dac456c0';

client
  .setEndpoint(endpoint)
  .setProject(project);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = 'nexus_db';
export const COLLECTIONS = {
    CLIENTES: 'clientes',
    LEADS: 'leads'
};

export default client;
