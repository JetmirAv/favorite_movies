import { ICategory } from "../../store/movieSlice";
import styles from "./Sidebar.module.css";

interface Props {
  categories: ICategory[];
  filters: any;
  onFilterChange: Function;
}

const Sidebar: React.FC<Props> = ({ categories, filters, onFilterChange }) => {
  const isCategoryActive = (id: number) => {
    if (!filters.category && !id) return true;
    return +filters.category === id;
  };

  const onClickHandler = (id: number) => {
    onFilterChange({ name: "category", value: id });
  };

  return (
    <div className={styles.sidebar}>
      <div className={`${styles.container} `}>
        <span
          onClick={() => onClickHandler(0)}
          className={`${styles.styleOne}  ${
            isCategoryActive(0) && styles.active
          }`}
        >
          All
        </span>
        {categories.map((category) => (
          <span
            key={category.id}
            onClick={() => onClickHandler(category.id)}
            className={`${styles.styleOne}  ${
              isCategoryActive(category.id) && styles.active
            }`}
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
