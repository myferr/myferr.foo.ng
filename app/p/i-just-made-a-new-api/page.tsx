"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Post() {
  return (
    <div>
      <div className="flex flex-col gap-8 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-8">
          <main className="flex flex-col gap-3 row-start-2 items-center sm:items-start p-8 border-accent rounded-2xl px-22">
            <div className="flex">
              {" "}
              <p className="text-muted-foreground border-r pr-10">
                june 10th, 2025
              </p>
              <Link
                href="/"
                className="flex text-muted-foreground items-center gap-2 pl-10"
              >
                <FaLongArrowAltLeft /> back
              </Link>
            </div>
            <h1 className="text-3xl pointer-events-none">
              i just made a new api
            </h1>
            <Separator />
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-lg">
                I just made a new API, <b>404fun</b>. It's a fully{" "}
                <Link
                  href={"https://github.com/myferr/404fun"}
                  className="underline"
                >
                  open-source
                </Link>{" "}
                API to generate playful 404 header messages
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-lg">
                Go check it out :D
                <br />
                <Link href={"https://404fun.vercel.app"} className="underline">
                  https://404fun.vercel.app
                </Link>{" "}
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
