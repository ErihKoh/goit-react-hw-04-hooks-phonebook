import { useState } from 'react';
import PropTypes from 'prop-types';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, notice } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import Section from '../Section';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import useLocalStorage from '../../hooks/useLocalStorage';
import s from './PhonebookView.module.css';

defaults.delay = 2000;

export default function PhonebookView() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (data.name === '') {
      return error({
        title: 'Error',
        text: 'Please eneter name!',
      });
    }
    if (data.number === '') {
      return error({
        title: 'Error',
        text: 'Please eneter number!',
      });
    }

    const findContact = contacts.find(({ name }) => data.name === name);

    if (!findContact) {
      setContacts([data, ...contacts]);
      return;
    }

    if (findContact.name === data.name) {
      notice({
        title: 'Notice',
        text: `${data.name} is already in contacts.`,
      });
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizeFilter = filter.toLowerCase();
  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter),
  );

  return (
    <div className={s.block}>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filterContact} onDeleteContact={deleteContact} />
      </Section>
    </div>
  );
}

PhonebookView.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
