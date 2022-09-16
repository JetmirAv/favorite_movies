import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

import styles from "./Input.module.css";

import Input from "./Input";
import { FiSearch } from "react-icons/fi";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChangeHandler: Function;
}

const SearchInput: React.FC<Props> = ({ onChangeHandler, ...props }) => {
  const [search, setSearch] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    console.log(e);
    if (e.code === "Enter" || e.code === "NumpadEnter") onChangeHandler(search);
  };

  useEffect(() => {
    setSearch((props.value as string) || "");
  }, [props.value]);

  return (
    <div className={styles.searchBar}>
      <div>
        <Input
          {...props}
          type="text"
          className={styles.searchField}
          placeholder="Search"
          onChange={onChange}
          value={search}
          onKeyDown={onKeyDown}
        />
        <FiSearch
          className={styles.searchIcon}
          onClick={() => onChangeHandler(search)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
