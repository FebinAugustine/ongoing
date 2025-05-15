import axiosPrivate from "./axiosClient";

const ADMIN_URL = "/admin/get-all-users";

const getAdmin = async () => {
  try {
    const response = await axiosPrivate.get(ADMIN_URL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axiosPrivate.get(ADMIN_URL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export { getAdmin };
