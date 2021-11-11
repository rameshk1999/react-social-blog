import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-social-blog.herokuapp.com/",
});

export default instance;
