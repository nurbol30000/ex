// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ContactStore from './ContactStore';
import ContactActions from './ContactActions';

function ContactList({ contacts, onDelete }) {
    return (
        <ul>
            {contacts.map(contact => (
                <li key={contact.id}>
                    {contact.name} - {contact.phone} - {contact.email}
                    <button onClick={() => onDelete(contact.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

function ContactForm({ onAdd }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onAdd({ name, phone, email });
        setName('');
        setPhone('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Phone:
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <button type="submit">Add Contact</button>
        </form>
    );
}

function App() {
    const [contacts, setContacts] = useState(ContactStore.getContacts());

    useEffect(() => {
        // Подписываемся на изменения в хранилище
        const updateContacts = () => setContacts(ContactStore.getContacts());
        ContactStore.addChangeListener(updateContacts);

        // Отписываемся при размонтировании компонента
        return () => ContactStore.removeChangeListener(updateContacts);
    }, []);

    const handleAddContact = newContact => {
        ContactActions.addContact(newContact);
    };

    const handleDeleteContact = contactId => {
        ContactActions.deleteContact(contactId);
    };

    return (
        <div className="App">
            <h1>Contact Book</h1>
            <ContactForm onAdd={handleAddContact} />
            <ContactList contacts={contacts} onDelete={handleDeleteContact} />
        </div>
    );
}

export default App;
