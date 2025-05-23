import { guestInstance, authInstance } from "./index.js";
import jwtDecode from "jwt-decode";

export const signup = async (email, password) => {
  try {
    const response = await guestInstance.post("user/signup", {
      email,
      password,
      role: "USER",
    });
    const token = response.data.token;
    const user = jwtDecode(token);
    localStorage.setItem("token", token);
    return { user, error: null };
  } catch (error) {
    const message = error.response.data.message;
    return { user: null, error: message };
  }
};

export const login = async (email, password) => {
  try {
    const response = await guestInstance.post("user/login", {
      email,
      password,
    });
    const token = response.data.token;
    const user = jwtDecode(token);
    localStorage.setItem("token", token);
    return { user, error: null };
  } catch (error) {
    const message = error.response.data.message;
    return { user: null, error: message };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const check = async () => {
  let userToken, userData;

  try {
    userToken = localStorage.getItem("token");

    if (!userToken) {
      return false;
    }

    const response = await authInstance.get("user/check");
    userToken = response.data.token;
    userData = jwtDecode(userToken);
    localStorage.setItem("token", userToken);
    return userData;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
};
