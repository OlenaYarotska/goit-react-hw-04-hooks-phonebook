import './App.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import ContactForm from './Components/ContactForm/ContactForm';
import { Section, Heading } from './App.styled';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactNames = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  const addContact = contact =>
    setContacts(prevState => [...prevState, { id: nanoid(), ...contact }]);

  const deleteContact = evt => {
    const targetId = evt.target.id;
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== targetId),
    );
  };

  const filterContacts = evt => {
    setFilter(evt.target.value);
  };

  const dublicateNameCheck = name =>
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

  return (
    <>
      <Heading>Phonebook</Heading>
      <ContactForm
        dublicateNameCheck={dublicateNameCheck}
        addContact={addContact}
      />
      <Section title="Contacts">Contacts</Section>
      <Filter filterContacts={filterContacts} filter={filter} />
      <ContactList contactNames={contactNames} deleteContact={deleteContact} />
    </>
  );
}
export default App;
