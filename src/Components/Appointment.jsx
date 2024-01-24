import styles from "./Appointment.module.css";
import PropTypes from "prop-types";

function Appointment({ app }) {
  return (
    <div key={app.name} className={styles.appointment}>
      <div>
        <span className={styles.bold}>{app.name}</span>
      </div>
      <div>
        <p style={{ margin: 0 }}>Reason:</p>
        <span className={styles.description}>{app.reason}</span>
      </div>
      <div>
        <span className={styles.bold}>Timing:</span>
        <span className={styles.description}>
          {app.startTimeFormatted} - {app.endTimeFormatted}
        </span>
      </div>
    </div>
  );
}

Appointment.propTypes = {
  app: PropTypes.object.isRequired, // Change 'object' to the expected type of 'app'
};

export default Appointment;
