// src/ContactActions.js
import dispatcher from './dispatcher';

const ContactActions = {
    addContact(contact) {
        dispatcher.dispatch({
            type: 'ADD_CONTACT',
            contact,
        });
    },

    deleteContact(contactId) {
        dispatcher.dispatch({
            type: 'DELETE_CONTACT',
            contactId,
        });
    },
};

export default ContactActions;
