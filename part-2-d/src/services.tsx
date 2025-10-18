import axios from "axios";
import type { NoteProps } from "./types";
const baseUrl = "http://localhost:3001/notes";


const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = (newObject: NoteProps) => axios.post(baseUrl, newObject);

const udpate = (id: string, newObject: NoteProps) =>
  axios.put(`${baseUrl}/${id}`, newObject);


export default {
    getAll, create, udpate
}