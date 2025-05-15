import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosInstance from "../api/axiosClient";
import useAuth from "../hooks/useAuth";

const REGISTER_URL = "/auth/register";
const LOGIN_URL = "/auth/login";
const LOGOUT_URL = "/auth/logout";
const REFRESH_URL = "/auth/refresh";
const GET_ALL_USERS_URL = "/auth/getallusers";

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axiosInstance.post(
      REGISTER_URL,
      JSON.stringify({ username, email, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("Registration Response", response);
    return response?.data;
  } catch (err) {
    console.error("Error during registration request:", err);
    if (err.message.includes("Network Error")) {
      return { data: "No server connection" }; // Keep it in data for consistency
    }
    return err?.response?.data;
  }
};

const loginUser = async ({ email, password }) => {
  const LOGIN_URL = "/auth/login";

  try {
    const response = await axiosInstance.post(
      LOGIN_URL,
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log("Login Response API Services: ", response);

    const { accessToken, user } = response.data;
    return response.data;
  } catch (err) {
    console.error("Login error:", err);

    // Handle specific error cases
    if (!err?.response) {
      return { error: "No server response" };
    }

    return err.response.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(
      LOGOUT_URL,
      {},
      { withCredentials: true }
    );
    return response?.data;
  } catch (err) {
    console.error("Logout error:", err);
    return err?.response?.data;
  }
};

const refreshToken = async () => {
  try {
    const response = await axiosInstance.get(
      REFRESH_URL,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error during refresh request:", err);
    if (err.message.includes("Network Error")) {
      return { data: "No server connection" }; // Keep it in data for consistency
    }
    return err?.response?.data;
  }
};

// Get All Users API

const getAllUsers = async () => {
  const axiosPrivate = useAxiosPrivate();
  try {
    const response = await axiosPrivate.get(GET_ALL_USERS_URL, {
      withCredentials: true, //  Include if your backend requires credentials
    });
    console.log("Users:", response.data.data); //  Log the data
    return response.data; //  Return the data
  } catch (err) {
    console.error("Error fetching users:", err);
    //  Important:  Handle the error.  Don't just swallow it.
    if (err.message.includes("Network Error")) {
      throw new Error("No server connection");
    }
    throw err; //  Re-throw the error to be caught by the component
  }
};

export { registerUser, loginUser, logoutUser, refreshToken, getAllUsers };
