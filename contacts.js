const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

module.exports = {
  async listContacts() {
    const contacts = await fs.promises.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(contacts);
    console.log('contacts', parsedContacts);
  },

  async getContactById(contactId) {
    const contacts = await fs.promises.readFile(contactsPath, 'utf-8');
    const findedContact = JSON.parse(contacts).find(
      contact => contact.id === contactId,
    );
    console.log('findedContact', findedContact);
  },

  async removeContact(contactId) {
    const contacts = await fs.promises.readFile(contactsPath, 'utf-8');
    const filtredContacts = JSON.parse(contacts).filter(
      contact => contact.id !== contactId,
    );
    await fs.promises.writeFile(contactsPath, JSON.stringify(filtredContacts));
  },

  async addContact(name, email, phone) {
    const contacts = await fs.promises.readFile(contactsPath, 'utf-8');
    const parcedContacts = JSON.parse(contacts);
    let findId;
    for (let i = 0; i < parcedContacts[parcedContacts.length - 1].id; i++) {
      parcedContacts[i].id !== i + 1 && (findId = i + 1);
      i === parcedContacts.length - 1 && (findId = parcedContacts.length + 1);
    }
    const newUser = {
      id: findId,
      name,
      email,
      phone,
    };
    parcedContacts.push(newUser);
    await fs.promises.writeFile(contactsPath, JSON.stringify(parcedContacts));
  },
};
