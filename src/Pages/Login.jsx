import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const { isAuthenticated, dispatch } = useAuth();
  const [email, setEmail] = useState("string");
  const [password, setPassword] = useState("string");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setErrorMessage("");
    e.preventDefault();
    setFormSubmitted(true);
  }
  const fetchData = async () => {
    const url = "https://hiring-test-task.vercel.app/api/login";
    const data = {
      username: email,
      password,
    };

    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!responseData.token) {
        setErrorMessage(responseData.message);
      }
      if (responseData.token) {
        dispatch({ type: "updateToken", payload: responseData.token });
      }
    } catch (error) {
      setErrorMessage(`Error in getting data from server`);
      setFormSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (formSubmitted) {
      fetchData();
    }

    document.title = "Log in";
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, formSubmitted]);

  useEffect(() => {
    document.getElementById("userName").focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/ccriptLogo.png" alt="Logo" />
        <form className={styles.form}>
          <label>Username </label>
          <input
            id="userName"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter passsword"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errorMessage && <p className={styles.errorText}>*{errorMessage}</p>}
          {isLoading && (
            <div>
              <Spinner animation="border" variant="success" />
            </div>
          )}

          <button onClick={handleSubmit}>Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
