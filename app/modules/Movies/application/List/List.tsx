import {Movie} from "~/modules/Movies/domain/types";
import styles from './List.module.css';
import {ImageWithFallback} from "~/components/ImageWithFallback";
import {Link} from "@remix-run/react";
import {useEffect, useState} from "react";
import {getFavorites} from "~/modules/Movies/infrastructure/favorites";
import {FavIcon} from "~/components/FavIcon";
import {getImageLow} from "~/modules/Movies/infrastructure/helpers";

interface ListProps {
    movies: Movie[]
}

export function List({movies}: ListProps) {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <div className={styles.grid}>
            {movies.map((movie) => (
                <Link to={`/${movie.id}`} key={movie.name} className={styles.item}>
                    <ImageWithFallback
                        fallbackSrc={'https://placehold.co/300x300'}
                        className={styles.image}
                        src={getImageLow(movie.id)}
                    />
                    <div className={styles.details}>
                        <div className={styles.fav}>
                            {favorites.includes(movie.id) && <FavIcon fill="white" width={30} height={30}/>}
                        </div>
                        <p className={styles.name}>{movie.name}</p>
                        <p>{movie.rating} ⭐</p>
                        <p>{movie.year}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}