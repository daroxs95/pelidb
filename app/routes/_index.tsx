import type { MetaFunction } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getMovies} from "~/modules/Movies/infrastructure/data";
import {List} from "~/modules/Movies/application/List/List";
import {Movie} from "~/modules/Movies/domain/types";
import {useEffect, useState} from "react";
import {Filters} from "~/modules/Movies/application/Filters";
import { useLocation } from "@remix-run/react";


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
  const location = useLocation();

  const initialFilters = new URLSearchParams(location.search).get('s');

  const onFilterChange = (str: string) => {
    setFilteredMovies(data.filter((movie) => movie.name.toLowerCase().includes(str.toLowerCase())));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('s', str);
    history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
  }

  useEffect(() => {
    if (initialFilters) {
      onFilterChange(initialFilters);
    }
  }, []);

  return (
    <main>
      <List movies={filteredMovies} />
      <Filters onChange={onFilterChange} value={initialFilters || ""} />
    </main>
  );
}
