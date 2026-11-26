import fs from "fs";
const r = await fetch("https://fortnite-api.com/v2/stats/br/v2?name=pangrusak", {
  headers: { Authorization: process.env.FORTNITE_API_KEY },
});
const o = (await r.json()).data.stats.all.overall;
const text = `Wins: **${o.wins}** | Kills: **${o.kills}** | K/D: **${o.kd}** | Matches: **${o.matches}**`;
let md = fs.readFileSync("README.md", "utf8");
md = md.replace(/<!--FN_START-->[\s\S]*<!--FN_END-->/, `<!--FN_START-->\n${text}\n<!--FN_END-->`);
fs.writeFileSync("README.md", md);
