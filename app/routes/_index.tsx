import type { MetaFunction } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getMovies} from "~/modules/Movies/infrastructure/data";
import {List} from "~/modules/Movies/application/List/List";

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

  return (
    <div>
      <List movies={data} />
    </div>
  );
}
