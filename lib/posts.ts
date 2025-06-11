export const posts = [
  {
    post: "/p/",
    postdate: {
      month: "june",
      date: 7,
      year: 2025,
    },
    name: "switching from obsidian to notion",
  },
  {
    post: "/p/",
    postdate: {
      month: "june",
      date: 10,
      year: 2025,
    },
    name: "i just made a new api",
  },
].sort(
  (a, b) =>
    a.postdate.year + a.postdate.date - (b.postdate.year + b.postdate.date)
);
