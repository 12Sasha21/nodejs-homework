const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id == contactId);
  return !result ? "contact not found" : result;
};

// function removeContact(contactId) {
//   // ...твой код
// }

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const id = `${Number(contacts[contacts.length - 1].id) + 1}`;
  const newContact = {
    id: id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
};
