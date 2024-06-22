import React, { useState, useEffect } from 'react';
import './ContactForm.css'; 

const ContactForm = ({ addContact, editContact, contactToEdit, setContactToEdit }) => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContact(contact);
    if (Object.keys(validationErrors).length === 0) {
      if (contactToEdit) {
        editContact(contact);
      } else {
        addContact(contact);
      }
      setContact({ name: '', email: '', phone: '' });
      setContactToEdit(null);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateContact = (contact) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{11}$/;

    if (!nameRegex.test(contact.name)) {
      errors.name = 'Name must be between 2 and 30 characters and contain only letters and spaces.';
    }
    if (!emailRegex.test(contact.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!phoneRegex.test(contact.phone)) {
      errors.phone = 'Phone number must be 11 digits.';
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <button type="submit" className="submit-button">
        {contactToEdit ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
