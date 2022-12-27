import { marked } from "marked";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
export const loader = async ({ params }: LoaderArgs) => {
    const post = await getPost(params.slug)
    const html = marked(post.markdown)
    return json({ title: post.title, html });
};

export default function PostSlug() {
    //we use the loader to access the params
    const { title, html } = useLoaderData<typeof loader>();
    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    );
}