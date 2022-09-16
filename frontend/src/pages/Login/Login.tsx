import React from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/Input/PasswordInput";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { formChange, getFormData, login } from "../../store/authSlice";

const Login = () => {
  const formData = useAppSelector(getFormData);

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    dispatch(formChange({ name, value }));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formData });
    dispatch(login(formData.fields));
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.label}>Log in</div>
        <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData?.fields?.email}
            required
          />
          <PasswordInput
            type="password"
            placeholder="Password"
            name="password"
            defaultValue={formData?.fields?.password}
            required
          />
          <Button type="submit">Log in</Button>
        </form>
        <Link to="/register" className={styles.alternative}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
