import {Movie} from "~/modules/Movies/domain/types";

interface DetailsProps {
    movie: Movie
}

export function Details({movie}: DetailsProps) {
    return (
        <div>
            Details
        </div>
    )
}