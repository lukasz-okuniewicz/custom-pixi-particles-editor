"use client";

import dynamic from "next/dynamic";
import Loading from "@components/Loading";

// Load editor only on client so Pixi/canvas code never runs during prerender (fixes "Cannot access 'mL' before initialization").
const EditorWithLoader = dynamic(
  () => import("@components/EditorWithLoader"),
  { ssr: false, loading: () => <Loading /> }
);

export default function Home() {
  return <EditorWithLoader />;
}
