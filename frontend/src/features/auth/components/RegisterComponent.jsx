import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../../api/authApiServices";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterComponent = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(email, password, username);
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      errRef.current.focus();
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      console.log("Registration Response:", response);

      if (response?.success) {
        console.log("Registration Successful!");
        setEmail("");
        setPassword("");
        setUsername("");
        setMatchPwd("");

        toast.success("Account Created Successfully.");
      } else {
        // Set error message from the response, or a default if no message
        setErrMsg(response?.data || "Registration failed");
        errRef.current.focus();
      }
    } catch (err) {
      errRef.current.focus();
    }
  };

  return (
    <div className="h-auto dark:bg-gray-800 bg-gray-50 flex justify-center py-8 px-2  sm:px-6 lg:px-8">
      <div className="dark:bg-gray-900 bg-white p-4 md:p-8 rounded-lg shadow-xl w-full max-w-md  transition-all">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Toaster />
        <div className="text-center">
          <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
              >
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !username ? "hide" : "invalid"}
                />
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <FaUser className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your username"
                />
              </div>
            </div>
            {/* Username Note */}
            <div>
              <p
                id="uidnote"
                className={
                  userFocus && username && !validName
                    ? "text-xs rounded-md bg-black text-white p-1 relative bottom-[-10px]"
                    : "absolute left-[-9999px]"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <FaEnvelope className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
              >
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !password ? "hide" : "invalid"}
                />
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <FaLock className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {/* Password Note */}
            <div>
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "text-xs rounded-md bg-black text-white p-1 relative bottom-[-10px]"
                    : "absolute left-[-9999px]"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="matchPwd"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
              >
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <FaLock className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  id="matchPwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "text-xs rounded-md bg-black text-white p-1 relative bottom-[-10px]"
                    : "absolute left-[-9999px]"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                Must match the first password input field.
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  !validName || !validPwd || !validMatch
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!validName || !validPwd || !validMatch}
              >
                Create Account
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
