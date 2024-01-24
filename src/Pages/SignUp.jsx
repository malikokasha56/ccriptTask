import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import Validate from "../Validation/Validate";

function SignUp() {
  const [firstname, setFirstname] = useState("ahmed");
  const [lastname, setLastname] = useState("ali");
  const [email, setEmail] = useState("alimalik200@gmail.com");
  const [password, setPassword] = useState("123");
  const [rePassword, setRePassword] = useState("123");
  const [gender, setGender] = useState("male");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setErrors({});
    setErrorMessage("");
    e.preventDefault();

    setErrors(Validate({ email, password, firstname, rePassword }));
    setFormSubmitted(true);
  }

  useEffect(() => {
    if (formSubmitted && Object.keys(errors).length === 0) {
      const fetchData = async () => {
        const url = "http://localhost:8081/auth/signup";
        const data = {
          firstname,
          lastname,
          email,
          password,
          gender,
        };

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // You may need to include additional headers like authorization if
            },
            body: JSON.stringify(data),
          });

          const responseData = await res.json();

          console.log(responseData);

          //
          if (responseData.message === "user registered successfully") {
            navigate("/Login");
          }
        } catch (error) {
          setErrorMessage(`Error in sending data to server`);
          console.error("Error in API call:", error.message);
        }
      };

      fetchData();
    }

    document.title = "Sign Up";
  }, [navigate, errors, formSubmitted]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/Logo.png" alt="TripWise Logo" />
        <h1 className={styles.wlcm}>Welcome here!! 😃</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>First Name: </label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          {errors.firstname && (
            <p className={styles.errorText}>{errors.firstname}</p>
          )}
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="last name"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <label>Email Address: </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          <label>Create Password: </label>
          <input
            type="password"
            placeholder="Enter passsword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
          <label>Re-type assword: </label>
          <input
            type="password"
            placeholder="Re-type password"
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
          {errors.rePassword && (
            <p className={styles.errorText}>{errors.rePassword}</p>
          )}
          <label>Gender: </label>
          <select
            className={styles.selection}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Others</option>
          </select>
          {errorMessage && <p className={styles.errorText}>*{errorMessage}</p>}

          <button className={styles.btn}>SignIn</button>
        </form>
        <div className={styles.section}>
          <p>Already a member? </p>
          <span>
            {" "}
            <NavLink className={styles.link} to="/Login">
              Log in here!
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
