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
                june 7th, 2025
              </p>
              <Link
                href="/"
                className="flex text-muted-foreground items-center gap-2 pl-10"
              >
                <FaLongArrowAltLeft /> back
              </Link>
            </div>
            <h1 className="text-3xl pointer-events-none">
              switching from obsidian to notion
            </h1>
            <Separator />
            <div>
              <Image
                src={"/post1_cover.png"}
                width={500}
                height={100}
                alt="switching from obsidian to notion"
                className="shadow-xl rounded-2xl border-2 p-1 bg-gradient-to-br from-pink-500/20 to-sky-300/20 hover:scale-95 hover:border-1 hover:p-0.5 duration-300 hover:cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-lg">
                Obsidian is a very nice application to write Markdown notes and
                access them locally with a bunch of community themes and
                plugins, but I found myself wanting to try out Notion for a
                while and after giving it a try, I decided to switch.
              </p>
              <p className="max-w-md text-lg">
                I love Notion's user interface and overall design, it{" "}
                <i>looks</i> beautiful, I didn't like that I had to sign up for
                an account but the features helped me decide to overlook it.
              </p>
            </div>
            <Image
              src={"/post1_screenshot.png"}
              width={500}
              height={100}
              alt="switching from obsidian to notion"
              className="shadow-xl rounded-2xl border-2 p-1 bg-gradient-to-br from-pink-500/20 to-sky-300/20 hover:scale-95 hover:border-1 hover:p-0.5 duration-300 hover:cursor-pointer"
            />
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-lg">
                Real-time collaboration makes it easy to work with others on the
                same page. The database feature lets you organize tasks, notes,
                or projects in tables, boards, or calendars. You can embed
                images, videos, code blocks, and even other pages. Templates
                help you get started quickly, and the drag-and-drop interface
                makes rearranging content simple. Powerful search and backlinks
                make it easy to find and connect information across your
                workspace.
              </p>
            </div>
            <h2 className="text-2xl">Pros and Cons</h2>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="max-w-md text-lg">
                1. <b>Obsidian</b>
              </p>
              <ul className="list-disc pl-8">
                <li>✅ Local-first, your notes are stored on your device</li>
                <li>✅ Supports Markdown natively</li>
                <li>✅ Highly customizable with plugins and themes</li>
                <li>✅ No account required, privacy-friendly</li>
                <li>✅ Fast and lightweight</li>
                <li>❌ Collaboration features are limited</li>
                <li>
                  ❌ Syncing across devices requires paid service or manual
                  setup
                </li>
                <li>
                  ❌ User interface can feel less polished compared to Notion
                </li>
                <li>❌ No built-in database or table features</li>
              </ul>
              <p className="max-w-md text-lg">
                2. <b>Notion</b>
              </p>
              <ul className="list-disc pl-8">
                <li>✅ Beautiful and modern user interface</li>
                <li>✅ Real-time collaboration and sharing</li>
                <li>✅ Powerful database, table, and kanban features</li>
                <li>✅ Easy embedding of images, videos, and code blocks</li>
                <li>✅ Templates and drag-and-drop editing</li>
                <li>✅ Accessible from any device with internet</li>
                <li>❌ Requires an account (cloud-based)</li>
                <li>
                  ❌ Notes are stored on Notion's servers (privacy concern)
                </li>
                <li>❌ Offline support is limited</li>
                <li>❌ Less customizable than Obsidian with plugins/themes</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
