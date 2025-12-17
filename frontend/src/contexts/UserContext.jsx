
import { createContext } from "react";
import api from "../api.js";
import { ACCESS_TOKEN } from "../constants";

const UserContext = createContext(null)

export default UserContext;
