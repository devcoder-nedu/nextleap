import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = async () => {
    const session = await auth()

    console.log(session);
    return (
        <header className="px-5 py-1 shadow-sm bg-white font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/public">
                    <Image src="/logo.png" alt="logo" width={144} height={30}/>
                </Link>

                <div className={"flex gap-5 items-center text-black"}>
                    {session && session?.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <span className={"max-sm:hidden"}>
                                    Create
                                </span>
                                <BadgePlus className={"size-6 sm:hidden"}/>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut({redirectTo: "/"});
                            }}
                            >
                                <button type={"submit"}>
                                    <span className={"max-sm:hidden"}>Sign Out</span>
                                    <LogOut className={"size-6 sm:hidden text-blue-950"}/>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>
                                    {/*{session?.user?.name}*/}
                                    <Avatar className={"size-10"}>
                                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>
                                </span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github");
                            }}>
                            <button type={"submit"}>Sign In</button>
                        </form>

                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;