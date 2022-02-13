import { useState } from 'react';
import { FormWrapper, Form, Label, Input, Button } from './ContactForm.styled';

function ContactForm({ addContact, dublicateNameCheck }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [form, setForm] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (dublicateNameCheck(form.name)) {
      alert(`${form.name} is already in contacts.`);
      return;
    }
    addContact(form);
    reset();
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={form.name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={form.number}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </FormWrapper>
  );
}
export default ContactForm;
