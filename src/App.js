import React, { useState } from 'react';
import ContactForm from './components/contact.form';
import ContactList from './components/contact.list';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const editContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) => (contact.email === updatedContact.email ? updatedContact : contact))
    );
    setContactToEdit(null);
  };

  const deleteContact = (contactToDelete) => {
    setContacts(contacts.filter((contact) => contact.email !== contactToDelete.email));
  };

  return (
    <div>
      <h1>Contact Management System</h1>
      <ContactForm
        addContact={addContact}
        editContact={editContact}
        contactToEdit={contactToEdit}
        setContactToEdit={setContactToEdit}
      />
      <ContactList contacts={contacts} deleteContact={deleteContact} editContact={setContactToEdit} />
    </div>
  );
};

export default App;
