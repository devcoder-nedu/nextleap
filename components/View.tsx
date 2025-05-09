import React from 'react'
import Ping from './Ping'
import {STARTUP_VIEWS_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import { after } from "next/server"

const View = async ({id}: {id:string}) => {
    const result = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});
    const totalViews = result?.views ?? 0;

    const formatViewString = (views: number) => {
        return views === 1 ? '1 view' : `${views} views`;
    }
    const final_views = formatViewString(totalViews);

    //TODO: TO UPDATE THE NUMBER OF VIEWS
    after( async () => await writeClient.patch(id).set({views: totalViews + 1}).commit());

    return (
        <div className={"view-container"}>
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className={"view-text"}>
                <span className={"font-black"}>{final_views}</span>
            </p>
        </div>
    )
}

export default View