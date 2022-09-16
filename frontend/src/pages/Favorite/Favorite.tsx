import Sidebar from "../../components/Sidebar/Sidebar";
import Gallery from "../../components/Gallery/Gallery";
import Nav from "../../components/Nav/Nav";

import styles from "./Favorite.module.css";
import {
  getCategories,
  getFavoriteMovies,
  getSelectedMovie,
  loadCategories,
  loadFavoriteMoviesQuery,
} from "../../store/movieSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { useQueryString } from "../../hooks/useQueryString";

const Favorites = () => {
  const getMoviesHandler = (query: string) => {
    dispatch(loadFavoriteMoviesQuery(query));
  };

  const { filters, onFilterChange } = useQueryString({
    load: getMoviesHandler,
  });

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const movies = useAppSelector(getFavoriteMovies);
  const categories = useAppSelector(getCategories);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.body}>
        <Sidebar
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
        />
        <Gallery
          movies={movies}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
};

export default Favorites;
