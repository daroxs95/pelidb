import {Movie} from "~/modules/Movies/domain/types";
import styles from './List.module.css';
import {ImageWithFallback} from "~/components/ImageWithFallback";
import {Link} from "@remix-run/react";

interface ListProps {
    movies: Movie[]
}

export function List({movies}: ListProps) {

    return (
        <div className={styles.grid}>
            {movies.map((movie) => (
                <Link to={`/${movie.id}`} key={movie.name} className={styles.item}>
                    <ImageWithFallback
                        fallbackSrc='https://placehold.co/150x330'
                        className={styles.image}
                        src={movie.thumb_url}
                    />
                    <div className={styles.details}>
                        <p>{movie.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}