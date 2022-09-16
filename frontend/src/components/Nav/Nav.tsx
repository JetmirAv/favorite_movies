import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

import Button from "../Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/authSlice";

const Nav = () => {
  const dispatch = useAppDispatch();

  const onLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.routes}>
        <NavLink
          end
          className={`${styles.route} ${styles.item} `}
          to={"/"}
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "#1f1f32" : "" };
          }}
        >
          Discover
        </NavLink>
        <NavLink
          className={`${styles.route} ${styles.item} `}
          to={"/favorites"}
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "#1f1f32" : "" };
          }}
        >
          Favorites
        </NavLink>
      </div>
      <div className={styles.functions}>
        <Button
          onClick={onLogOut}
          className={`${styles.item}, ${styles.functionItem}`}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
