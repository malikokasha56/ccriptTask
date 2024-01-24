import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./HomePage.module.css";
// import { Spinner } from "flowbite-react";

import { useNavigate } from "react-router-dom";
import Appointment from "../Components/Appointment";
import NavBar from "../Components/NavBar";

function HomePage() {
  const { isAuthenticated, logout, refreshToken, fetchUserData, user } =
    useAuth();
  let appointments = [];
  const navigate = useNavigate();
  const hours = Array.from({ length: 13 }, (_, index) => {
    const hour = index + 8;
    return hour > 12 ? `${hour % 12} PM` : `${hour} AM`;
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    document.title = "Home page";
    if (!isAuthenticated) {
      navigate("Login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchUserData();
    const intervalId = setInterval(() => {
      refreshToken();
    }, 9 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.scrollable_table_container}>
        <table className={styles.scrollable_table}>
          <thead>
            <tr>
              <th>
                <img
                  onClick={() => fetchUserData()}
                  className={styles.refresh}
                  src="/refreshIcon.png"
                  alt="refresh"
                />{" "}
              </th>
              {days.map((day) => (
                <th key={day} className={styles.tableRow}>{`${day}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className={styles.tableCell}>{hour}</td>
                {days.map((day, dayIndex) => {
                  if (user) {
                    appointments = [];
                    for (let key in user.appointments) {
                      if (user.appointments[key].weekDay === day) {
                        appointments.push(user.appointments[key]);
                      }
                    }
                  }
                  return (
                    <td key={dayIndex}>
                      {appointments &&
                        appointments.map(
                          (app) =>
                            app.startTimeFormatted === hour && (
                              <Appointment app={app} key={app.name} />
                            )
                        )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomePage;
