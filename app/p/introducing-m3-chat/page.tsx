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
                june 13th, 2025
              </p>
              <Link
                href="/"
                className="flex text-muted-foreground items-center gap-2 pl-10"
              >
                <FaLongArrowAltLeft /> back
              </Link>
            </div>
            <h1 className="text-3xl pointer-events-none">
              introducing m3-chat
            </h1>
            <Separator />
            <div>
              <video
                controls
                src={"/post3_recording.mp4"}
                className="aspect-video shadow-xl rounded-2xl border-2 p-1 bg-gradient-to-br from-pink-500/20 to-sky-300/20 hover:scale-95 hover:border-1 hover:p-0.5 duration-300 hover:cursor-pointer"
              />{" "}
              <Link
                href={
                  "https://x.com/myferdoescoding/status/1933332049118552225"
                }
                className="underline text-accent font-bold pl-3 border-l-3"
              >
                See on X
              </Link>
            </div>
            <div className="mt-8 flex w-full flex-col gap-8">
              <p className="max-w-md text-lg">
                I found AI chat bots to be expensive or spam my email, so I
                built <b>m3-chat</b>. I made it in around about 3 days to offer
                a way of chatting with multiple LLM AI models for completely
                free as well as with no account requirement(s).
              </p>
            </div>
            <div className="mt-8 flex w-full flex-col gap-8">
              <p className="max-w-md text-lg">
                <Link href={"https://m3-chat.vercel.app"} className="underline">
                  See here {":)"}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
