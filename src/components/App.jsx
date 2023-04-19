import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.target;

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    }
    const contactObj = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contactObj] };
    });

    Array.from(e.target).forEach(e => (e.value = ''));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  renderContacts = () => {
    if (this.state.filter) {
      const normalizedFilter = this.state.filter.toLowerCase();
      const filteredContacts = this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
      return filteredContacts;
    }
    return this.state.contacts;
  };

  render() {
    const { filter } = this.state;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h1>Contacts</h1>
        <Filter onFilterElements={this.filterContacts} value={filter} />
        <ContactList
          contacts={this.renderContacts()}
          onClickDeleteBtn={this.deleteContact}
        />
      </>
    );
  }
}
