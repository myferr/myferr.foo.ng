import { NextResponse } from "next/server";

export const revalidate = 60; // Optional: revalidate every 60s

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "myferr.foo.ng",
  };

  const res = await fetch(
    "https://api.github.com/users/myferr/repos?per_page=100&sort=updated",
    {
      headers,
    }
  );

  const repos = await res.json();

  const data = await Promise.all(
    repos.map(async (repo: any) => {
      const langRes = await fetch(repo.languages_url, { headers });
      const langData = await langRes.json();

      const sortedLanguages = Object.entries(langData).sort(
        (a: any, b: any) => b[1] - a[1]
      );

      const mainLang = sortedLanguages[0]?.[0];

      return {
        name: repo.name,
        description:
          repo.description?.slice(0, 80) +
          (repo.description?.length > 80 ? "..." : ""),
        stars: repo.stargazers_count,
        language: mainLang,
      };
    })
  );

  return NextResponse.json(data);
}
