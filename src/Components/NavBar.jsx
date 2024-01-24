import { useAuth } from "../Contexts/AuthContext";
import styles from "./NavBar.module.css";

function NavBar() {
  const { logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/ccriptLogo.png" alt="Logo" />
      </div>
      <div className={styles.button_container}>
        <button className={styles.icon_button} onClick={handleLogout}>
          <img src="/LogoutIcon.png" alt="Logo" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
