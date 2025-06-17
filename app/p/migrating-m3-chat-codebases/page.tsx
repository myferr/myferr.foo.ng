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
              migrating m3-chat codebases
            </h1>
            <Separator />
            <div className="mt-8 flex w-full flex-col gap-8">
              <p className="max-w-md text-lg">
                Last night I migrated the{" "}
                <Link
                  href={"https://github.com/m3-chat/tui"}
                  target="_blank"
                  className="underline font-mono"
                >
                  m3-chat/tui
                </Link>{" "}
                repository from C to C++, improving speed by 22%. I also
                migrated the{" "}
                <Link
                  href={"https://github.com/m3-chat/backend"}
                  target="_blank"
                  className="underline font-mono"
                >
                  m3-chat/backend
                </Link>{" "}
                from TypeScript to C# with .NET improving speed by 47.76%!
                <br />
                <br />
                This taught me a lot about migrating codebases, learning other
                languages, and how important speed really is.
              </p>
              <div className="flex flex-col gap-2">
                <Image
                  src={"/post4_screenshot1.png"}
                  width={500}
                  height={100}
                  alt="switching from obsidian to notion"
                  className="shadow-xl rounded-2xl border-2 p-1 bg-gradient-to-br from-pink-500/20 to-sky-300/20 hover:scale-95 hover:border-1 hover:p-0.5 duration-300 hover:cursor-pointer"
                />
                <Image
                  src={"/post4_screenshot2.png"}
                  width={500}
                  height={100}
                  alt="switching from obsidian to notion"
                  className="shadow-xl rounded-2xl border-2 p-1 bg-gradient-to-br from-pink-500/20 to-sky-300/20 hover:scale-95 hover:border-1 hover:p-0.5 duration-300 hover:cursor-pointer"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
