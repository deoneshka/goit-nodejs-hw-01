const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch((error) =>
          console.log((error.message = "Can not read contacts file"))
        );
      break;

    case "get":
      getContactById(id)
        .then((contact) => console.log(contact))
        .catch((error) => console.log(error.message));
      break;

    case "add":
      addContact(name, email, phone)
        .then()
        .catch((error) => console.log(error.message));
      break;

    case "remove":
      removeContact(id)
        .then()
        .catch((error) => console.log(error.message));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
