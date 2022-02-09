import './App.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import ContactForm from './Components/ContactForm/ContactForm';
import { Section, Heading } from './App.styled';

function App() {
  // const getContacts = localStorage.getItem('contacts');
  // const parsedContacts = JSON.parse(getContacts);

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [],
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   if (parsedContacts?.length) {
  //     setContacts(parsedContacts)
  //   }}, [parsedContacts]);
  // useEffect(() => {
  //     const storedContacts = localStorage.getItem("contacts");
  //     const parsedStoredContacts = JSON.parse(storedContacts);
  //     parsedStoredContacts && setContacts(parsedStoredContacts);
  //   }, []);

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

// class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   componentDidMount() {
//     const getContacts = localStorage.getItem(this.contacts);
//     const parsedContacts = JSON.parse(getContacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(
//         this.getContacts,
//         JSON.stringify(this.state.contacts),
//       );
//     }
//   }

//   contactNames = () =>
//     this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
//     );

//   addContact = contact =>
//     this.setState(prevState => ({
//       contacts: [
//         ...prevState.contacts,
//         {
//           id: nanoid(),
//           ...contact,
//         },
//       ],
//     }));

//   deleteContact = evt => {
//     const targetId = evt.target.id;
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(contact => contact.id !== targetId),
//     }));
//   };
//   filterContacts = evt => {
//     this.setState({
//       filter: evt.target.value,
//     });
//   };
//   dublicateNameCheck = name =>
//     this.state.contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase(),
//     );

//   render() {
//     return (
//       <>
//         <Heading>Phonebook</Heading>
//         <ContactForm
//           dublicateNameCheck={this.dublicateNameCheck}
//           addContact={this.addContact}
//         />
//         <Section title="Contacts">Contacts</Section>
//         <Filter
//           filterContacts={this.filterContacts}
//           filter={this.state.filter}
//         />
//         <ContactList
//           contactNames={this.contactNames}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }

// export default App;
