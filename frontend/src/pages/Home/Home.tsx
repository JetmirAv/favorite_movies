/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "../../components/Sidebar/Sidebar";
import Gallery from "../../components/Gallery/Gallery";
import MoviePreview from "../../components/MoviePreview/MoviePreview";
import Nav from "../../components/Nav/Nav";

import styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addFavoriteMovie,
  getCategories,
  getMovies,
  getSelectedMovie,
  loadCategories,
  loadMovie,
  loadMoviesQuery,
  removeFavoriteMovie,
} from "../../store/movieSlice";

import { useQueryString } from "../../hooks/useQueryString";
import { useEffect } from "react";

const Home = () => {
  const getMoviesHandler = (query: string) => {
    dispatch(loadMoviesQuery(query));
  };

  const { filters, onFilterChange } = useQueryString({
    load: getMoviesHandler,
  });

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const movies = useAppSelector(getMovies);
  const selected = useAppSelector(getSelectedMovie);
  const categories = useAppSelector(getCategories);

  const dispatch = useAppDispatch();

  const onSelectHandler = (id: number) => {
    dispatch(loadMovie(id));
  };

  const onAddFavoriteMovie = (id: number) => {
    dispatch(addFavoriteMovie(id));
  };

  const onRemoveFavoriteMovie = (id: number) => {
    dispatch(removeFavoriteMovie(id));
  };

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
          active={selected?.data}
          onSelect={onSelectHandler}
          filters={filters}
          onFilterChange={onFilterChange}
        />
        {selected?.data?.id && (
          <MoviePreview
            movie={selected?.data}
            loading={selected?.loading}
            onAddFavoriteMovie={onAddFavoriteMovie}
            onRemoveFavoriteMovie={onRemoveFavoriteMovie}
            onSelect={onSelectHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
