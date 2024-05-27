import {API_URL} from "~/config";
import {Movie} from "~/modules/Movies/domain/types";

export async function getMovies() {
    const p = await fetch(API_URL);
    const data: Movie[] = await p.json();
    for (let i = 0; i < data.length; i++) {
        data[i].id = data[i].imdb_url.split("/")[2]
    }
    data.sort((a, b) => b.rating - a.rating);
    return data;
}

export async function getMovie(id: string) {
    const movies = await getMovies();
    const movie = movies.find(m => m.id === id);
    return movie;
}