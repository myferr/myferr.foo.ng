import "@/styles/tailwind";
import "@/styles/inter.css";
import { TailwindStyles } from "@/styles/tailwind";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col min-h-screen">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className={TailwindStyles.h1}>hi :3</h1>
          <h2 className={TailwindStyles.h2}>
            I'm a developer that likes working on random projects
          </h2>
        </div>
        <p className={TailwindStyles.p}>
          I'm Myfer, a full-stack developer building fast, playful, and
          self-hostable experiences and tools over on my{" "}
          <Link
            href={"https://github.com/myferr/"}
            className={TailwindStyles.link}
          >
            my github
          </Link>
          !<br />I like{" "}
          <Link href={"https://ollama.com/"} className={TailwindStyles.link}>
            Ollama
          </Link>
          ,{" "}
          <Link href={"https://git-scm.com/"} className={TailwindStyles.link}>
            git
          </Link>{" "}
          &{" "}
          <Link href={"https://github.com/"} className={TailwindStyles.link}>
            github
          </Link>
          ,{" "}
          <Link
            href={
              "https://open.spotify.com/playlist/1nHp4ZNzeQIxPw4Hdeoeom?si=MJWWpizNR_yZw7I7vgj9tw"
            }
            className={TailwindStyles.link}
          >
            music
          </Link>
          , and{" "}
          <Link
            href={"https://en.wikipedia.org/wiki/Self-hosting_(web_services)"}
            className={TailwindStyles.link}
          >
            self-hosting
          </Link>{" "}
          (and a bunch more things!)
        </p>
        <br />
        <br />
        <div className={TailwindStyles.p}>
          Here's sum random stuff :3 (for no reason)
          <ul className="mt-3">
            {[
              { label: "I'm secretly a gopher", emoji: "/golang.png" },
              { label: "I use neovim and zed", emoji: "/nerd.png" },
              { label: "cats > dogs", emoji: "/cat.png" },
            ].map((i) => (
              <li
                className="items-center flex gap-2 pl-3 border-l-3 border-foreground/20"
                key={i.label}
              >
                <Image src={i.emoji} width={32} height={32} alt="Emoji" />
                {i.label}
              </li>
            ))}
          </ul>
        </div>
        <p>
          I also have a cdn, you can find it at
          <Link href={"/cdn"} className={TailwindStyles.code}>
            /cdn
          </Link>
          or{" "}
          <Link href={"/cdn/docs"} className={TailwindStyles.link}>
            read the docs
          </Link>
        </p>
        <div className="bg-foreground/20 w-full h-[1px] my-2" />
        <ul>
          {[
            {
              label: "@myferdoescoding",
              link: "https://x.com/myferdoescoding",
              social: "x / twitter",
            },
            {
              label: "@myferxo",
              link: "https://discord.com/users/1157526846229991544",
              social: "discord",
            },
            {
              label: "contactme.myfer@protonmail.com",
              link: "mailto:contactme.myfer@protonmail.com",
              social: "email",
            },
          ].map((i) => (
            <li key={i.label} className="flex items-center justify-between">
              <Link
                href={i.link}
                className="text-blue-400 italic font-semibold"
              >
                {i.label} ↗
              </Link>
              <span className="text-foreground/50">{i.social}</span>
            </li>
          ))}
        </ul>
        <Image src={"/footer.png"} alt="" width={150} height={150}></Image>
      </div>
    </div>
  );
}
