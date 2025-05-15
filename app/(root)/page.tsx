import SearchForm from "@/components/SearchForm";
import {StartupCardSkeleton, StartupTypeCard} from "@/components/StartupCard";
import StartupCard from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";
import {Suspense} from "react";

export default async function Home({searchParams}:
                                   {
                                       searchParams: Promise<{ query?: string }>
                                   }) {

    const query = (await searchParams).query;
    const params = {search: query || null};

    const session = await auth();
    console.log(session?.id)


    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

    console.log(posts);

    return (
        <div>
            <section className={"blue-container pattern"}>
                <h1 className={"heading"}>Launch Your Vision<br/>Network with Like-Minded Entrepreneurs</h1>
                <p className={"sub-heading !max-w-3xl"}>Share Your Ideas, Support Pitches, and Gain Recognition
                    Online.</p>
                <SearchForm query={query}
                />
            </section>

            <section className={"section_container"}>
                <p className={"text-30-semibold"}>
                    {query ? `Looking for "${query}"` : "All startups"}
                </p>

                <ul className={"mt-7 card_grid"}>
                    <Suspense fallback={<StartupCardSkeleton/>}>
                        {posts?.length > 0 ? (
                                posts.map((post: StartupTypeCard) => (
                                    <StartupCard key={post?._id} post={post}/>
                                ))
                            ) :
                            (
                                <p className={"no-result"}> No startups found </p>
                            )
                        }
                    </Suspense>

                </ul>
            </section>
            <SanityLive/>
        </div>
    );
}
