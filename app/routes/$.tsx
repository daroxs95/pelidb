import {LoaderFunctionArgs} from "@remix-run/router";

export async function loader({request}: LoaderFunctionArgs) {
    throw new Response(`${new URL(request.url).pathname} not found`, {
        status: 404,
    });
}

export default function CatchAllPage() {
    return null;
}
