import { posts } from "@/lib/posts";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Writing() {
  return (
    <div className="flex flex-col gap-3 row-start-2 items-center sm:items-start p-8 border-accent rounded-2xl px-22">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl pointer-events-none">writing</h1>
      </div>
      <div className="flex flex-col gap-3">
        {posts.map((i) => (
          <div key={i.name.replaceAll(" ", "-").toLowerCase()}>
            <div className="font-serif">
              <Link
                className="flex justify-between gap-18"
                href={`${i.post}${i.name.replaceAll(" ", "-").toLowerCase()}`}
              >
                <p className="hover:underline">{i.name}</p>
                <p className="text-muted-foreground">
                  {i.postdate.month} {i.postdate.date}, {i.postdate.year}
                </p>
              </Link>
            </div>
            <Separator className="bg-accent mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
