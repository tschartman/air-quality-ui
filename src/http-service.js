import axios from "axios";
export default axios.create({
  baseURL: "https://docs.openaq.org/v2",
  headers: {
    "Content-type": "application/json"
  }
});