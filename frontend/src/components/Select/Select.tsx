import styles from "./Select.module.css";

interface Props {
  options: { name: string; value: string }[];
  onChangeHandler: Function;
  value: string;
}

const Select: React.FC<Props> = ({ options, value, onChangeHandler }) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChangeHandler(value);
  };

  return (
    <div className={styles.container}>
      <select onChange={onChange} className={styles.dropdown} value={value}>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
