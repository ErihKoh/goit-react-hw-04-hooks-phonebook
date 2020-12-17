import { Component } from 'react';
import PropTypes from 'prop-types';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, notice } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import './App.css';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
// import contacts from './components/ContactList/contacts';

defaults.delay = 2000;

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    parseContacts && this.setState({ contacts: parseContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevcontacts = prevState.contacts;

    if (nextContacts !== prevcontacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  // функция для получения данных из формы и добавдение в контакты

  addContact = data => {
    const { contacts } = this.state;
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
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
      return;
    }

    if (findContact.name === data.name) {
      notice({
        title: 'Notice',
        text: `${data.name} is already in contacts.`,
      });
    }
  };

  // функция для удаления контактов

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  //  функция фильтрации контактов по имени

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const { contacts } = this.state;
    const filterContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );

    return (
      <div className="block">
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filterContact}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
