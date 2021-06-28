const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === Number(contactId));

    if (!contact) {
      throw new Error("Id incorrect");
    }

    return contact;
  } catch (error) {
    throw error;
  }
}

const updateContacts = async (contacts) => {
  const string = JSON.stringify(contacts);

  try {
    await fs.writeFile(contactsPath, string);
  } catch (error) {
    throw error;
  }
};

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === Number(contactId));

    if (index === -1) {
      throw new Error("Id incorrect");
    }

    const newContacts = contacts.filter(
      (item) => item.id !== Number(contactId)
    );
    await updateContacts(newContacts);
    console.log("Сontact deleted successfully");
  } catch (error) {
    throw error;
  }
}

async function createId() {
  try {
    const id = Math.floor(Math.random() * 10000) + 1;
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === id);

    if (contact) {
      const newId = Math.floor(Math.random() * 10000) + 1 + id;
      return newId;
    }

    return id;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const id = await createId();
    const newContact = { ...{ name, email, phone }, id: id };
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];
    await updateContacts(newContacts);
    return console.log("Contact added successfully");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
