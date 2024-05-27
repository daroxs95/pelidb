import {Movie} from "~/modules/Movies/domain/types";
import styles from './Details.module.css';
import {ImageWithFallback} from "~/components/ImageWithFallback";
import {getHDImage} from "~/modules/Movies/infrastructure/helpers";
import {useNavigate} from '@remix-run/react';
import {BackIcon} from "~/components/BackIcon";
import {FavIcon} from "~/components/FavIcon";
import {addFavorite, isFavorite, removeFavorite} from "~/modules/Movies/infrastructure/favorites";
import {useEffect, useState} from "react";

interface DetailsProps {
    movie: Movie
}

export function Details({movie}: DetailsProps) {
    const navigate = useNavigate();
    const [isFav, setIsFav] = useState(false);

    const onBackButtonClick = () => {
        navigate(-1);
    }

    const onFavClick = () => {
        setIsFav(prev => !prev);
        if (!isFav) {
            addFavorite(movie.id);
            return;
        }
        removeFavorite(movie.id);
    }

    useEffect(() => {
        setIsFav(isFavorite(movie.id));
    }, [])

    return (
        <div className={styles.container}>
            <ImageWithFallback
                fallbackSrc={'https://placehold.co/1000x1000'}
                src={getHDImage(movie.id)}
                className={styles.image}
            />

            <div className={styles.info}>
                <button className={styles.btn} onClick={onBackButtonClick} title="Go back">
                    <BackIcon width={30} height={30}/>
                </button>
                <h1>{movie.name}</h1>
                <p>{movie.desc}</p>
                <p>Rating: {movie.rating} ⭐</p>
                <p>Year: {movie.year}</p>
                <p>Genre: {movie.genre.join(" - ")}</p>
                <p>Director: {movie.directors.join(" - ")}</p>
                <p>Actors: {movie.actors.join(" - ")}</p>
                <button
                    className={`${styles.btn} ${isFav ? styles.on : ""}`}
                    onClick={onFavClick}
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                    <FavIcon width={30} height={30}/>
                </button>
            </div>
        </div>
    )
}