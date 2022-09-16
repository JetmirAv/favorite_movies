import React, { InputHTMLAttributes, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import styles from "./Input.module.css";

import Input from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.passwordContainer}>
      <Input {...props} type={showPassword ? "text" : "password"} />
      {showPassword ? (
        <AiFillEyeInvisible
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className={styles.icon}
        />
      ) : (
        <AiFillEye
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className={styles.icon}
        />
      )}
    </div>
  );
};

export default PasswordInput;
