import styles from "./Card.module.css";
import image from "../../../img/img.jpg";
import { MdPlayArrow } from "react-icons/md";
import { IMovie } from "../../../store/movieSlice";

interface Props {
  active?: boolean;
  movie: IMovie;
  onSelect?: Function;
}

const Card: React.FC<Props> = ({ active, movie, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(movie.id)}
      className={`${styles.container} ${active && styles.active}`}
    >
      <img alt="Movie Poster" src={movie.poster || image} />
      {active && (
        <div className={styles.activeMark}>
          <MdPlayArrow className={styles.activeIcon} />
        </div>
      )}
    </div>
  );
};

export default Card;
