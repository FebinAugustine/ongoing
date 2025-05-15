import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllUsers } from "../../../api/authApiServices";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAuth from "../../../hooks/useAuth";

const AdminDashboard = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const GET_ALL_USERS_URL = "/auth/getallusers";

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log("Previous Auth State 1:", JSON.stringify(auth));

    const getUsers = async () => {
      try {
        console.log("Previous Auth State:", JSON.stringify(auth));
        const response = await axiosPrivate.get(GET_ALL_USERS_URL, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          // Use axiosPrivate
          signal: controller.signal,
        });
        console.log("Usersssss  ", response.data);
        if (isMounted) {
          setUsers(response.data.data);
        }
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Request was canceled, ignoring error");
          return;
        }
        console.error(err);
        if (isMounted) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // Add dependencies to useEffect
  return (
    <div>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}

      <button
        onClick={() => refresh()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Refresh
      </button>
      <br />
      <Link to="/admin/test">Go TO</Link>
    </div>
  );
};

export default AdminDashboard;
