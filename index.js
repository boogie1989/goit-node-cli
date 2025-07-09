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
    const responce = await processAction(params);
    if (responce) {
        console.log(JSON.stringify(responce, null, 4));
    } else if (responce === null) {
        console.log(null);
    }
    else {
        console.log('Unknown action');
    }
}


async function processAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            return listContacts();

        case "get":
            return getContactById(id);

        case "add":
            return addContact(name, email, phone);

        case "remove":
            return removeContact(id);

        default:
            return;
    }
}

invokeAction(options);