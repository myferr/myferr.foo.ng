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
].sort(
  (a, b) =>
    a.postdate.year + a.postdate.date - (b.postdate.year + b.postdate.date)
);
