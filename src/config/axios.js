import axios from "axios";

const LocalURL = "http://localhost:5500/";
const globalURL = "https://api-social-blog.herokuapp.com/";
console.log("env", process.env, process.env.NODE_ENV);
const instance = axios.create({
  baseURL: globalURL,
});

export default instance;
