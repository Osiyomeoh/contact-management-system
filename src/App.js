import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/contact.form';
import ContactList from './components/contact.list';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contact-management-system-backend.onrender.com/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await axios.post('https://contact-management-system-backend.onrender.com/contacts', contact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error('Error adding contact', error);
    }
  };

  const editContact = async (updatedContact) => {
    try {
      const response = await axios.put(`https://contact-management-system-backend.onrender.com/contacts/${updatedContact._id}`, updatedContact);
      setContacts(contacts.map((contact) => (contact._id === updatedContact._id ? response.data : contact)));
      setContactToEdit(null);
    } catch (error) {
      console.error('Error updating contact', error);
    }
  };

  const deleteContact = async (contactToDelete) => {
    try {
      await axios.delete(`https://contact-management-system-backend.onrender.com/contacts/${contactToDelete._id}`);
      setContacts(contacts.filter((contact) => contact._id !== contactToDelete._id));
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  return (
    <div className="app-container">
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