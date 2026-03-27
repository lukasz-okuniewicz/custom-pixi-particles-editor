/**
 * One-time migration: replace local collapse state with useBehaviourSectionCollapse.
 * Run: node scripts/migrate-sidebar-accordion.mjs
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const raw = execSync(
  `grep -rl 'const \\[isSubmenuVisible, setIsSubmenuVisible\\] = useState("collapse")' src --include='*.js'`,
  { cwd: root, encoding: "utf8" },
);
const files = raw
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter((f) => !f.includes("SpawnProperties"));

const IMPORT =
  'import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";\n';

const HOOK =
  "  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);\n";

function migrate(content) {
  let c = content;

  c = c.replace(
    /const \[isSubmenuVisible, setIsSubmenuVisible\] = useState\("collapse"\);\s*\n/g,
    "",
  );

  c = c.replace(
    /\n  const toggleSubmenuVisibility = useCallback\(\(\) => \{\s*\n\s*setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\);\s*\n\s*\}, \[\]\);\s*\n/g,
    "\n",
  );
  c = c.replace(
    /\n  const toggleSubmenuVisibility = useCallback\(\(\) => setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\), \[\]\);\s*\n/g,
    "\n",
  );
  c = c.replace(
    /\n  const toggleSubmenuVisibility = useCallback\(\s*\n\s*\(\) => setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\),\s*\n\s*\[\],\s*\n\s*\);\s*\n/g,
    "\n",
  );

  c = c.replace(
    /\n  const toggleSubmenuVisibility = useCallback\(\(\) => \{\s*\n\s*setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\);\s*\n\s*\}, \[\]\);\s*\n/g,
    "\n",
  );

  c = c.replace(
    /<legend onClick=\{\(\) => setIsSubmenuVisible\(\(p\) => \(p === "collapse" \? "" : "collapse"\)\)\}>/g,
    "<legend onClick={toggleSubmenuVisibility}>",
  );
  c = c.replace(
    /<legend onClick=\{\(\) => setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\)\}>/g,
    "<legend onClick={toggleSubmenuVisibility}>",
  );

  c = c.replace(
    /onClick=\{\(\) =>\s*\n\s*setIsSubmenuVisible\(\(prev\) => \(prev === "collapse" \? "" : "collapse"\)\)\s*\n\s*\}/g,
    "onClick={toggleSubmenuVisibility}",
  );

  if (!c.includes("useBehaviourSectionCollapse")) {
    const u = c.indexOf('"use client"');
    if (u === 0) {
      const end = c.indexOf("\n", u);
      c = c.slice(0, end + 1) + "\n" + IMPORT + c.slice(end + 1);
    } else {
      c = IMPORT + c;
    }
  }

  c = c.replace(
    /export default function (\w+)\(\{([^}]*)\}\) \{/g,
    (m, name, params) => {
      const p = params.trim();
      if (p.includes("accordionPanelId")) return m;
      const newParams = p ? `${p}, accordionPanelId` : "accordionPanelId";
      return `export default function ${name}({ ${newParams} }) {`;
    },
  );

  c = c.replace(
    /(export default function \w+\(\{[^}]*\}\) \{\s*\n)/,
    `$1${HOOK}`,
  );

  return c;
}

for (const rel of files) {
  const fp = path.join(root, rel);
  const before = fs.readFileSync(fp, "utf8");
  const after = migrate(before);
  if (after !== before) {
    fs.writeFileSync(fp, after);
    console.log("OK", rel);
  } else {
    console.log("SKIP (no change)", rel);
  }
}
