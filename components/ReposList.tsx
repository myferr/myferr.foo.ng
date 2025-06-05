"use client";

import { useEffect, useState } from "react";
import { githubLangColors } from "@/lib/githubColors";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

type Repo = {
  name: string;
  description: string;
  stars: number;
  language?: string;
};

export default function ReposList() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("/api/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 w-full max-w-xl">
      {repos.length > 1 ? (
        repos.map((repo) => (
          <Link
            key={repo.name}
            href={`https://github.com/myferr/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent rounded-lg p-4 bg-background w-[300px] hover:bg-accent/30 duration-150 cursor-pointer flex flex-col gap-1"
          >
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {repo.description || "No description"}
            </p>
            <div className="flex justify-between items-center mt-2 text-sm">
              <div className="flex items-center gap-2">
                {repo.language && (
                  <>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          githubLangColors[repo.language] ||
                          githubLangColors.default,
                      }}
                    />
                    <span>{repo.language}</span>
                  </>
                )}
              </div>
              <span className="flex items-center gap-2">
                <FaStar className="text-accent" /> {repo.stars}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="w-full text-xl animate-pulse">Fetching repositories</h1>
      )}
    </div>
  );
}
