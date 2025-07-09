import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { v4 as uuid } from 'uuid';

const contactsPath = resolve('db', 'contacts.json');

/**
 * @typedef {Object} Contact
 * @property {string} id - Unique identifier for the contact.
 * @property {string} name - Name of the contact.
 * @property {string} email - Email address of the contact.
 * @property {string} phone - Phone number of the contact.
 */

/**
 * Reads the contacts from the file and returns them as an array of objects.
 * 
 * @returns {Promise<Contact[]>} Array of contact objects.
 */
export async function listContacts() {
    return JSON.parse(await readFile(contactsPath));
}

/**ƒ
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Contact object or null if not found.
 */
export async function getContactById(contactId) {
    return (await listContacts()).find(contact => contact.id === contactId) ?? null;
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Removed contact object or null if not found.
 */
export async function removeContact(contactId) {
    const contacts = await listContacts();

    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const removedContact = contacts.splice(index, 1)[0];
    await writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @returns {Promise<Contact>} New contact object.
 */
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: uuid(), name, email, phone };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}



