import { useState } from "react";

interface InputProps {
  field: string;
  value: string;
  eventHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ field, value, eventHandler }: InputProps) => {
  return (
    <div>
      {field}: <input value={value} onChange={eventHandler} />{" "}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);

  const [newName, setNewName] = useState("");
  const [filterName, setfilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewName(value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewNumber(value);
  };

  const handleFilterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setfilterName(value);
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const duplicate = persons.filter((person) => person.name === newName);
    duplicate.length === 0 ? addName() : alert();
  };

  const addName = () => {
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
  };

  const alert = () => {
    window.alert(`${newName} is already added to phonebook`);
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={handleAdd}>
        <InputField field="name" value={newName} eventHandler={handleNameChange}/>
        <InputField field="number" value={newNumber} eventHandler={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filterName))
        .map((person, idx) => (
          <div key={idx}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default App;
