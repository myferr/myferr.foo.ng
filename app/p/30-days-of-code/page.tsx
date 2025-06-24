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
                june 23th, 2025
              </p>
              <Link
                href="/"
                className="flex text-muted-foreground items-center gap-2 pl-10"
              >
                <FaLongArrowAltLeft /> back
              </Link>
            </div>
            <h1 className="text-3xl pointer-events-none">30 days of code</h1>
            <Separator />
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-lg">
                On June 1st I announced a 30 days of code challenge on Twitter/X
                and have documented my GitHub repositories and contributions
                this month. I'm 23 days in and have done over 200 more
                contributions on my GitHub than I did in the entirety of May,
                that just goes to show how much you can do if you just have some
                free time and dedication!
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
