
import React  from "react";
import Me from "@/public/assets/me/me.jpg";
import PortfolioClient from "@/app/(portfolio)/PortfolioClient";
import {Home} from "@/app/(portfolio)/type/type";

// ---- APIs calls ----
async function getHome(): Promise<Home> {
    const url = "v1/public/profile";

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            cache: "no-store", // forces SSR (no caching)
        }
    );

    const data = await res.json();

    return {
        name: data.data.name,
        subtitle: data.data.subtitle ?? "",
        bio: data.data.description ?? "",
        image: data.data.image ?? Me,
    };
}

async function getContact(): Promise<Home> {
    const url = "v1/public/profile";

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            cache: "no-store", // forces SSR (no caching)
        }
    );

    const data = await res.json();

    return {
        name: data.data.name,
        subtitle: data.data.subtitle ?? "",
        bio: data.data.description ?? "",
        image: data.data.image ?? Me,
    };
}
async function getPortfolio(): Promise<Home> {
    const url = "v1/public/profile";

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            cache: "no-store", // forces SSR (no caching)
        }
    );

    const data = await res.json();
    return {
        name: data.data.name,
        subtitle: data.data.subtitle ?? "",
        bio: data.data.description ?? "",
        image: data.data.image ?? Me,
    };
}
async function getAbout(): Promise<Home> {
    const url = "v1/public/profile";

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            cache: "no-store", // forces SSR (no caching)
        }
    );

    const data = await res.json();

    return {
        name: data.data.name,
        subtitle: data.data.subtitle ?? null,
        bio: data.data.description ?? null,
        image: data.data.image ?? Me,
    };
}



export default async function page  () {
    // parallel fetch
    const [home, about, portfolio, contact] = await Promise.all([
        getHome(), getAbout(), getPortfolio(), getContact()
    ]);

    return (
        // pass server-fetched data as props to the client
        <PortfolioClient
            home={home}
            about={about}
            portfolio={portfolio}
            contact={contact}
        />
    );
}