"use client";

import Link from "next/link";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useVerify } from "@/Context/Verfiy/verifyContext";

export default function Navbar() {
    const { auth } = useVerify();
    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow-md">
            <div className="text-2xl font-bold">Social</div>

            {auth.accessToken ? <div className="hidden md:flex gap-6 text-lg">
                <Link href="/">Home</Link>
                <Link href="/Explore">Explore</Link>
                <Link href="/CreatePost">Create</Link>
                <Link href="/Notification">Notifications</Link>
                <Link href="/Posts">posts</Link>

            </div> :
                <div className="hidden md:flex gap-6 text-lg">
                    <Link href="/Login">login</Link>
                    <Link href="/Signup">signup</Link>
                </div>

            }

            {/* Mobile Menu (shown on small screens) */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger className="text-lg">Menu</SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-4">
                            <Link href="/">Home</Link>
                            <Link href="/Explore">Explore</Link>
                            <Link href="/CreatePost">Create</Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
