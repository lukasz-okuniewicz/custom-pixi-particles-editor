"use client";

import React, { useEffect, useState } from "react";
import Loader from "@utils/Loader";
import Loading from "@components/Loading";
import Content from "@components/Content";

/**
 * Wrapper that loads Pixi assets then renders the editor.
 * Used via dynamic import with ssr: false so Pixi/canvas code never runs during prerender.
 */
export default function EditorWithLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadError, setLoadError] = useState("");

  const formatLoaderError = (err) => {
    if (!err) return "Unknown error";
    if (err instanceof Error) {
      return err.stack || err.message;
    }
    const msg = err?.message ? String(err.message) : null;
    return msg || String(err);
  };

  const loadResources = async () => {
    try {
      setLoadError("");
      setProgress(0);
      await Loader.load(
        (value) => setProgress(value),
        (err) => {
          setLoadError(
            `A resource failed to load:\n${formatLoaderError(err)}`,
          );
        },
      );
      setIsLoading(false);
    } catch (err) {
      console.error("[EditorWithLoader] loadResources catch", err);
      setLoadError(
        `A resource failed to load:\n${formatLoaderError(err)}`,
      );
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  if (isLoading) {
    return <Loading progress={progress} error={loadError} onRetry={loadResources} />;
  }

  return <Content />;
}
