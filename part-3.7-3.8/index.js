const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getNumberOfPersons = () => {
  return `Phonebook has info for ${persons.length} people`;
};

// Format: Sat Jan 22 2022 22:27:20 GMT+0200 (Eastern European Standard Time)
const getCurrentTime = () => {
  return new Date().toString();
};

app.get("/", (request, response) => {
  response.send("<h1>Home Page</h1>");
});

app.get("/info", (request, response) => {
  response.send(`${getNumberOfPersons()} <br /> ${getCurrentTime()}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person)
    return response.status(404).json({ error: "Person not found!!!" });

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person)
    return response
      .status(404)
      .json({ error: "Can't delete a person that doesn't exist!!!" });

  console.log(persons.length);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons.length);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;
  if (!name)
    return response.status(404).json({ error: "Missing name field!!!" });

  const duplicate = persons.find((person) => person.name === name);
  if (!duplicate) return response.status(409).send(`${name} already exist!!!`);

  const person = {
    name: name,
    number: number,
    id: Math.random() * 69,
  };

  persons = persons.concat(person);
  persons.map((person) => console.log(person.name));
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
