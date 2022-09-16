import styles from "./Gallery.module.css";

import { IListResponse, IMovie } from "../../store/movieSlice";

import Card from "./Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchInput from "../Input/SearchInput";
import Select from "../Select/Select";

interface Props {
  movies: IListResponse<IMovie>;
  active?: IMovie;
  onSelect?: Function;
  filters: any;
  onFilterChange: Function;
}

const orderOptions = [
  { value: "created_at", name: "Newest first" },
  { value: "-created_at", name: "Oldest First" },
  { value: "name", name: "A - Z" },
  { value: "-name", name: "Z - A" },
];

const Gallery: React.FC<Props> = ({
  movies,
  active,
  onSelect,
  onFilterChange,
  filters,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <SearchInput
          onChangeHandler={(value: string) =>
            onFilterChange({ name: "title", value })
          }
          value={filters.title}
        />
        <Select
          options={orderOptions}
          onChangeHandler={(value: string) =>
            onFilterChange({ name: "sort", value })
          }
          value={filters.sort}
        />
      </div>
      <div className={styles.gallery}>
        {movies.data.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            active={movie.id === active?.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      {movies.count ? (
        <Paginate
          pageCount={Math.ceil((movies.count || 1) / (movies.take || 1))}
          //selected => 0 based page index
          onPageChange={({ selected }) =>
            onFilterChange({ name: "page", value: selected + 1 })
          }
          forcePage={(movies.page || 1) - 1}
        />
      ) : null}
    </div>
  );
};

export default Gallery;
