import React from 'react';
import './ContactList.css'; // Import the CSS file

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <div className="contact-list-container">
      <h2>Contact List</h2>
      <ul className="contact-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <div className="contact-actions">
              <button onClick={() => editContact(contact)} className="edit-button">Edit</button>
              <button onClick={() => deleteContact(contact)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
