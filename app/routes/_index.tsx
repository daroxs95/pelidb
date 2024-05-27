import type { MetaFunction } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getMovies} from "~/modules/Movies/infrastructure/data";
import {List} from "~/modules/Movies/application/List/List";
import {Movie} from "~/modules/Movies/domain/types";
import {useState} from "react";
import {Filters} from "~/modules/Movies/application/Filters";

export const meta: MetaFunction = () => {
  return [
    { title: "PeliDB" },
    { name: "description", content: "Top 250 movies list" },
  ];
};

export async function loader() {
  return getMovies();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(data);

  const onFilterChange = (str: string) => {
    setFilteredMovies(data.filter((movie) => movie.name.toLowerCase().includes(str.toLowerCase())));
  }

  return (
    <div>
      <List movies={filteredMovies} />
      <Filters onChange={onFilterChange} />
    </div>
  );
}
