import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GrFormPin } from "react-icons/gr";
import { FaDiscord, FaGithub, FaNpm, FaSquareXTwitter } from "react-icons/fa6";
import ReposList from "@/components/ReposList";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Home() {
  const [repositoryAmount, setRepositoryAmount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetch("https://api.github.com/users/myferr/repos?per_page=1")
      .then((res) => {
        const total = res.headers
          .get("link")
          ?.match(/&page=(\d+)>; rel="last"/);
        if (total && total[1]) {
          if (isMounted) setRepositoryAmount(Number(total[1]));
        } else {
          // fallback: fetch all and count
          fetch("https://api.github.com/users/myferr/repos")
            .then((r) => r.json())
            .then((data) => {
              if (isMounted)
                setRepositoryAmount(Array.isArray(data) ? data.length : 0);
            });
        }
      })
      .catch(() => {
        if (isMounted) setRepositoryAmount(0);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (link?: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col gap-3 row-start-2 items-center sm:items-start p-8 border-accent rounded-2xl px-22">
      <div className="flex items-center gap-2">
        <Avatar className="size-10 shadow-xl">
          <AvatarFallback>D</AvatarFallback>
          <AvatarImage src={"https://github.com/myferr.png"} />
        </Avatar>
        <h1 className="text-3xl pointer-events-none">Dennis</h1>
      </div>
      <p className="max-w-xs">
        I am a tea-loving developer that makes websites, apps, CLIs, and
        developer utilities
      </p>
      <div className="flex gap-2">
        <Button
          variant={"secondary"}
          onClick={() => {
            handleClick("https://github.com/myferr/");
          }}
          className="hover:cursor-pointer"
        >
          GitHub
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            handleClick("https://npmjs.com/~myfer/");
          }}
          className="hover:cursor-pointer"
        >
          npm
        </Button>
        <ThemeSwitcher />
      </div>
      <Separator />
      <h2 className="text-xl">packages i've made</h2>{" "}
      <ul className="flex flex-col gap-2">
        {[
          {
            label: "env-lint",
            pinned: true,
            links: {
              github: true,
              npm: true,
            },
          },
          {
            label: "pkgwatch",
            pinned: true,
            links: {
              github: true,
              npm: true,
            },
          },
          {
            label: "intelligent",
            pinned: true,
            links: {
              github: true,
              npm: true,
            },
          },
        ].map((i) => (
          <li
            key={i.label}
            className="px-2 py-1 flex gap-0.5 items-center hover:bg-accent/50 rounded-lg w-3xs justify-between border-1 border-transparent hover:border-accent duration-100"
          >
            <div className="flex">
              {i.pinned ? <GrFormPin className="size-6" /> : ""}
              {i.label}
            </div>
            <div className="flex gap-2">
              {i.links?.npm ? (
                <button
                  onClick={() => {
                    handleClick(`https://npmjs.com/package/${i.label}`);
                  }}
                  className="text-muted-foreground/30 hover:text-muted-foreground underline hover:cursor-pointer"
                >
                  npm
                </button>
              ) : (
                ""
              )}
              {i.links?.github ? (
                <button
                  onClick={() => {
                    handleClick(`https://github.com/myferr/${i.label}`);
                  }}
                  className="text-muted-foreground/30 hover:text-muted-foreground underline hover:cursor-pointer"
                >
                  github
                </button>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
      <Separator />
      <h2 className="text-xl">social media</h2>
      <div className="grid grid-cols-2 gap-2">
        {[
          {
            icon: <FaGithub size={32} />,
            label: "GitHub",
            link: "https://github.com/myferr",
          },
          {
            icon: <FaDiscord size={32} />,
            label: "Discord",
            link: "https://discord.com/users/1157526846229991544",
          },
          {
            icon: <FaSquareXTwitter size={32} />,
            label: "X/Twitter",
            link: "https://x.com/myferdoescoding",
          },
          {
            icon: <FaNpm size={32} />,
            label: "npm",
            link: "https://npmjs.com/~myfer",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-6 hover:bg-accent duration-300 hover:cursor-pointer bg-accent/55 border-accent border-2 rounded-xl justify-center items-center flex flex-col gap-2 w-4xs group"
          >
            {item.icon}
            <span
              className="text-xl opacity-100 group-hover:opacity-20 transition-opacity duration-300 h-6 flex items-center justify-center pointer-events-none"
              style={{ transitionProperty: "opacity" }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <Separator />
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2">
          <h2 className="text-xl">repositories {`(${repositoryAmount})`}</h2>
          <ChevronsUpDown size={14} className="text-accent" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ReposList />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
