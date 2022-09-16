/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Register.module.css";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
import Button from "../../components/Button/Button";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  formChange,
  getFormData,
  register,
  resetAuthForm,
} from "../../store/authSlice";
import { useEffect } from "react";

const Register = () => {
  const formData = useAppSelector(getFormData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.isSuccess) {
      navigate("/login");
      dispatch(resetAuthForm());
    }
  }, [formData.isSuccess]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(formChange({ name, value }));
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(register(formData.fields));
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.label}>Register</div>
        <Input
          placeholder="Name"
          type="text"
          name="name"
          defaultValue={formData?.fields?.name}
          onChange={onChangeHandler}
          required
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          defaultValue={formData?.fields?.email}
          onChange={onChangeHandler}
          required
        />
        <PasswordInput
          placeholder="Password"
          type="password"
          name="password"
          defaultValue={formData?.fields?.password}
          onChange={onChangeHandler}
          required
        />
        <Button onClick={onSubmitHandler} type="submit">
          Register
        </Button>
        <Link to="/login" className={styles.alternative}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
