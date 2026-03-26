import { chromium } from "playwright";

const url = process.env.EDITOR_URL || "http://localhost:3001/?effect=recursiveFireworkPalmReaction";

const consoleMessages = [];
const stackTraces = [];
const networkFailures = [];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

page.on("console", (msg) => {
  const type = msg.type(); // error | warning | info | ...
  const text = msg.text();
  consoleMessages.push({ type: type === "warning" ? "warn" : type, text });
});

page.on("pageerror", (err) => {
  stackTraces.push({ message: err.message, stack: err.stack ?? null });
});

page.on("requestfailed", (req) => {
  const failure = req.failure();
  networkFailures.push({
    url: req.url(),
    method: req.method(),
    failureErrorText: failure?.errorText ?? null,
  });
});

let reachedNetworkIdle = false;
let gotoError = null;

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
} catch (e) {
  gotoError = `goto failed: ${String(e)}`;
}

try {
  await page.waitForLoadState("networkidle", { timeout: 20000 });
  reachedNetworkIdle = true;
} catch (e) {
  reachedNetworkIdle = false;
}

// Give any late JS errors a moment to surface.
await page.waitForTimeout(2000);

await browser.close();

console.log(`Captured from: ${url}`);
console.log("\n--- Console messages (error/warn/info) ---");
const interesting = consoleMessages.filter((m) =>
  ["error", "warn", "info"].includes(m.type),
);
if (interesting.length === 0) {
  console.log("(none)");
} else {
  for (const m of interesting) console.log(`[${m.type}] ${m.text}`);
}

console.log("\n--- Uncaught exceptions (pageerror) ---");
if (stackTraces.length === 0) {
  console.log("(none)");
} else {
  for (const s of stackTraces) {
    console.log(s.stack ? s.stack : s.message);
    console.log("----");
  }
}

console.log("\n--- Network failures (requestfailed) ---");
if (networkFailures.length === 0) {
  console.log("(none)");
} else {
  for (const f of networkFailures) {
    console.log(`${f.method} ${f.url} -> ${f.failureErrorText ?? "unknown error"}`);
  }
}

console.log("\n--- Loading status ---");
console.log(reachedNetworkIdle ? "Reached networkidle." : "Did NOT reach networkidle.");
if (gotoError) console.log(`Details: ${gotoError}`);

