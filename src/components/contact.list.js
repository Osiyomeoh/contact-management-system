import React from 'react';

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => editContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
