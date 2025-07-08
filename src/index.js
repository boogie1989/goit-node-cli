import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction(params) {
    console.log(JSON.stringify(await processAction(params), null, 4));
}


async function processAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            return {
                action: 'Contacts List',
                data: await listContacts(),
            };

        case "get":
            return {
                action: 'Get Contact',
                data: await getContactById(id),
            };

        case "add":
            return {
                action: 'Add Contact',
                data: await addContact(name, email, phone),
            };

        case "remove":
            return {
                action: 'Remove Contact',
                data: await removeContact(id),
            };

        default:
            return {
                action: 'Unknown action',
                data: null
            }
    }
}

invokeAction(options);