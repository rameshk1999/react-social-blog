import axios from "axios";

const LocalURL = "http://localhost:5500/";
const globalURL = "https://api-social-blog.herokuapp.com/";
const instance = axios.create({
  baseURL: globalURL,
});

export default instance;
