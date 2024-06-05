import axios from "axios";
import config from "./config";

const authenticationAxiosInstance = axios.create(config);

export default authenticationAxiosInstance;
