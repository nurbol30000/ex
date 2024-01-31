// src/ContactStore.js
import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class ContactStore extends EventEmitter {
    constructor() {
        super();
        this.contacts = [];
    }

    getContacts() {
        return this.contacts;
    }

    addContact(contact) {
        this.contacts.push({ ...contact, id: Date.now() });
        this.emit('change');
    }

    deleteContact(contactId) {
        this.contacts = this.contacts.filter(contact => contact.id !== contactId);
        this.emit('change');
    }
}

const contactStore = new ContactStore();
export default contactStore;
