import axios from "axios";
import type { PersonProps } from "./types";
const baseUrl = "http://localhost:3001/phonebook";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addPerson = (newPerson: PersonProps) => axios.post(baseUrl, newPerson);

const deletePerson = (id: string) => axios.delete(`${baseUrl}/${id}`);

const updatePerson = (id: string, person: PersonProps) =>
  axios.put(`${baseUrl}/${id}`, person);

export default { addPerson, deletePerson, updatePerson, getAll };
