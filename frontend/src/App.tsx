import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import AuthRoute from "./components/Routes/AuthRoute";
import NoAuthRoute from "./components/Routes/NoAuthRoute";

import { getToken } from "./helpers";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAuth, loadProfile } from "./store/authSlice";
import Favorites from "./pages/Favorite/Favorite";

function App() {
  const { user, loading } = useAppSelector(getAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getToken() && !user?.id) {
      dispatch(loadProfile());
    }
  }, [dispatch, user?.id]);

  if (getToken() && !user?.id) return <h1>Loading</h1>;

  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route element={<NoAuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
