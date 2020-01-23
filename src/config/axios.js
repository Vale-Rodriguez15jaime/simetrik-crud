import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default clienteAxios;
