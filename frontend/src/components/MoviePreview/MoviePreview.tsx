import styles from "./MoviePreview.module.css";
import image from "../../img/img.jpg";

import { MdLibraryAdd, MdClose } from "react-icons/md";
import { IMovie } from "../../store/movieSlice";

interface Props {
  movie?: IMovie;
  loading?: boolean;
  onAddFavoriteMovie: Function;
  onRemoveFavoriteMovie: Function;
  onSelect: Function;
}

const MoviePreview: React.FC<Props> = ({
  movie,
  loading,
  onAddFavoriteMovie,
  onRemoveFavoriteMovie,
  onSelect,
}) => {
  const onAddFavoriteMovieHandler = () => {
    onAddFavoriteMovie(movie?.id);
  };

  const onRemoveFavoriteMovieHandler = () => {
    onRemoveFavoriteMovie(movie?.id);
  };

  const onDeselect = () => {
    onSelect(movie?.id);
  };

  return (
    <div className={styles.moviePreview}>
      <div onClick={onDeselect} className={styles.backdrop}></div>
      <div className={styles.container}>
        <div>
          <img
            className={styles.image}
            src={movie?.poster || image}
            alt="Movie Poster"
          />
        </div>
        <div className={styles.movieDetails}>
          <div className={styles.body}>
            <div className={styles.header}>
              <div className={styles.movieHeader}>
                <div className={styles.movieTitle}>{movie?.title}</div>
                <div className={`${styles.genres} ${styles.mb}`}>
                  <span className={styles.genre}>Action</span>
                  <span className={styles.genre}>Adventure</span>
                  <span className={styles.genre}>Fantasy</span>
                </div>
              </div>
              <div className={styles.rating}>
                <span className={styles.rate}>{movie?.imbd_rating}</span>
                <span className={styles.ratingLabel}>IMBD Rating</span>
              </div>
            </div>
            <div className={styles.movieBody}>
              <div className={`${styles.section} ${styles.mb}`}>
                <div className={styles.title}>Year</div>
                <div className={styles.content}>{movie?.year}</div>
              </div>
              <div className={`${styles.section} ${styles.mb}`}>
                <div className={styles.title}>Director</div>
                <div className={styles.content}>{movie?.director}</div>
              </div>
              <div className={` ${styles.mb}`}>
                <div className={styles.title}>Summary</div>
                <div className={styles.content}>{movie?.summary}</div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerSection}>
              {!movie?.users?.length ? (
                <MdLibraryAdd
                  className={styles.footerIcon}
                  onClick={onAddFavoriteMovieHandler}
                />
              ) : (
                <MdClose
                  className={styles.footerIcon}
                  onClick={onRemoveFavoriteMovieHandler}
                />
              )}
              <span className={styles.footerLabel}>
                {!movie?.users?.length
                  ? "Add to Favorite"
                  : "Remove from Favorite"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
