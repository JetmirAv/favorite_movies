import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
