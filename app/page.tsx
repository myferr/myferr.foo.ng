"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Writing } from "@/components/pages/Writing";
import { Home } from "@/components/pages/Home";

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const referrer = document.referrer;
      console.log("Referrer:", referrer);
    }
  }, []);
  const [page, setPage] = useState<string>("home");
  return (
    <div className="flex flex-col gap-8 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-8">
        <main className="flex flex-col gap-3 row-start-2 items-center sm:items-start p-8 border-accent rounded-2xl px-22">
          {page == "home" ? <Home /> : <></>}
          {page == "writing" ? <Writing /> : <></>}
        </main>
        <section className="flex p-2 pb-5 sm:p-5">
          <div className="flex flex-col gap-2">
            {["home", "writing"].map((i) => (
              <button
                key={i}
                className={`font-serif flex gap-2 items-center hover:underline hover:cursor-pointer ${
                  page == i ? "text-foreground" : " text-muted-foreground/80"
                }`}
                onClick={() => {
                  setPage(i);
                }}
              >
                {i}
              </button>
            ))}
            <Link
              href={"mailto:contactme.myfer@protonmail.com"}
              className={`font-serif flex gap-2 items-center hover:underline hover:cursor-pointer text-muted-foreground/80`}
            >
              email <FaExternalLinkAlt size={10} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
