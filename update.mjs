import fs from "fs";

const r = await fetch("https://fortnite-api.com/v2/stats/br/v2?name=pangrusak", {
  headers: { Authorization: process.env.FORTNITE_API_KEY },
});
const { data } = await r.json();
const s = data.stats.all;
const n = (x) => (x ?? 0).toLocaleString("en-US");

const row = (label, m) =>
  m
    ? `| ${label} | ${n(m.matches)} | ${n(m.wins)} | ${(m.winRate ?? 0).toFixed(1)}% | ${n(m.kills)} | ${(m.kd ?? 0).toFixed(2)} | ${n(m.top10 ?? m.top12 ?? 0)} | ${Math.round((m.minutesPlayed ?? 0) / 60)}h |`
    : `| ${label} | - | - | - | - | - | - | - |`;

const o = s.overall;
const text = [
  `**Level ${data.battlePass?.level ?? "?"}** | **${Math.round((o.minutesPlayed ?? 0) / 60)} hours played** | **${n(o.playersOutlived)} players outlived**`,
  ``,
  `| Mode | Matches | Wins | Win % | Kills | K/D | Top 10 | Hours |`,
  `|---|---|---|---|---|---|---|---|`,
  row("Overall", s.overall),
  row("Solo", s.solo),
  row("Duo", s.duo),
  row("Squad", s.squad),
  ``,
  `_Last updated: ${new Date().toUTCString()}_`,
].join("\n");

let md = fs.readFileSync("README.md", "utf8");
md = md.replace(
  /<!--FN_START-->[\s\S]*<!--FN_END-->/,
  () => `<!--FN_START-->\n${text}\n<!--FN_END-->`
);
fs.writeFileSync("README.md", md);
