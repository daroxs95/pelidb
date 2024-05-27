import {useLoaderData, MetaFunction} from '@remix-run/react';
import {Details} from "~/modules/Movies/application/Details";
import {LoaderFunctionArgs} from "@remix-run/router";
import {getMovie} from "~/modules/Movies/infrastructure/data";

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [{title: data?.name}];
};

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Response(`Not found`, {status: 404});
    }
    const movie = await getMovie(params.id);
    if(!movie) {
        throw new Response(`Not found`, {status: 404});
    }
    return movie;
}

export default function DetailsPage() {
    const data = useLoaderData<typeof loader>();

    return (
        <main>
            <Details movie={data}/>
        </main>
    );
}