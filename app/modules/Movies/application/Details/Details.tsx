import {Movie} from "~/modules/Movies/domain/types";
import styles from './Details.module.css';
import {ImageWithFallback} from "~/components/ImageWithFallback";
import {getHDImage} from "~/modules/Movies/infrastructure/helpers";

interface DetailsProps {
    movie: Movie
}

export function Details({movie}: DetailsProps) {
    return (
        <div className={styles.container}>
            <ImageWithFallback
                loading={'eager'}
                fallbackSrc={'https://placehold.co/150x330'}
                src={getHDImage(movie.id)}
                className={styles.image}
            />

            <div className={styles.info}>
                <h1>{movie.name}</h1>
                <p>{movie.desc}</p>
                <p>Rating: {movie.rating} ⭐</p>
                <p>Year: {movie.year}</p>
                <p>Genre: {movie.genre.join(" - ")}</p>
                <p>Director: {movie.directors.join(" - ")}</p>
                <p>Actors: {movie.actors.join(" - ")}</p>
            </div>
        </div>
    )
}