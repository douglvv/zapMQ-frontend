import axios from "axios";

const Api = axios.create({baseURL: 'http://localhost:1234'});

export default Api;