import { useEffect, useState } from "react";
import phonebookApi from "./services";
import type { PersonProps } from "./types";
import { v4 as uuidv4 } from "uuid";

interface InputProps {
  field: string;
  value: string;
  eventHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ field, value, eventHandler }: InputProps) => {
  return (
    <div>
      {field}: <input value={value} onChange={eventHandler} />
    </div>
  );
};

const Person = ({ name, number, id }: PersonProps) => {
  return (
    <div key={id}>
      {name} {number}
    </div>
  );
};

const App = () => {
  // -- State --
  const [people, setPeople] = useState<PersonProps[]>([]);
  const [newName, setNewName] = useState("");
  const [filterName, setfilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // -- Initial Render --
  useEffect(() => {
    phonebookApi.getAll().then((initiaPeople) => setPeople(initiaPeople));
  }, []);

  // -- Event Handler --
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };
    const duplicate = people.find((person) => person.name === newName);
    !duplicate ? addName(newPerson) : updateDetails(duplicate.id, newPerson);
  };

  const handleDelete = (id: string) => {
    return () => {
      window.confirm(`Delete person number ${id}?`);
      phonebookApi
        .deletePerson(id)
        .then((response) =>
          setPeople(people.filter((person) => person.id != response.data.id))
        );
    };
  };

  const addName = (newPerson: PersonProps) => {
    phonebookApi
      .addPerson(newPerson)
      .then((response) => {
        setPeople(people.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => console.error("Failed to add, error: " + err));
  };

  const updateDetails = (id: string, newPerson: PersonProps) => {
    phonebookApi
      .updatePerson(id, newPerson)
      .then((response) =>
        setPeople(
          people.map((person) =>
            person.name === response.data.name ? response.data : person
          )
        )
      );
  };

  // const alert = () => {
  //   window.alert(`${newName} is already added to phonebook`);
  // };

  // -- TSX --
  return (
    <div className="app">
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          field="name"
          value={newName}
          eventHandler={handleNameChange}
        />
        <InputField
          field="number"
          value={newNumber}
          eventHandler={handleNumberChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {people
        .filter((person) => person.name.toLowerCase().includes(filterName))
        .map((person) => (
          <div key={person.id}>
            <Person name={person.name} number={person.number} id={person.id} />
            <button onClick={handleDelete(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default App;
